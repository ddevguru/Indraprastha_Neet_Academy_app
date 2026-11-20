"""
Inference Engine for Indraprastha NEET Academy
AI-Powered Personalized Learning Intelligence System
Accepts student topic features, predicts mastery and multi-label learning patterns,
computes Ebbinghaus forgetting curve retention, and generates explainable diagnostic text.
"""

import os
import sys
import json
import numpy as np
import joblib

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SAVED_MODELS_DIR = os.path.join(SCRIPT_DIR, "saved_models")

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

class AIPredictor:
    def __init__(self):
        reg_path = os.path.join(SAVED_MODELS_DIR, "mastery_model.joblib")
        cls_path = os.path.join(SAVED_MODELS_DIR, "pattern_classifier.joblib")
        meta_path = os.path.join(SAVED_MODELS_DIR, "model_metadata.json")

        if not os.path.exists(reg_path) or not os.path.exists(cls_path):
            raise FileNotFoundError(f"Trained models not found in {SAVED_MODELS_DIR}. Run train_models.py first.")

        self.regressor = joblib.load(reg_path)
        self.classifier = joblib.load(cls_path)
        with open(meta_path, "r") as f:
            self.metadata = json.load(f)

    def calculate_forgetting_retention(self, days_since_practice, revision_count, mastery_score):
        """
        Calculates memory retention percentage using Ebbinghaus spaced-repetition model:
        R(t) = exp(-t / S)
        where S is memory stability in days.
        """
        if days_since_practice >= 999:
            return 0.0

        base_stability = 7.0  # days for typical complex NEET concepts
        # Each revision expands stability by ~60%, and higher mastery solidifies recall
        normalized_mastery = max(0.2, mastery_score / 50.0)
        stability = base_stability * (1.0 + 0.65 * min(5, revision_count)) * (normalized_mastery ** 1.15)
        retention = float(np.exp(-days_since_practice / max(1.0, stability))) * 100.0
        return round(float(np.clip(retention, 0.0, 100.0)), 1)

    def derive_revision_priority(self, retention, mastery_score, is_needs_revision):
        if not is_needs_revision and retention >= 70.0:
            return "NONE"
        if retention < 40.0 and mastery_score >= 40.0:
            return "HIGH"
        if retention < 65.0:
            return "MEDIUM"
        return "LOW"

    def derive_mastery_category(self, score):
        if score >= 90.0:
            return "MASTER"
        elif score >= 75.0:
            return "PROFICIENT"
        elif score >= 55.0:
            return "COMPETENT"
        elif score >= 35.0:
            return "DEVELOPING"
        else:
            return "NOVICE"

    def generate_explanation(self, topic, metrics, preds, retention):
        """
        Generates transparent, evidence-based academic explanations.
        """
        reasons = []
        is_not_studied = preds["is_not_studied"]
        is_poorly_understood = preds["is_poorly_understood"]
        is_repeatedly_incorrect = preds["is_repeatedly_incorrect"]
        is_needs_revision = preds["is_needs_revision"]

        acc_pct = round(metrics.get("accuracy", 0.0) * 100, 1)
        recent_pct = round(metrics.get("recent_accuracy", 0.0) * 100, 1)
        prev_pct = round(metrics.get("previous_accuracy", 0.0) * 100, 1)
        repeated = metrics.get("repeated_mistakes", 0)
        days_practice = metrics.get("days_since_practice", 0)
        total_attempts = metrics.get("total_attempts", 0)
        views = metrics.get("content_views", 0)

        if is_not_studied:
            if views == 0 and total_attempts == 0:
                return f"You haven't studied the chapter notes or attempted questions for {topic} yet. We recommend reading the foundational NCERT notes first."
            else:
                return f"Insufficient study activity recorded for {topic} ({total_attempts} questions attempted). Begin with chapter notes and core concept review."

        if is_poorly_understood and is_repeatedly_incorrect:
            diff = prev_pct - recent_pct
            trend_str = f", dropping by {diff:.1f}% recently" if diff > 5 else ""
            return (f"Your accuracy in {topic} is {acc_pct}% across {total_attempts} questions{trend_str}. "
                    f"You have made {repeated} recurring conceptual mistakes on key questions. "
                    f"Targeted review of weak concepts and remedial practice is recommended.")

        if is_poorly_understood:
            return (f"Your accuracy in {topic} stands at {acc_pct}% ({metrics.get('correct_count', 0)}/{total_attempts} correct), "
                    f"which is below the mastery benchmark of 65%. Additional guided practice will strengthen your foundation.")

        if is_repeatedly_incorrect:
            return (f"You have answered {repeated} questions incorrectly multiple times in {topic}. "
                    f"These recurring mistakes indicate a specific concept gap that needs focused correction.")

        if is_needs_revision:
            return (f"It has been {days_practice} days since you last practiced {topic}. "
                    f"Your calculated memory retention has declined to {retention}%. "
                    f"A quick spaced-repetition revision session is recommended to prevent further forgetting.")

        if preds["mastery_score"] >= 75.0:
            return (f"Strong grasp demonstrated in {topic} with {acc_pct}% accuracy and steady retention ({retention}%). "
                    f"Maintain this mastery level with periodic test challenges.")

        return f"Progressing well in {topic} with {acc_pct}% overall accuracy across {total_attempts} questions."

    def predict_single(self, topic_feature_dict):
        # Extract features DataFrame with exact feature names
        import pandas as pd
        row_dict = {f: [float(topic_feature_dict.get(f, 0.0))] for f in FEATURES}
        x_df = pd.DataFrame(row_dict)

        # Model A: Topic Mastery
        mastery_pred = float(self.regressor.predict(x_df)[0])
        mastery_score = round(float(np.clip(mastery_pred, 0.0, 100.0)), 1)
        mastery_category = self.derive_mastery_category(mastery_score)

        # Model B: Learning Patterns (Multi-label)
        cls_pred = self.classifier.predict(x_df)[0]
        # In case total_attempts == 0 and views == 0, guarantee not_studied is flagged
        total_attempts = topic_feature_dict.get("total_attempts", 0)
        content_views = topic_feature_dict.get("content_views", 0)
        if total_attempts == 0 and content_views == 0:
            is_not_studied = True
        else:
            is_not_studied = bool(cls_pred[0])

        is_poorly_understood = bool(cls_pred[1])
        is_repeatedly_incorrect = bool(cls_pred[2])
        is_needs_revision = bool(cls_pred[3])

        # Confidence estimate from tree variance / probability
        try:
            tree_preds = [tree.predict(x)[0] for tree in self.regressor.estimators_[:30]]
            std_err = float(np.std(tree_preds))
            confidence = round(float(np.clip(100.0 - (std_err * 2.5), 60.0, 98.0)), 1)
        except Exception:
            confidence = 85.0

        # Forgetting curve retention
        days_since_practice = topic_feature_dict.get("days_since_practice", 999)
        revision_count = topic_feature_dict.get("revision_count", 0)
        retention = self.calculate_forgetting_retention(days_since_practice, revision_count, mastery_score)
        revision_priority = self.derive_revision_priority(retention, mastery_score, is_needs_revision)

        preds = {
            "mastery_score": mastery_score,
            "mastery_category": mastery_category,
            "prediction_confidence": confidence,
            "is_not_studied": is_not_studied,
            "is_poorly_understood": is_poorly_understood,
            "is_repeatedly_incorrect": is_repeatedly_incorrect,
            "is_needs_revision": is_needs_revision,
            "retention_estimate": retention,
            "revision_priority": revision_priority
        }

        # Trend calculation
        acc_delta = topic_feature_dict.get("accuracy_delta", 0.0)
        if acc_delta > 0.08:
            preds["performance_trend"] = "IMPROVING"
        elif acc_delta < -0.08:
            preds["performance_trend"] = "DECLINING"
        else:
            preds["performance_trend"] = "STABLE"

        topic_name = topic_feature_dict.get("topic", "this topic")
        preds["ai_explanation"] = self.generate_explanation(topic_name, topic_feature_dict, preds, retention)

        return preds

    def predict_batch(self, topic_feature_list):
        return [self.predict_single(item) for item in topic_feature_list]

if __name__ == "__main__":
    predictor = AIPredictor()

    if len(sys.argv) > 1 and sys.argv[1] != "--test":
        # Stdin or argument JSON
        raw_input = sys.argv[1]
        if os.path.exists(raw_input):
            with open(raw_input, "r") as f:
                data = json.load(f)
        else:
            data = json.loads(raw_input)

        if isinstance(data, list):
            res = predictor.predict_batch(data)
        else:
            res = predictor.predict_single(data)
        print(json.dumps(res))
    else:
        # Self-test with sample cases
        sample_tests = [
            # Case 1: Brand new / Unstudied
            {
                "topic": "Dimensional Analysis",
                "difficulty": 1.2,
                "content_views": 0,
                "total_attempts": 0,
                "correct_count": 0,
                "accuracy": 0.0,
                "recent_accuracy": 0.0,
                "previous_accuracy": 0.0,
                "accuracy_delta": 0.0,
                "repeated_mistakes": 0,
                "avg_time_seconds": 0.0,
                "days_since_study": 999,
                "days_since_practice": 999,
                "revision_count": 0
            },
            # Case 2: Poorly understood with repeated mistakes
            {
                "topic": "Moment of Inertia & Rolling Motion",
                "difficulty": 2.4,
                "content_views": 2,
                "total_attempts": 35,
                "correct_count": 12,
                "accuracy": 0.34,
                "recent_accuracy": 0.28,
                "previous_accuracy": 0.40,
                "accuracy_delta": -0.12,
                "repeated_mistakes": 4,
                "avg_time_seconds": 95.0,
                "days_since_study": 10,
                "days_since_practice": 2,
                "revision_count": 1
            },
            # Case 3: Needs revision (previously mastered, but 28 days elapsed)
            {
                "topic": "Double Fertilization & Microsporogenesis",
                "difficulty": 1.5,
                "content_views": 4,
                "total_attempts": 40,
                "correct_count": 34,
                "accuracy": 0.85,
                "recent_accuracy": 0.82,
                "previous_accuracy": 0.88,
                "accuracy_delta": -0.06,
                "repeated_mistakes": 0,
                "avg_time_seconds": 45.0,
                "days_since_study": 30,
                "days_since_practice": 28,
                "revision_count": 1
            }
        ]

        print("=== RUNNING INFERENCE SELF-TEST ===")
        for i, sample in enumerate(sample_tests, 1):
            out = predictor.predict_single(sample)
            print(f"\n[Test Case {i}: {sample['topic']}]")
            print(f"  Mastery Score: {out['mastery_score']}% ({out['mastery_category']}) [Confidence: {out['prediction_confidence']}%]")
            print(f"  Categories: Not Studied={out['is_not_studied']} | Poorly Understood={out['is_poorly_understood']} | Repeated Mistakes={out['is_repeatedly_incorrect']} | Needs Revision={out['is_needs_revision']}")
            print(f"  Retention Estimate: {out['retention_estimate']}% | Revision Priority: {out['revision_priority']}")
            print(f"  AI Explanation: {out['ai_explanation']}")
