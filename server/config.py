# إعدادات الخادم.
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INSTANCE = Path(__file__).resolve().parent / "instance"
INSTANCE.mkdir(parents=True, exist_ok=True)
DB_PATH = INSTANCE / "readiness.db"
MODEL_PATH = Path(__file__).resolve().parent / "models" / "readiness_model.joblib"
DATA_DIR = Path(__file__).resolve().parent / "data"
EXAM_CORRECT_PATH = DATA_DIR / "exam_bank_correct.json"

SECRET_KEY = "dev-change-in-production-use-env"  # استبدل في الإنتاج بمتغير بيئة
