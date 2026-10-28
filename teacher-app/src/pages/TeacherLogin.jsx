import React, { useState } from 'react';
import { teacherLogin } from '../api';

export default function TeacherLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your credentials');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const data = await teacherLogin(email, password);
      localStorage.setItem('teacher_token', data.token);
      localStorage.setItem('teacher_user', JSON.stringify(data.teacher));
      onLoginSuccess(data.teacher);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: '#F5F7FA', borderRadius: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '32px' }}>🎓</span>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#002350' }}>Indraprastha Teacher Portal</h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
            Doubt Resolution &amp; Solution Whiteboard System
          </p>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email or Teacher Code</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. hcverma@indraprastha.test or TCH-1001"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal →'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
          <p style={{ fontSize: '11px', color: '#64748B' }}>
            Teacher accounts are created and managed by the Academy Administrator. There is no public registration.
          </p>
        </div>
      </div>
    </div>
  );
}
