import React, { useState, useEffect } from 'react';
import { getTeacherProfile } from '../api';

export default function TeacherProfile({ onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getTeacherProfile();
        setProfile(data.profile);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="teacher-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h2>Teacher Profile</h2>
        <p className="text-muted">Account information and assigned academic subjects</p>
      </div>

      {error && <div className="alert-error" style={{ marginBottom: '16px' }}>{error}</div>}

      {profile && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--color-navy)',
                color: '#fff',
                fontSize: '28px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid var(--color-gold)'
              }}
            >
              {(profile.display_name || 'T')[0].toUpperCase()}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '22px' }}>{profile.display_name}</h3>
              <p style={{ margin: '4px 0 0 0', color: 'var(--color-muted)', fontSize: '14px' }}>
                {profile.email} • Code: <strong>{profile.teacher_code || 'T-INDRAPRASTHA'}</strong>
              </p>
              <div style={{ marginTop: '8px' }}>
                <span className={`badge ${profile.is_active ? 'badge-resolved' : 'badge-pending'}`}>
                  {profile.is_active ? 'Active Faculty' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--color-navy)' }}>
              Assigned Classes & Subjects ({profile.assignments ? profile.assignments.length : 0})
            </h4>
            {profile.assignments && profile.assignments.length > 0 ? (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {profile.assignments.map((asgn, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 16px',
                      background: 'var(--color-background)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}
                  >
                    <strong>{asgn.class_level}</strong> — <span style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>{asgn.subject}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted" style={{ fontSize: '13px' }}>
                No subjects currently assigned. Contact the administrator.
              </p>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '24px', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={onLogout} style={{ color: '#D92D20' }}>
              🚪 Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
