/**
 * Utility to automatically match and assign an active teacher to a doubt
 * based on Subject and Class Level, with lowest active workload balancing.
 */

async function findBestTeacherForDoubt(client, classLevel, subject) {
  if (!subject) return null;

  const cleanSubject = String(subject).trim();
  const cleanClass = classLevel ? String(classLevel).trim() : '';

  try {
    const res = await client.query(
      `SELECT tp.id, tp.display_name, tp.email
       FROM teacher_profiles tp
       JOIN teacher_subject_assignments tsa ON tsa.teacher_id = tp.id
       WHERE tp.is_active = TRUE
         AND (
           (LOWER(TRIM(tsa.subject)) = LOWER(TRIM($2)) AND LOWER(TRIM(tsa.class_level)) = LOWER(TRIM($1)))
           OR
           (LOWER(TRIM(tsa.subject)) = LOWER(TRIM($2)))
         )
       ORDER BY 
         CASE WHEN LOWER(TRIM(tsa.class_level)) = LOWER(TRIM($1)) THEN 0 ELSE 1 END ASC,
         (
           SELECT COUNT(*) 
           FROM doubts d 
           WHERE d.assigned_teacher_id = tp.id 
             AND d.status IN ('Assigned', 'In Progress')
         ) ASC,
         tp.id ASC
       LIMIT 1`,
      [cleanClass, cleanSubject]
    );

    return res.rows[0] || null;
  } catch (err) {
    console.error('[AUTO_ASSIGN_TEACHER_ERROR]', err);
    return null;
  }
}

module.exports = {
  findBestTeacherForDoubt,
};
