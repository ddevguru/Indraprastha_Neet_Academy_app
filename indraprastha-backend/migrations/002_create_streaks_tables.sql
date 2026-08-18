-- Create user_streaks table
CREATE TABLE IF NOT EXISTS user_streaks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  activity_date DATE NOT NULL,
  streak_count INT DEFAULT 0,
  last_active_time TIMESTAMP,
  duration_minutes INT DEFAULT 0,
  activity_type VARCHAR(50),
  activity_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_date (user_id, activity_date),
  KEY idx_user_id (user_id),
  KEY idx_activity_date (activity_date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_activities table
CREATE TABLE IF NOT EXISTS user_activities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  activity_date DATE NOT NULL,
  activity_type ENUM('practice', 'test', 'video', 'book', 'revision') NOT NULL,
  activity_count INT DEFAULT 0,
  duration_minutes INT DEFAULT 0,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_user_id (user_id),
  KEY idx_activity_date (activity_date),
  KEY idx_activity_type (activity_type),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_content_views table
CREATE TABLE IF NOT EXISTS user_content_views (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  content_id INT,
  content_name VARCHAR(255) NOT NULL,
  content_type VARCHAR(50),
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_user_id (user_id),
  KEY idx_viewed_at (viewed_at),
  KEY idx_content_type (content_type),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_answers table (for option statistics)
CREATE TABLE IF NOT EXISTS user_answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  practice_set_id INT,
  test_id INT,
  option_key VARCHAR(5) NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_user_id (user_id),
  KEY idx_question_id (question_id),
  KEY idx_practice_set_id (practice_set_id),
  KEY idx_test_id (test_id),
  KEY idx_option_key (option_key),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add indexes for better query performance
CREATE INDEX idx_user_streaks_lookup ON user_streaks(user_id, activity_date DESC);
CREATE INDEX idx_user_activities_lookup ON user_activities(user_id, activity_date DESC);
CREATE INDEX idx_user_content_views_lookup ON user_content_views(user_id, viewed_at DESC);
CREATE INDEX idx_user_answers_stats ON user_answers(question_id, option_key);
