# تهيئة SQLite.
import sqlite3

from werkzeug.security import generate_password_hash

from config import DB_PATH

# حسابات افتراضية للتجربة — تُطبَّق مرة واحدة لكل عملية خادم (أول init_db).
DEFAULT_ACCOUNTS = (
    ("admin@readyai.local", "Admin123!", "مسؤول النظام", 1),
    ("demo@readyai.local", "Demo123!", "مستخدم تجريبي", 0),
)

_seed_applied = False


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _migrate_users(conn):
    cols = [r[1] for r in conn.execute("PRAGMA table_info(users)").fetchall()]
    if "is_admin" not in cols:
        conn.execute("ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0")


def _ensure_seed_users_once(conn):
    """إدراج أو تحديث حسابات DEFAULT_ACCOUNTS مرة واحدة لكل تشغيل للخادم.

    إذا سبق التسجيل بنفس البريد بكلمة أخرى، يُحدَّث الـ hash ليطابق README
    (مفيد للتطوير؛ بعد إعادة تشغيل الخادم تُعاد مزامنة كلمات البذور).
    """
    global _seed_applied
    if _seed_applied:
        return
    for email, password, name, is_admin in DEFAULT_ACCOUNTS:
        ph = generate_password_hash(password)
        row = conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
        if row:
            conn.execute(
                "UPDATE users SET password_hash = ?, name = ?, is_admin = ? WHERE email = ?",
                (ph, name, is_admin, email),
            )
        else:
            conn.execute(
                "INSERT INTO users (email, password_hash, name, is_admin) VALUES (?, ?, ?, ?)",
                (email, ph, name, is_admin),
            )
    _seed_applied = True


def _ensure_seed_roles(conn):
    # يضمن صلاحية المسؤول حتى لو أُنشئ الحساب قبل إضافة عمود is_admin.
    conn.execute(
        "UPDATE users SET is_admin = 1 WHERE email = ?",
        ("admin@readyai.local",),
    )
    conn.execute(
        "UPDATE users SET is_admin = 0 WHERE email = ?",
        ("demo@readyai.local",),
    )


def init_db():
    conn = get_db()
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            mode TEXT NOT NULL,
            unit_id INTEGER,
            total_score INTEGER NOT NULL,
            max_total INTEGER NOT NULL,
            payload_json TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        CREATE INDEX IF NOT EXISTS idx_attempts_mode ON attempts(mode);
        """
    )
    _migrate_users(conn)
    _ensure_seed_users_once(conn)
    _ensure_seed_roles(conn)
    conn.commit()
    conn.close()
