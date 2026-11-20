"""
Model Training & Evaluation Pipeline for Indraprastha NEET Academy
AI-Powered Personalized Learning Intelligence System

Trains:
  Model A: Topic Mastery Regressor (Random Forest & Gradient Boosting)
  Model B: Learning Pattern Classifier (Multi-label RandomForest / GradientBoosting)
Evaluates on unseen student test splits, saves artifacts, and outputs comprehensive metrics.
"""

import os
import json
import numpy as np
import pandas as pd
import joblib

from sklearn.model_selection import GroupShuffleSplit
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, RandomForestClassifier, GradientBoostingClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.metrics import (
    mean_squared_error, mean_absolute_error, r2_score,
    classification_report, f1_score, precision_score, recall_score, hamming_loss
)

from dataset_generator import generate_student_cohort_dataset

FEATURES = [
    "difficulty",
    "content_views",
    "total_attempts",
    "correct_count",
    "accuracy",
    "recent_accuracy",
    "previous_accuracy",
    "accuracy_delta",
    "repeated_mistakes",
    "avg_time_seconds",
    "days_since_study",
    "days_since_practice",
    "revision_count"
]

TARGET_REG = "mastery_score"
TARGET_CLS = [
    "label_not_studied",
    "label_poorly_understood",
    "label_repeatedly_incorrect",
    "label_needs_revision"
]

CLASS_NAMES = [
    "NOT_STUDIED",
    "POORLY_UNDERSTOOD",
    "REPEATEDLY_INCORRECT",
    "NEEDS_REVISION"
]

def train_and_evaluate():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    saved_models_dir = os.path.join(script_dir, "saved_models")
    os.makedirs(saved_models_dir, exist_ok=True)

    csv_path = os.path.join(script_dir, "training_dataset.csv")
    if os.path.exists(csv_path):
        print(f"Loading existing dataset from {csv_path}...")
        df = pd.read_csv(csv_path)
    else:
        print("Generating new student cohort training dataset...")
        df = generate_student_cohort_dataset(num_students=450, seed=42)
        df.to_csv(csv_path, index=False)

    print(f"Dataset shape: {df.shape} ({df['student_id'].nunique()} students, {len(df)} records)")

    # Group split by student_id to prevent data leakage
    gss = GroupShuffleSplit(n_splits=1, test_size=0.20, random_state=42)
    train_idx, test_idx = next(gss.split(df, groups=df["student_id"]))

    train_df = df.iloc[train_idx].copy()
    test_df = df.iloc[test_idx].copy()

    print(f"Train set: {len(train_df)} records ({train_df['student_id'].nunique()} students)")
    print(f"Test set:  {len(test_df)} records ({test_df['student_id'].nunique()} students)")

    X_train = train_df[FEATURES]
    X_test = test_df[FEATURES]

    y_train_reg = train_df[TARGET_REG]
    y_test_reg = test_df[TARGET_REG]

    y_train_cls = train_df[TARGET_CLS]
    y_test_cls = test_df[TARGET_CLS]

    # Feature Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # =========================================================================
    # MODEL A: TOPIC MASTERY REGRESSOR
    # =========================================================================
    print("\n" + "=" * 60)
    print("TRAINING MODEL A: TOPIC MASTERY REGRESSOR")
    print("=" * 60)

    # 1. Random Forest Regressor
    rf_reg = RandomForestRegressor(
        n_estimators=120,
        max_depth=12,
        min_samples_split=4,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    rf_reg.fit(X_train, y_train_reg)
    rf_preds = rf_reg.predict(X_test)
    rf_rmse = np.sqrt(mean_squared_error(y_test_reg, rf_preds))
    rf_mae = mean_absolute_error(y_test_reg, rf_preds)
    rf_r2 = r2_score(y_test_reg, rf_preds)

    print(f"[Random Forest Regressor]  R2: {rf_r2:.4f} | RMSE: {rf_rmse:.3f} | MAE: {rf_mae:.3f}")

    # 2. Gradient Boosting Regressor
    gb_reg = GradientBoostingRegressor(
        n_estimators=150,
        learning_rate=0.08,
        max_depth=6,
        subsample=0.85,
        random_state=42
    )
    gb_reg.fit(X_train, y_train_reg)
    gb_preds = gb_reg.predict(X_test)
    gb_rmse = np.sqrt(mean_squared_error(y_test_reg, gb_preds))
    gb_mae = mean_absolute_error(y_test_reg, gb_preds)
    gb_r2 = r2_score(y_test_reg, gb_preds)

    print(f"[Gradient Boosting Regressor] R2: {gb_r2:.4f} | RMSE: {gb_rmse:.3f} | MAE: {gb_mae:.3f}")

    # Select best mastery model
    if gb_r2 >= rf_r2:
        best_reg = gb_reg
        best_reg_name = "GradientBoostingRegressor"
        best_reg_metrics = {"r2": round(gb_r2, 4), "rmse": round(gb_rmse, 3), "mae": round(gb_mae, 3)}
    else:
        best_reg = rf_reg
        best_reg_name = "RandomForestRegressor"
        best_reg_metrics = {"r2": round(rf_r2, 4), "rmse": round(rf_rmse, 3), "mae": round(rf_mae, 3)}

    print(f"\n>> Selected Best Mastery Model: {best_reg_name} (R2={best_reg_metrics['r2']}, RMSE={best_reg_metrics['rmse']})")

    # Feature Importance for Mastery
    importances_reg = dict(zip(FEATURES, [round(float(v), 4) for v in best_reg.feature_importances_]))
    print("\nTop 5 Feature Importances (Mastery):")
    sorted_fi = sorted(importances_reg.items(), key=lambda x: x[1], reverse=True)[:5]
    for k, v in sorted_fi:
        print(f"  - {k}: {v:.4f}")

    # =========================================================================
    # MODEL B: LEARNING PATTERN MULTI-LABEL CLASSIFIER
    # =========================================================================
    print("\n" + "=" * 60)
    print("TRAINING MODEL B: MULTI-LABEL LEARNING PATTERN CLASSIFIER")
    print("=" * 60)

    # Multi-label classifier with RandomForest
    rf_cls = RandomForestClassifier(
        n_estimators=140,
        max_depth=14,
        min_samples_split=4,
        min_samples_leaf=2,
        class_weight="balanced_subsample",
        random_state=42,
        n_jobs=-1
    )
    multi_rf = MultiOutputClassifier(rf_cls)
    multi_rf.fit(X_train, y_train_cls)
    cls_preds = multi_rf.predict(X_test)

    # Evaluate each category
    cls_metrics = {}
    print("\nPer-Category Test Evaluation (Unseen Student Cohort):")
    for i, col in enumerate(TARGET_CLS):
        category_name = CLASS_NAMES[i]
        prec = precision_score(y_test_cls.iloc[:, i], cls_preds[:, i], zero_division=0)
        rec = recall_score(y_test_cls.iloc[:, i], cls_preds[:, i], zero_division=0)
        f1 = f1_score(y_test_cls.iloc[:, i], cls_preds[:, i], zero_division=0)
        support = int(y_test_cls.iloc[:, i].sum())

        cls_metrics[category_name] = {
            "precision": round(float(prec), 4),
            "recall": round(float(rec), 4),
            "f1_score": round(float(f1), 4),
            "test_positive_samples": support
        }
        print(f"  [{category_name.ljust(22)}] Precision: {prec:.4f} | Recall: {rec:.4f} | F1: {f1:.4f} (Support: {support})")

    micro_f1 = f1_score(y_test_cls, cls_preds, average="micro", zero_division=0)
    macro_f1 = f1_score(y_test_cls, cls_preds, average="macro", zero_division=0)
    hamming = hamming_loss(y_test_cls, cls_preds)
    print(f"\nOverall Classifier Performance: Macro F1={macro_f1:.4f} | Micro F1={micro_f1:.4f} | Hamming Loss={hamming:.4f}")

    # =========================================================================
    # SAVE MODEL ARTIFACTS
    # =========================================================================
    reg_path = os.path.join(saved_models_dir, "mastery_model.joblib")
    cls_path = os.path.join(saved_models_dir, "pattern_classifier.joblib")
    scaler_path = os.path.join(saved_models_dir, "scaler.joblib")
    meta_path = os.path.join(saved_models_dir, "model_metadata.json")

    joblib.dump(best_reg, reg_path)
    joblib.dump(multi_rf, cls_path)
    joblib.dump(scaler, scaler_path)

    metadata = {
        "version": "1.0.0",
        "created_at": "2026-11-20T22:45:00Z",
        "features": FEATURES,
        "mastery_model": {
            "algorithm": best_reg_name,
            "metrics": best_reg_metrics,
            "feature_importances": importances_reg
        },
        "pattern_classifier": {
            "algorithm": "MultiOutputClassifier(RandomForestClassifier)",
            "metrics": {
                "macro_f1": round(float(macro_f1), 4),
                "micro_f1": round(float(micro_f1), 4),
                "hamming_loss": round(float(hamming), 4),
                "per_category": cls_metrics
            }
        }
    }

    with open(meta_path, "w") as f:
        json.dump(metadata, f, indent=2)

    print("\n" + "=" * 60)
    print("ALL MODELS SUCCESSFULLY TRAINED & ARTIFACTS SAVED:")
    print(f"  - Regressor:  {reg_path}")
    print(f"  - Classifier: {cls_path}")
    print(f"  - Scaler:     {scaler_path}")
    print(f"  - Metadata:   {meta_path}")
    print("=" * 60)

    return metadata

if __name__ == "__main__":
    train_and_evaluate()

