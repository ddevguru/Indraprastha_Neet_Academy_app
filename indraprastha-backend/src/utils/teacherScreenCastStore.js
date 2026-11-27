/**
 * In-memory fast cache for live teacher screen frames, backed by PostgreSQL
 * `teacher_live_screens` table so frames survive across instances/restarts.
 */
const liveFrames = new Map();

function setTeacherFrame(teacherId, payload) {
  const existing = liveFrames.get(teacherId) || {};
  const next = {
    teacherId,
    currentScreen: payload.currentScreen || existing.currentScreen || 'Dashboard',
    currentActivity: payload.currentActivity ?? existing.currentActivity ?? '',
    frameBase64:
      payload.frameBase64 !== undefined && payload.frameBase64 !== null && payload.frameBase64 !== ''
        ? payload.frameBase64
        : existing.frameBase64 || '',
    frameWidth: payload.frameWidth || existing.frameWidth || 0,
    frameHeight: payload.frameHeight || existing.frameHeight || 0,
    appState: payload.appState || 'active',
    updatedAt: new Date().toISOString(),
  };
  liveFrames.set(teacherId, next);
  return next;
}

function getTeacherFrame(teacherId) {
  return liveFrames.get(teacherId) || null;
}

function markTeacherOffline(teacherId, appState = 'offline') {
  const existing = liveFrames.get(teacherId);
  if (existing) {
    existing.appState = appState;
    existing.updatedAt = new Date().toISOString();
    liveFrames.set(teacherId, existing);
  }
}

module.exports = {
  setTeacherFrame,
  getTeacherFrame,
  markTeacherOffline,
};

