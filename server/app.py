# خادم Flask: واجهة API، SQLite، تسجيل، تخزين المحاولات، إحصاءات، تحليل ML.
# تشغيل من مجلد server: pip install -r requirements.txt && python ml/train_model.py && python app.py
import json
import sys
from datetime import datetime
from functools import wraps
from pathlib import Path
from typing import Optional

SERVER_DIR = Path(__file__).resolve().parent
if str(SERVER_DIR) not in sys.path:
    sys.path.insert(0, str(SERVER_DIR))

from flask import Flask, jsonify, request, send_from_directory, session
from werkzeug.security import check_password_hash, generate_password_hash

from config import EXAM_CORRECT_PATH, ROOT, SECRET_KEY
from db import get_db, init_db


def _user_payload(row) -> dict:
    return {
        "id": row["id"],
        "email": row["email"],
        "name": row["name"] or "",
        "is_admin": bool(row["is_admin"]) if row["is_admin"] is not None else False,
    }


def admin_only(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"ok": False, "error": "auth_required"}), 401
        init_db()
        conn = get_db()
        row = conn.execute(
            "SELECT is_admin FROM users WHERE id = ?", (session["user_id"],)
        ).fetchone()
        conn.close()
        if not row or not row["is_admin"]:
            return jsonify({"ok": False, "error": "admin_forbidden"}), 403
        return f(*args, **kwargs)

    return wrapped

app = Flask(__name__)
app.secret_key = SECRET_KEY
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"


def load_correct_answers():
    with open(EXAM_CORRECT_PATH, encoding="utf-8") as f:
        return json.load(f)


_CORRECT = None


def get_correct():
    global _CORRECT
    if _CORRECT is None:
        _CORRECT = load_correct_answers()
    return _CORRECT


def qid_weight(qid: int) -> int:
    return ((qid - 1) % 3) + 1


def qid_standard(qid: int) -> int:
    return (qid - 1) // 3 + 1


def compute_exam_from_answers(answers: dict, mode: str, unit_id: Optional[int]):
    # answers: مفاتيح معرفات الأسئلة (1–60) كسلسلة أو قيمة.
    correct = get_correct()
    by_std = {i: 0 for i in range(1, 21)}
    total = 0
    for qid in range(1, 61):
        sid = qid_standard(qid)
        if mode == "unit" and unit_id is not None and sid != unit_id:
            continue
        key = str(qid)
        if key not in answers and qid in answers:
            key = qid
        if key not in answers:
            continue
        try:
            ans = int(answers[key])
        except (TypeError, ValueError):
            continue
        if ans == correct[qid - 1]:
            w = qid_weight(qid)
            by_std[sid] += w
            total += w
    return by_std, total


def level_for_score(score: int):
    # 0–2 ضعيف، 3–4 متوسط، 5–6 قوي.
    if score <= 2:
        return {"ar": "ضعيف", "en": "Weak", "key": "weak"}
    if score <= 4:
        return {"ar": "متوسط", "en": "Intermediate", "key": "medium"}
    return {"ar": "قوي", "en": "Strong", "key": "strong"}


def overall_from_total(total: int, max_total: int):
    if max_total == 6:
        s = total
        if s <= 2:
            return {"ar": "ضعيف", "en": "Weak", "key": "weak"}
        if s <= 4:
            return {"ar": "متوسط", "en": "Intermediate", "key": "medium"}
        return {"ar": "قوي", "en": "Strong", "key": "strong"}
    if total <= 40:
        return {"ar": "ضعيف", "en": "Weak", "key": "weak"}
    if total <= 80:
        return {"ar": "متوسط", "en": "Intermediate", "key": "medium"}
    return {"ar": "قوي", "en": "Strong", "key": "strong"}


STANDARDS_AR = [
    "التحليل الأساسي والطرق الخوارزمية",
    "الخوارزميات والتصميم والتطوير",
    "تمثيل البرنامج واللغة والتفسير",
    "مفاهيم البرمجة الأساسية",
    "أنظمة الأنواع الأساسية",
    "البرمجة الشيئية",
    "أساسيات هياكل البيانات",
    "أنظمة قواعد البيانات ونماذج البيانات",
    "تصميم البرمجيات والبناء والتحقق",
    "عمليات البرمجيات وإدارتها",
    "التزامن والجدولة والإرسال",
    "مبادئ أنظمة التشغيل",
    "تسليم البيانات والتوجيه والشبكات",
    "مقدمة في الشبكات والاتصال",
    "الرسوم البيانية والأشجار والاحتمال المنفصل",
    "تقنيات البرهان وأساسيات الحوسبة",
    "المنطق والمجموعات والعلاقات والدوال",
    "تنظيم الآلة وفق المعمارية",
    "معمارية أنظمة الذاكرة",
    "المنطق الرقمي والأنظمة الرقمية",
]

STANDARDS_EN = [
    "Basic Analysis and Algorithmic Methods",
    "Algorithms, Design, and Development",
    "Program Representation, Language, and Interpretation",
    "Fundamental Programming Concepts",
    "Basic Type Systems",
    "Object-Oriented Programming",
    "Fundamentals of Data Structures",
    "Database Systems and Data Models",
    "Software Design, Construction, and Verification",
    "Software Processes, Software Management",
    "Concurrency, Scheduling, Dispatch",
    "Operating System Principles",
    "Reliable Data Delivery, Routing, and Networking",
    "Introduction to Networking and Communication",
    "Graphs, Trees, and Discrete Probability",
    "Proof Techniques and Basics of Computation",
    "Basic Logic, Sets, Relations, and Functions",
    "Machine Organization on the Basis of Architecture",
    "Architecture of Memory Systems",
    "Digital Logic, Digital Systems",
]


def build_by_standard_list(by_std: dict):
    out = []
    for sid in range(1, 21):
        sc = by_std[sid]
        out.append(
            {
                "id": sid,
                "nameAr": STANDARDS_AR[sid - 1],
                "nameEn": STANDARDS_EN[sid - 1],
                "score": sc,
                "max": 6,
                "level": level_for_score(sc),
            }
        )
    return out


def ml_analyze_and_plan(scores_20: list, total: int, lang: str):
    # نموذج sklearn + نصوص خطة مذاكرة.
    try:
        from ml.predict import predict_band
    except Exception:
        return {"band": None, "confidence": None, "plan_ar": "", "plan_en": "", "error": "model_unavailable"}

    band, proba, conf = predict_band(scores_20)
    weak_ids = [i + 1 for i, s in enumerate(scores_20) if s <= 2]
    weak_ids.sort(key=lambda i: scores_20[i - 1])

    plan_ar = []
    plan_en = []
    plan_ar.append(
        f"نموذج التعلم الآلي يصنّف نمط أدائك في النطاق {['الأول (ضعيف)', 'الثاني (متوسط)', 'الثالث (قوي)'][band]} بثقة تقديرية {conf*100:.0f}%."
    )
    plan_en.append(
        f"The trained model (RandomForest) places your profile in band {band} (0=weak … 2=strong) with estimated confidence {conf*100:.0f}%."
    )
    if weak_ids:
        plan_ar.append("أولوية المراجعة للمعايير ذات الدرجة الأدنى: " + "، ".join(STANDARDS_AR[i - 1] for i in weak_ids[:5]))
        plan_en.append("Priority review for lowest-scoring standards: " + ", ".join(STANDARDS_EN[i - 1] for i in weak_ids[:5]))
    else:
        plan_ar.append("لا توجد معايير في النطاق الضعيف؛ حافظ على التوازن بين التركيز والمراجعة الدورية.")
        plan_en.append("No standards in the weak band; keep balancing depth and periodic review.")

    plan_ar.append(f"مجموع الدرجات {total}/120 يتوافق مع نطاق الجاهزية الإجمالي المعتمد على النظام.")
    plan_en.append(f"Total score {total}/120 aligns with the overall readiness band used by the platform.")

    return {
        "band": band,
        "band_probs": [float(x) for x in proba],
        "confidence": conf,
        "plan_ar": "\n".join(plan_ar),
        "plan_en": "\n".join(plan_en),
        "weak_standard_ids": weak_ids[:8],
    }


@app.route("/")
def index():
    return send_from_directory(ROOT, "index.html")


@app.route("/index.html")
def index_html():
    # روابط من pages/* تستخدم ../index.html → طلب /index.html (لا يُغطّيه المسار "/" وحده)
    return send_from_directory(ROOT, "index.html")


@app.route("/pages/<path:filename>")
def pages(filename):
    return send_from_directory(ROOT / "pages", filename)


@app.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory(ROOT / "assets", filename)


@app.route("/api/health")
def health():
    return jsonify({"ok": True, "service": "readyai-flask"})


@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json(force=True, silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()
    name = (data.get("name") or "").strip()
    if not email or not password:
        return jsonify({"ok": False, "error": "auth_err_required"}), 400
    init_db()
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO users (email, password_hash, name, is_admin) VALUES (?, ?, ?, 0)",
            (email, generate_password_hash(password), name),
        )
        conn.commit()
        uid = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    except Exception:
        conn.close()
        return jsonify({"ok": False, "error": "auth_err_exists"}), 400
    conn.close()
    session["user_id"] = uid
    return jsonify({"ok": True, "user": {"id": uid, "email": email, "name": name, "is_admin": False}})


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json(force=True, silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()
    if not email or not password:
        return jsonify({"ok": False, "error": "auth_err_required"}), 400
    init_db()
    conn = get_db()
    row = conn.execute(
        "SELECT id, email, name, password_hash, is_admin FROM users WHERE email = ?",
        (email,),
    ).fetchone()
    conn.close()
    if not row or not check_password_hash(row["password_hash"], password):
        return jsonify({"ok": False, "error": "auth_err_badlogin"}), 401
    session["user_id"] = row["id"]
    return jsonify({"ok": True, "user": _user_payload(row)})


@app.route("/api/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.route("/api/auth/me")
def me():
    if "user_id" not in session:
        return jsonify({"user": None})
    init_db()
    conn = get_db()
    row = conn.execute(
        "SELECT id, email, name, is_admin FROM users WHERE id = ?",
        (session["user_id"],),
    ).fetchone()
    conn.close()
    if not row:
        session.clear()
        return jsonify({"user": None})
    return jsonify({"user": _user_payload(row)})


@app.route("/api/exam/submit", methods=["POST"])
def submit_exam():
    data = request.get_json(force=True, silent=True) or {}
    mode = data.get("mode") or "full"
    unit_id = data.get("unit_id")
    if unit_id is not None:
        unit_id = int(unit_id)
    answers = data.get("answers") or {}

    by_std, total = compute_exam_from_answers(answers, mode, unit_id)
    max_total = 120 if mode == "full" else 6

    if mode == "full" and total > 120:
        return jsonify({"ok": False, "error": "invalid_score"}), 400
    if mode == "unit" and total > 6:
        return jsonify({"ok": False, "error": "invalid_score"}), 400

    by_list = build_by_standard_list(by_std)
    if mode == "unit" and unit_id is not None:
        by_list = [x for x in by_list if x["id"] == unit_id]

    overall = overall_from_total(total, max_total)
    scores_20 = [by_std[i] for i in range(1, 21)]
    lang = (data.get("lang") or "ar").lower()
    ai = ml_analyze_and_plan(scores_20, total, lang)
    d_str, t_str = datetime.now().strftime("%Y-%m-%d"), datetime.now().strftime("%H:%M:%S")

    attempt = {
        "date": d_str,
        "time": t_str,
        "totalScore": total,
        "maxTotal": max_total,
        "overallLevel": overall,
        "byStandardList": by_list,
        "byStandard": by_std,
        "version": 3,
        "mode": mode,
        "unitId": unit_id if mode == "unit" else None,
        "ai": ai,
        "ai_source": "sklearn_rf",
    }

    uid = session.get("user_id")
    init_db()
    conn = get_db()
    conn.execute(
        "INSERT INTO attempts (user_id, mode, unit_id, total_score, max_total, payload_json) VALUES (?,?,?,?,?,?)",
        (
            uid,
            mode,
            unit_id if mode == "unit" else None,
            total,
            max_total,
            json.dumps(attempt, ensure_ascii=False),
        ),
    )
    conn.commit()
    aid = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()
    attempt["attempt_id"] = aid
    return jsonify({"ok": True, "attempt": attempt})


@app.route("/api/stats/peer-distribution")
def peer_distribution():
    init_db()
    conn = get_db()
    rows = conn.execute(
        "SELECT total_score FROM attempts WHERE mode = 'full'"
    ).fetchall()
    conn.close()
    counts = [0, 0, 0]
    for t in rows:
        s = t[0]
        if s <= 40:
            counts[0] += 1
        elif s <= 80:
            counts[1] += 1
        else:
            counts[2] += 1
    return jsonify({"counts": counts, "total": len(rows)})


@app.route("/api/admin/summary")
@admin_only
def admin_summary():
    conn = get_db()
    n_users = conn.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    n_attempts = conn.execute("SELECT COUNT(*) FROM attempts").fetchone()[0]
    n_full = conn.execute(
        "SELECT COUNT(*) FROM attempts WHERE mode = 'full'"
    ).fetchone()[0]
    n_unit = conn.execute(
        "SELECT COUNT(*) FROM attempts WHERE mode = 'unit'"
    ).fetchone()[0]
    n_guest = conn.execute(
        "SELECT COUNT(*) FROM attempts WHERE user_id IS NULL"
    ).fetchone()[0]
    recent = conn.execute(
        """
        SELECT a.id, a.user_id, a.mode, a.unit_id, a.total_score, a.max_total, a.created_at,
               u.email AS user_email
        FROM attempts a
        LEFT JOIN users u ON u.id = a.user_id
        ORDER BY a.id DESC
        LIMIT 12
        """
    ).fetchall()
    rows = conn.execute(
        "SELECT total_score FROM attempts WHERE mode = 'full'"
    ).fetchall()
    conn.close()
    counts = [0, 0, 0]
    for t in rows:
        s = t[0]
        if s <= 40:
            counts[0] += 1
        elif s <= 80:
            counts[1] += 1
        else:
            counts[2] += 1
    recent_list = [
        {
            "id": r["id"],
            "user_id": r["user_id"],
            "user_email": r["user_email"],
            "mode": r["mode"],
            "unit_id": r["unit_id"],
            "total_score": r["total_score"],
            "max_total": r["max_total"],
            "created_at": r["created_at"],
        }
        for r in recent
    ]
    return jsonify(
        {
            "ok": True,
            "counts": {
                "users": n_users,
                "attempts": n_attempts,
                "full_mode": n_full,
                "unit_mode": n_unit,
                "guest_attempts": n_guest,
            },
            "score_distribution": {"bands": counts, "total_full": len(rows)},
            "recent_attempts": recent_list,
        }
    )


@app.route("/api/admin/users")
@admin_only
def admin_users():
    limit = min(int(request.args.get("limit") or 80), 200)
    offset = max(int(request.args.get("offset") or 0), 0)
    q = (request.args.get("q") or "").strip().lower()
    conn = get_db()
    if q:
        like = f"%{q}%"
        rows = conn.execute(
            """
            SELECT id, email, name, is_admin, created_at
            FROM users
            WHERE lower(email) LIKE ? OR lower(coalesce(name,'')) LIKE ?
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            """,
            (like, like, limit, offset),
        ).fetchall()
        total = conn.execute(
            """
            SELECT COUNT(*) FROM users
            WHERE lower(email) LIKE ? OR lower(coalesce(name,'')) LIKE ?
            """,
            (like, like),
        ).fetchone()[0]
    else:
        rows = conn.execute(
            """
            SELECT id, email, name, is_admin, created_at
            FROM users
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            """,
            (limit, offset),
        ).fetchall()
        total = conn.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    conn.close()
    users = [
        {
            "id": r["id"],
            "email": r["email"],
            "name": r["name"] or "",
            "is_admin": bool(r["is_admin"]),
            "created_at": r["created_at"],
        }
        for r in rows
    ]
    return jsonify({"ok": True, "users": users, "total": total, "limit": limit, "offset": offset})


@app.route("/api/admin/attempts")
@admin_only
def admin_attempts():
    limit = min(int(request.args.get("limit") or 80), 200)
    offset = max(int(request.args.get("offset") or 0), 0)
    mode = (request.args.get("mode") or "").strip()
    conn = get_db()
    if mode in ("full", "unit"):
        rows = conn.execute(
            """
            SELECT a.id, a.user_id, a.mode, a.unit_id, a.total_score, a.max_total, a.created_at,
                   u.email AS user_email
            FROM attempts a
            LEFT JOIN users u ON u.id = a.user_id
            WHERE a.mode = ?
            ORDER BY a.id DESC
            LIMIT ? OFFSET ?
            """,
            (mode, limit, offset),
        ).fetchall()
        total = conn.execute(
            "SELECT COUNT(*) FROM attempts WHERE mode = ?", (mode,)
        ).fetchone()[0]
    else:
        rows = conn.execute(
            """
            SELECT a.id, a.user_id, a.mode, a.unit_id, a.total_score, a.max_total, a.created_at,
                   u.email AS user_email
            FROM attempts a
            LEFT JOIN users u ON u.id = a.user_id
            ORDER BY a.id DESC
            LIMIT ? OFFSET ?
            """,
            (limit, offset),
        ).fetchall()
        total = conn.execute("SELECT COUNT(*) FROM attempts").fetchone()[0]
    conn.close()
    attempts = [
        {
            "id": r["id"],
            "user_id": r["user_id"],
            "user_email": r["user_email"],
            "mode": r["mode"],
            "unit_id": r["unit_id"],
            "total_score": r["total_score"],
            "max_total": r["max_total"],
            "created_at": r["created_at"],
        }
        for r in rows
    ]
    return jsonify(
        {"ok": True, "attempts": attempts, "total": total, "limit": limit, "offset": offset}
    )


@app.route("/api/admin/attempt/<int:attempt_id>")
@admin_only
def admin_attempt_detail(attempt_id: int):
    conn = get_db()
    row = conn.execute(
        """
        SELECT a.id, a.user_id, a.mode, a.unit_id, a.total_score, a.max_total, a.payload_json, a.created_at,
               u.email AS user_email
        FROM attempts a
        LEFT JOIN users u ON u.id = a.user_id
        WHERE a.id = ?
        """,
        (attempt_id,),
    ).fetchone()
    conn.close()
    if not row:
        return jsonify({"ok": False, "error": "not_found"}), 404
    try:
        payload = json.loads(row["payload_json"])
    except Exception:
        payload = None
    return jsonify(
        {
            "ok": True,
            "attempt": {
                "id": row["id"],
                "user_id": row["user_id"],
                "user_email": row["user_email"],
                "mode": row["mode"],
                "unit_id": row["unit_id"],
                "total_score": row["total_score"],
                "max_total": row["max_total"],
                "created_at": row["created_at"],
                "payload": payload,
            },
        }
    )


@app.route("/api/ml/analyze", methods=["POST"])
def analyze_only():
    data = request.get_json(force=True, silent=True) or {}
    scores_20 = data.get("standard_scores") or []
    total = int(data.get("total_score") or 0)
    lang = (data.get("lang") or "ar").lower()
    if len(scores_20) != 20:
        return jsonify({"ok": False, "error": "need_20_scores"}), 400
    ai = ml_analyze_and_plan([int(x) for x in scores_20], total, lang)
    return jsonify({"ok": True, "ai": ai})


@app.before_request
def _ensure_db():
    if request.endpoint and request.endpoint.startswith("static"):
        return
    if request.path.startswith("/api/"):
        init_db()


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
