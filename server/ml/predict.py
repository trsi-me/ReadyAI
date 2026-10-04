# تحميل النموذج المدرَّب والتنبؤ.
from pathlib import Path

import joblib
import numpy as np

_bundle = None
_MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "readiness_model.joblib"


def load_bundle():
    global _bundle
    if _bundle is None:
        if not _MODEL_PATH.is_file():
            raise FileNotFoundError(
                f"Model not found: {_MODEL_PATH}. Run: python ml/train_model.py"
            )
        _bundle = joblib.load(_MODEL_PATH)
    return _bundle


def features_from_standard_scores(scores_20):
    # scores_20: طول 20، كل عنصر 0–6.
    s = np.array(scores_20, dtype=np.float64)
    if s.shape[0] != 20:
        raise ValueError("need 20 standard scores")
    t = float(np.sum(s))
    weak = float(np.sum(s <= 2))
    med = float(np.sum((s >= 3) & (s <= 4)))
    strong = float(np.sum(s >= 5))
    std = float(np.std(s))
    feats = np.concatenate([s, np.array([t, weak, med, strong, std], dtype=np.float64)])
    return feats.reshape(1, -1)


def predict_band(scores_20):
    # يرجع (band 0..2, proba array len 3, confidence float).
    b = load_bundle()
    X = features_from_standard_scores(scores_20)
    band = int(b["model"].predict(X)[0])
    proba = b["model"].predict_proba(X)[0]
    conf = float(np.max(proba))
    return band, proba, conf
