"""
Товары маркетплейса.
GET /  ?game_id=&category_id=&seller_id= — список товаров
GET /  ?id=123 — один товар
GET /  ?meta=1 — игры и категории
POST / {action:"create", ...fields} — создать товар (требует X-Auth-Token)
"""
import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def get_user_id_by_token(token: str, conn):
    if not token or ":" not in token:
        return None
    user_id_str = token.split(":")[0]
    if not user_id_str.isdigit():
        return None
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM users WHERE id = %s", (int(user_id_str),))
        row = cur.fetchone()
        return row[0] if row else None

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    conn = get_conn()

    try:
        # GET ?meta=1 — справочники
        if method == "GET" and params.get("meta"):
            with conn.cursor() as cur:
                cur.execute("SELECT id, slug, name, emoji FROM games ORDER BY id")
                games = [{"id": r[0], "slug": r[1], "name": r[2], "emoji": r[3]} for r in cur.fetchall()]
                cur.execute("SELECT id, slug, name, emoji FROM categories ORDER BY id")
                categories = [{"id": r[0], "slug": r[1], "name": r[2], "emoji": r[3]} for r in cur.fetchall()]
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"games": games, "categories": categories})}

        # GET ?id=123 — один товар
        if method == "GET" and params.get("id"):
            product_id = int(params["id"])
            with conn.cursor() as cur:
                cur.execute("UPDATE products SET views = views + 1 WHERE id = %s", (product_id,))
                cur.execute("""
                    SELECT p.id, p.title, p.description, p.price, p.old_price,
                           g.name, g.emoji, c.name, c.slug,
                           u.id, u.username, u.rating, u.deals_count, u.is_verified,
                           p.is_instant, p.views, p.image_url, p.created_at
                    FROM products p
                    JOIN games g ON g.id = p.game_id
                    JOIN categories c ON c.id = p.category_id
                    JOIN users u ON u.id = p.seller_id
                    WHERE p.id = %s AND p.is_active = TRUE
                """, (product_id,))
                row = cur.fetchone()
                conn.commit()
            if not row:
                return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Не найдено"})}
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({
                "id": row[0], "title": row[1], "description": row[2],
                "price": row[3], "old_price": row[4],
                "game": row[5], "game_emoji": row[6],
                "category": row[7], "category_slug": row[8],
                "seller_id": row[9], "seller": row[10],
                "seller_rating": float(row[11]), "seller_deals": row[12],
                "seller_verified": row[13],
                "is_instant": row[14], "views": row[15],
                "image_url": row[16], "created_at": str(row[17])
            })}

        # GET — список
        if method == "GET":
            conditions = ["p.is_active = TRUE"]
            args = []
            if params.get("game_id"):
                conditions.append("p.game_id = %s")
                args.append(int(params["game_id"]))
            if params.get("category_id"):
                conditions.append("p.category_id = %s")
                args.append(int(params["category_id"]))
            if params.get("seller_id"):
                conditions.append("p.seller_id = %s")
                args.append(int(params["seller_id"]))

            where = " AND ".join(conditions)
            with conn.cursor() as cur:
                cur.execute(f"""
                    SELECT p.id, p.title, p.price, p.old_price,
                           g.name, g.emoji, c.name, c.slug,
                           u.username, u.rating, u.deals_count, u.is_verified,
                           p.is_instant, p.image_url, p.created_at
                    FROM products p
                    JOIN games g ON g.id = p.game_id
                    JOIN categories c ON c.id = p.category_id
                    JOIN users u ON u.id = p.seller_id
                    WHERE {where}
                    ORDER BY p.created_at DESC
                    LIMIT 100
                """, args)
                rows = cur.fetchall()

            products = [{
                "id": r[0], "title": r[1], "price": r[2], "old_price": r[3],
                "game": r[4], "game_emoji": r[5], "category": r[6], "category_slug": r[7],
                "seller": r[8], "seller_rating": float(r[9]), "seller_deals": r[10],
                "seller_verified": r[11], "is_instant": r[12],
                "image_url": r[13], "created_at": str(r[14])
            } for r in rows]
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"products": products, "total": len(products)})}

        # POST — создать товар
        if method == "POST":
            token = event.get("headers", {}).get("X-Auth-Token", "")
            user_id = get_user_id_by_token(token, conn)
            if not user_id:
                return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Не авторизован"})}

            body = json.loads(event.get("body") or "{}")
            title = body.get("title", "").strip()
            price = body.get("price")
            game_id = body.get("game_id")
            category_id = body.get("category_id")

            if not title or not price or not game_id or not category_id:
                return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните обязательные поля"})}

            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO products (title, description, price, old_price, game_id, category_id, seller_id, is_instant, image_url)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
                """, (
                    title,
                    body.get("description", ""),
                    int(price),
                    int(body["old_price"]) if body.get("old_price") else None,
                    int(game_id), int(category_id), user_id,
                    bool(body.get("is_instant", False)),
                    body.get("image_url", "")
                ))
                product_id = cur.fetchone()[0]
                conn.commit()

            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"id": product_id, "success": True})}

        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Not found"})}

    finally:
        conn.close()
