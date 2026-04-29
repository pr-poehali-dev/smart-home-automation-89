"""
Аутентификация: регистрация, вход, получение профиля.
POST / body {action: "register", username, email, password}
POST / body {action: "login", email, password}
GET /  header X-Auth-Token — профиль текущего пользователя
"""
import json
import os
import hashlib
import secrets
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def make_token(user_id: int) -> str:
    return f"{user_id}:{secrets.token_hex(32)}"

def get_user_by_token(token, conn):
    if not token or ":" not in token:
        return None
    user_id = token.split(":")[0]
    if not user_id.isdigit():
        return None
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, username, email, rating, deals_count, is_verified, created_at FROM users WHERE id = %s",
            (int(user_id),)
        )
        row = cur.fetchone()
        if not row:
            return None
        return {
            "id": row[0], "username": row[1], "email": row[2],
            "rating": float(row[3]), "deals_count": row[4],
            "is_verified": row[5], "created_at": str(row[6])
        }

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    conn = get_conn()

    try:
        if method == "POST":
            body = json.loads(event.get("body") or "{}")
            action = body.get("action", "")

            if action == "register":
                username = body.get("username", "").strip()
                email = body.get("email", "").strip().lower()
                password = body.get("password", "")

                if not username or not email or not password:
                    return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните все поля"})}
                if len(password) < 6:
                    return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Пароль минимум 6 символов"})}

                with conn.cursor() as cur:
                    cur.execute("SELECT id FROM users WHERE email = %s OR username = %s", (email, username))
                    if cur.fetchone():
                        return {"statusCode": 409, "headers": CORS, "body": json.dumps({"error": "Пользователь уже существует"})}
                    cur.execute(
                        "INSERT INTO users (username, email, password_hash, avatar_letter) VALUES (%s, %s, %s, %s) RETURNING id",
                        (username, email, hash_password(password), username[0].upper())
                    )
                    user_id = cur.fetchone()[0]
                    conn.commit()

                token = make_token(user_id)
                return {"statusCode": 200, "headers": CORS, "body": json.dumps({"token": token, "user_id": user_id, "username": username})}

            if action == "login":
                email = body.get("email", "").strip().lower()
                password = body.get("password", "")

                with conn.cursor() as cur:
                    cur.execute("SELECT id, username, password_hash FROM users WHERE email = %s", (email,))
                    row = cur.fetchone()

                if not row or row[2] != hash_password(password):
                    return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Неверный email или пароль"})}

                token = make_token(row[0])
                return {"statusCode": 200, "headers": CORS, "body": json.dumps({"token": token, "user_id": row[0], "username": row[1]})}

            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Неизвестное действие"})}

        if method == "GET":
            token = event.get("headers", {}).get("X-Auth-Token", "")
            user = get_user_by_token(token, conn)
            if not user:
                return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Не авторизован"})}
            return {"statusCode": 200, "headers": CORS, "body": json.dumps(user)}

        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Not found"})}

    finally:
        conn.close()