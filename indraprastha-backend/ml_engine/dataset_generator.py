"""
Dataset Generator for Indraprastha NEET Academy
AI-Powered Personalized Learning Intelligence System
Generates diverse, realistic, verified NEET student learning trajectories
across Physics, Chemistry, and Biology to train Topic Mastery and Learning Pattern models.
"""

import numpy as np
import pandas as pd
import json
import os

NEET_CHAPTERS = [
    # Physics Class 11 & 12
    {"subject": "Physics", "chapter": "Units and Measurement", "topic": "Dimensional Analysis", "difficulty": 1.2},
    {"subject": "Physics", "chapter": "Motion in a Straight Line", "topic": "Kinematic Equations & Relative Motion", "difficulty": 1.5},
    {"subject": "Physics", "chapter": "Laws of Motion", "topic": "Friction & Pulley Constraint Systems", "difficulty": 2.0},
    {"subject": "Physics", "chapter": "Work, Energy and Power", "topic": "Work-Energy Theorem & Vertical Circular Motion", "difficulty": 1.8},
    {"subject": "Physics", "chapter": "Rotational Motion", "topic": "Moment of Inertia & Rolling Motion", "difficulty": 2.4},
    {"subject": "Physics", "chapter": "Gravitation", "topic": "Orbital Velocity & Gravitational Potential", "difficulty": 1.6},
    {"subject": "Physics", "chapter": "Thermodynamics", "topic": "Carnot Engine & Thermodynamic Processes", "difficulty": 1.9},
    {"subject": "Physics", "chapter": "Current Electricity", "topic": "Kirchhoff's Laws & Potentiometer", "difficulty": 2.1},
    {"subject": "Physics", "chapter": "Magnetic Effects of Current", "topic": "Biot-Savart Law & Ampere Circuital Law", "difficulty": 2.2},
    {"subject": "Physics", "chapter": "Ray Optics", "topic": "Refraction at Spherical Surfaces & Prisms", "difficulty": 2.3},
    {"subject": "Physics", "chapter": "Semiconductors", "topic": "p-n Junction Diode & Logic Gates", "difficulty": 1.3},

    # Chemistry Class 11 & 12
    {"subject": "Chemistry", "chapter": "Some Basic Concepts of Chemistry", "topic": "Mole Concept & Stoichiometry", "difficulty": 1.7},
    {"subject": "Chemistry", "chapter": "Structure of Atom", "topic": "Bohr Model & Quantum Numbers", "difficulty": 1.8},
    {"subject": "Chemistry", "chapter": "Chemical Bonding", "topic": "VSEPR Theory & Molecular Orbital Theory", "difficulty": 2.2},
    {"subject": "Chemistry", "chapter": "Chemical Thermodynamics", "topic": "Enthalpy, Entropy & Gibbs Free Energy", "difficulty": 2.3},
    {"subject": "Chemistry", "chapter": "Equilibrium", "topic": "Ionic Equilibrium, Buffer & Solubility Product", "difficulty": 2.5},
    {"subject": "Chemistry", "chapter": "Electrochemistry", "topic": "Nernst Equation & Kohlrausch's Law", "difficulty": 2.2},
    {"subject": "Chemistry", "chapter": "Chemical Kinetics", "topic": "First Order Reactions & Arrhenius Equation", "difficulty": 1.9},
    {"subject": "Chemistry", "chapter": "Coordination Compounds", "topic": "Crystal Field Theory & Isomerism", "difficulty": 2.1},
    {"subject": "Chemistry", "chapter": "Hydrocarbons", "topic": "Electrophilic Addition & Free Radical Halogenation", "difficulty": 2.0},
    {"subject": "Chemistry", "chapter": "Organic Chemistry - Oxygen Derivatives", "topic": "Aldol Condensation & Cannizzaro Reaction", "difficulty": 2.4},

    # Biology Class 11 & 12
    {"subject": "Biology", "chapter": "Cell: The Unit of Life", "topic": "Endomembrane System & Fluid Mosaic Model", "difficulty": 1.3},
    {"subject": "Biology", "chapter": "Cell Cycle and Cell Division", "topic": "Mitosis and Meiosis Prophase-I", "difficulty": 1.6},
    {"subject": "Biology", "chapter": "Photosynthesis in Higher Plants", "topic": "C3, C4 Cycle & Light Reactions", "difficulty": 2.2},
    {"subject": "Biology", "chapter": "Plant Kingdom", "topic": "Algae, Bryophytes & Pteridophytes Classification", "difficulty": 1.8},
    {"subject": "Biology", "chapter": "Human Physiology", "topic": "Cardiac Cycle & ECG", "difficulty": 1.7},
    {"subject": "Biology", "chapter": "Neural Control and Coordination", "topic": "Generation & Conduction of Nerve Impulse", "difficulty": 2.1},
    {"subject": "Biology", "chapter": "Sexual Reproduction in Flowering Plants", "topic": "Double Fertilization & Microsporogenesis", "difficulty": 1.5},
    {"subject": "Biology", "chapter": "Principles of Inheritance and Variation", "topic": "Mendelian Genetics, Linkage & Pedigree Analysis", "difficulty": 2.3},
    {"subject": "Biology", "chapter": "Molecular Basis of Inheritance", "topic": "DNA Replication, Transcription & Translation", "difficulty": 2.4},
    {"subject": "Biology", "chapter": "Biotechnology: Principles and Processes", "topic": "Restriction Enzymes, PCR & Recombinant Plasmids", "difficulty": 1.9},
    {"subject": "Biology", "chapter": "Ecosystem and Biodiversity", "topic": "Ecological Pyramids & The Evil Quartet", "difficulty": 1.4}
]

def generate_student_cohort_dataset(num_students=400, seed=42):
    """
    Simulates realistic student learning states across all NEET chapters and topics.
    Covers:
      1. NOT_STUDIED (student hasn't opened chapter notes or attempted tests)
      2. POORLY_UNDERSTOOD (student attempted multiple questions but gets low accuracy < 50%)
      3. REPEATEDLY_INCORRECT (student repeatedly makes errors on the same questions / concepts)
      4. NEEDS_REVISION (student previously mastered the topic, but days elapsed caused forgetting)
      5. GOOD_UNDERSTANDING / MASTERED (high accuracy, low errors, recent practice)
    """
    np.random.seed(seed)
    records = []

    archetypes = [
        "diligent_high_performer",
        "struggling_learner",
        "uneven_reviser",
        "newly_onboarded",
        "average_steady",
        "crammer_forgetful"
    ]

    for student_id in range(1, num_students + 1):
        archetype = np.random.choice(archetypes, p=[0.20, 0.20, 0.20, 0.15, 0.15, 0.10])
        student_speed_bias = np.random.normal(1.0, 0.2)

        for topic_meta in NEET_CHAPTERS:
            subject = topic_meta["subject"]
            chapter = topic_meta["chapter"]
            topic = topic_meta["topic"]
            diff = topic_meta["difficulty"]

            # Probability of studying topic based on archetype
            if archetype == "newly_onboarded":
                studied_prob = 0.25
            elif archetype == "diligent_high_performer":
                studied_prob = 0.90
            elif archetype == "struggling_learner":
                studied_prob = 0.70
            elif archetype == "uneven_reviser":
                studied_prob = 0.65
            elif archetype == "crammer_forgetful":
                studied_prob = 0.75
            else:
                studied_prob = 0.60

            is_studied = np.random.rand() < studied_prob

            if not is_studied:
                # Category 1: NOT_STUDIED
                content_views = 0
                total_attempts = np.random.choice([0, 1, 2], p=[0.75, 0.15, 0.10])
                correct_count = 1 if total_attempts > 0 and np.random.rand() < 0.25 else 0
                accuracy = correct_count / max(1, total_attempts) if total_attempts > 0 else 0.0
                recent_acc = accuracy
                prev_acc = accuracy
                repeated_mistakes = 0
                days_since_study = 999
                days_since_practice = 999
                revision_count = 0
                avg_time = 0.0

                label_not_studied = 1
                label_poorly_understood = 0
                label_repeatedly_incorrect = 0
                label_needs_revision = 0
                mastery_score = float(np.random.uniform(0.0, 15.0)) if total_attempts == 0 else float(np.random.uniform(10.0, 25.0))

            else:
                content_views = int(np.random.geometric(p=0.4))  # 1 to 5+
                days_since_study = int(np.random.exponential(scale=20.0)) + 1

                # Attempted questions count
                if archetype == "diligent_high_performer":
                    total_attempts = int(np.random.uniform(25, 80))
                    base_accuracy = np.random.uniform(0.75, 0.98) - (diff - 1.0) * 0.08
                elif archetype == "struggling_learner":
                    total_attempts = int(np.random.uniform(15, 60))
                    base_accuracy = np.random.uniform(0.25, 0.52) - (diff - 1.0) * 0.10
                elif archetype == "crammer_forgetful":
                    total_attempts = int(np.random.uniform(10, 45))
                    base_accuracy = np.random.uniform(0.40, 0.75)
                else:
                    total_attempts = int(np.random.uniform(10, 50))
                    base_accuracy = np.random.uniform(0.45, 0.80) - (diff - 1.0) * 0.08

                base_accuracy = float(np.clip(base_accuracy, 0.08, 0.98))
                correct_count = int(np.round(total_attempts * base_accuracy))
                accuracy = correct_count / max(1, total_attempts)

                # Previous vs Recent accuracy (trend)
                recent_noise = np.random.normal(0.0, 0.12)
                recent_acc = float(np.clip(accuracy + recent_noise, 0.0, 1.0))
                prev_acc = float(np.clip(accuracy - recent_noise * 0.6, 0.0, 1.0))

                days_since_practice = int(np.random.exponential(scale=15.0)) + 1
                revision_count = int(np.random.choice([0, 1, 2, 3, 4], p=[0.40, 0.30, 0.18, 0.08, 0.04]))
                avg_time = float(np.clip(np.random.normal(55 * diff * student_speed_bias, 15), 20.0, 140.0))

                # Repeated mistakes
                if accuracy < 0.55:
                    repeated_mistakes = int(np.random.choice([1, 2, 3, 4, 5], p=[0.20, 0.35, 0.25, 0.15, 0.05]))
                elif accuracy < 0.75:
                    repeated_mistakes = int(np.random.choice([0, 1, 2], p=[0.60, 0.30, 0.10]))
                else:
                    repeated_mistakes = int(np.random.choice([0, 1], p=[0.90, 0.10]))

                # Calculate Retention (Ebbinghaus forgetting curve)
                # S = S0 * (1 + 0.6 * revision_count) * (accuracy / 0.5)^1.2
                base_stability = 7.0
                stability = base_stability * (1.0 + 0.6 * revision_count) * ((accuracy / 0.5) ** 1.2)
                retention = float(np.exp(-days_since_practice / max(1.0, stability)))

                # Determine True Labels for training
                label_not_studied = 0
                label_poorly_understood = 1 if (accuracy < 0.52 and total_attempts >= 8) else 0
                label_repeatedly_incorrect = 1 if (repeated_mistakes >= 2) else 0
                label_needs_revision = 1 if (retention < 0.60 and accuracy >= 0.50 and days_since_practice > 14) else 0

                # Continuous Mastery Target (0 to 100)
                # Function of accuracy (55%), recent accuracy (20%), retention (15%), revision count (10%), penalized by difficulty & repeated mistakes
                mastery_raw = (
                    accuracy * 55.0 +
                    recent_acc * 20.0 +
                    retention * 15.0 +
                    min(4, revision_count) * 2.5 -
                    repeated_mistakes * 3.5 -
                    (diff - 1.0) * 4.0
                )
                mastery_score = float(np.clip(mastery_raw, 5.0, 99.0))

            records.append({
                "student_id": student_id,
                "subject": subject,
                "chapter": chapter,
                "topic": topic,
                "difficulty": diff,
                "content_views": content_views,
                "total_attempts": total_attempts,
                "correct_count": correct_count,
                "accuracy": round(accuracy, 4),
                "recent_accuracy": round(recent_acc, 4),
                "previous_accuracy": round(prev_acc, 4),
                "accuracy_delta": round(recent_acc - prev_acc, 4),
                "repeated_mistakes": repeated_mistakes,
                "avg_time_seconds": round(avg_time, 2),
                "days_since_study": days_since_study,
                "days_since_practice": days_since_practice,
                "revision_count": revision_count,
                # Targets
                "mastery_score": round(mastery_score, 2),
                "label_not_studied": label_not_studied,
                "label_poorly_understood": label_poorly_understood,
                "label_repeatedly_incorrect": label_repeatedly_incorrect,
                "label_needs_revision": label_needs_revision
            })

    df = pd.DataFrame(records)
    return df

if __name__ == "__main__":
    out_dir = os.path.dirname(os.path.abspath(__file__))
    df = generate_student_cohort_dataset(num_students=450, seed=42)
    csv_path = os.path.join(out_dir, "training_dataset.csv")
    df.to_csv(csv_path, index=False)
    print(f"Generated {len(df)} student-topic learning records across {df['student_id'].nunique()} students.")
    print("Class Distributions:")
    print(f"  NOT_STUDIED: {df['label_not_studied'].sum()} ({df['label_not_studied'].mean():.2%})")
    print(f"  POORLY_UNDERSTOOD: {df['label_poorly_understood'].sum()} ({df['label_poorly_understood'].mean():.2%})")
    print(f"  REPEATEDLY_INCORRECT: {df['label_repeatedly_incorrect'].sum()} ({df['label_repeatedly_incorrect'].mean():.2%})")
    print(f"  NEEDS_REVISION: {df['label_needs_revision'].sum()} ({df['label_needs_revision'].mean():.2%})")
    print(f"Mastery Score: Mean={df['mastery_score'].mean():.2f}, Min={df['mastery_score'].min():.2f}, Max={df['mastery_score'].max():.2f}")
    print(f"Saved dataset to {csv_path}")

