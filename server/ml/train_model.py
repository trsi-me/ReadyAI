# تدريب نموذج حقيقي (RandomForest) على بيانات تركيبية:
# المدخلات: 20 درجة معيار + مجموع + عدد ضعيف/متوسط/قوي + انحراف معياري.
# المخرجات: نطاق الجاهزية 0=ضعيف، 1=متوسط، 2=قوي (حسب مجموع 0–120).
from pathlib import Path

import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

RNG = np.random.default_rng(42)


def build_dataset(n_samples: int = 25000):
    X_list = []
    y_list = []
    for _ in range(n_samples):
        s = RNG.integers(0, 7, size=20, dtype=np.int32)
        t = int(s.sum())
        band = 0 if t <= 40 else (1 if t <= 80 else 2)
        weak = int(np.sum(s <= 2))
        med = int(np.sum((s >= 3) & (s <= 4)))
        strong = int(np.sum(s >= 5))
        std = float(np.std(s.astype(float)))
        feats = np.concatenate([s.astype(float), [float(t), weak, med, strong, std]])
        X_list.append(feats)
        y_list.append(band)
    return np.array(X_list, dtype=np.float32), np.array(y_list, dtype=np.int32)


def main():
    root = Path(__file__).resolve().parent.parent
    out = root / "models" / "readiness_model.joblib"
    out.parent.mkdir(parents=True, exist_ok=True)

    X, y = build_dataset(30000)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.15, random_state=42, stratify=y
    )
    clf = RandomForestClassifier(
        n_estimators=220,
        max_depth=22,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced",
    )
    clf.fit(X_train, y_train)
    acc = float(clf.score(X_test, y_test))
    print("Test accuracy:", round(acc, 4))

    bundle = {
        "model": clf,
        "feature_dim": X.shape[1],
        "classes": [0, 1, 2],
        "meta": {"type": "RandomForestClassifier", "sklearn": True},
    }
    joblib.dump(bundle, out)
    print("Saved:", out)


if __name__ == "__main__":
    main()
