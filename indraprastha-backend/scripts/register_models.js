const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../src/db.js');

async function registerModels() {
  try {
    const metaPath = path.join(__dirname, '../ml_engine/saved_models/model_metadata.json');
    if (!fs.existsSync(metaPath)) {
      throw new Error('model_metadata.json not found');
    }
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    // Model A: Mastery Regressor
    await db.query(`
      INSERT INTO ai_model_registry (model_name, version, algorithm, task_type, metrics_json, artifacts_path, training_sample_count, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING;
    `, [
      'NEET_Topic_Mastery_Model',
      meta.version,
      meta.mastery_model.algorithm,
      'regression',
      JSON.stringify(meta.mastery_model.metrics),
      'ml_engine/saved_models/mastery_model.joblib',
      11520,
      true
    ]);

    // Model B: Learning Pattern Classifier
    await db.query(`
      INSERT INTO ai_model_registry (model_name, version, algorithm, task_type, metrics_json, artifacts_path, training_sample_count, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING;
    `, [
      'NEET_Learning_Pattern_Classifier',
      meta.version,
      meta.pattern_classifier.algorithm,
      'multi_label_classification',
      JSON.stringify(meta.pattern_classifier.metrics),
      'ml_engine/saved_models/pattern_classifier.joblib',
      11520,
      true
    ]);

    console.log('Successfully registered both ML models in ai_model_registry table!');
    const rows = await db.query('SELECT id, model_name, version, algorithm, metrics_json FROM ai_model_registry');
    console.log(rows.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error registering models:', err);
    process.exit(1);
  }
}

registerModels();

