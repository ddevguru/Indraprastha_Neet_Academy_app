const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export function getTeacherToken() {
  return localStorage.getItem('teacher_token');
}

export function setTeacherToken(token) {
  if (token) localStorage.setItem('teacher_token', token);
  else localStorage.removeItem('teacher_token');
}

export function clearTeacherToken() {
  localStorage.removeItem('teacher_token');
  localStorage.removeItem('teacher_user');
}

export function getTeacherUser() {
  try {
    const raw = localStorage.getItem('teacher_user');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function setTeacherUser(user) {
  if (user) localStorage.setItem('teacher_user', JSON.stringify(user));
  else localStorage.removeItem('teacher_user');
}

function getAuthHeaders(isJson = true) {
  const token = getTeacherToken();
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

export async function teacherLogin(email, password) {
  const res = await fetch(`${API_BASE}/teacher/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  if (data.token) {
    setTeacherToken(data.token);
  }
  if (data.teacher) {
    setTeacherUser(data.teacher);
  }
  return data;
}

export async function getTeacherProfile() {
  const res = await fetch(`${API_BASE}/teacher/profile`, {
    headers: getAuthHeaders(false),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch profile');
  const prof = data.teacher || data.profile || data;
  return { profile: prof, teacher: prof };
}

export async function getTeacherDashboard() {
  const res = await fetch(`${API_BASE}/teacher/dashboard`, {
    headers: getAuthHeaders(false),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to load dashboard');
  return data;
}

export async function getTeacherDoubts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/teacher/doubts?${query}`, {
    headers: getAuthHeaders(false),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to load doubts');
  return data.doubts || [];
}

export async function getTeacherDoubtDetail(doubtId) {
  const res = await fetch(`${API_BASE}/teacher/doubts/${doubtId}`, {
    headers: getAuthHeaders(false),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to load doubt');
  return { doubt: data.doubt || data };
}

export async function claimDoubt(doubtId) {
  const res = await fetch(`${API_BASE}/teacher/doubts/${doubtId}/claim`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to claim doubt');
  return data;
}

export async function startSolvingDoubt(doubtId) {
  const res = await fetch(`${API_BASE}/teacher/doubts/${doubtId}/start`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to start solving');
  return data;
}

export async function submitDoubtAnswer(doubtId, payload) {
  const response_text = payload.response_text || payload.responseText;
  const attachments = payload.attachments || [];
  const res = await fetch(`${API_BASE}/teacher/doubts/${doubtId}/responses`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ response_text, responseText: response_text, attachments }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit answer');
  return data;
}

export const submitTeacherResponse = submitDoubtAnswer;

export async function getSolutionWhiteboard(doubtId) {
  const res = await fetch(`${API_BASE}/teacher/doubts/${doubtId}/whiteboard`, {
    headers: getAuthHeaders(false),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to load solution whiteboard');
  return data.whiteboard;
}

export async function saveSolutionWhiteboardDraft(doubtId, { documentJson, snapshotDriveLink = '' }) {
  const res = await fetch(`${API_BASE}/teacher/doubts/${doubtId}/whiteboard`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ documentJson, snapshotDriveLink }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to save whiteboard draft');
  return data.whiteboard;
}

export async function publishSolutionWhiteboard(doubtId, { documentJson, snapshotDriveLink = '' }) {
  const res = await fetch(`${API_BASE}/teacher/doubts/${doubtId}/publish-solution`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ documentJson, snapshotDriveLink }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to publish whiteboard solution');
  return data;
}

export async function markDoubtResolved(doubtId) {
  const res = await fetch(`${API_BASE}/teacher/doubts/${doubtId}/resolve`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to resolve doubt');
  return data;
}

export async function uploadMediaFile(file, subfolder = 'DoubtMedia') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('subfolder', subfolder);

  const token = localStorage.getItem('teacher_token');
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/community/upload`, {
    method: 'POST',
    headers,
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload to Google Drive failed');
  return data.file;
}
