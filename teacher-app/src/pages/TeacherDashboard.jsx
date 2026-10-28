import React, { useState, useEffect } from 'react';
import { getTeacherDashboard } from '../api';

export default function TeacherDashboard({ teacher, onSelectDoubt }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const res = await getTeacherDashboard();
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading teacher metrics...</div>;
  }

  if (error) {
    return <div style={{ padding: '40px', color: 'red' }}>Error: {error}</div>;
  }

  const { metrics, recentDoubts } = data;

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, #001738 0%, #002350 100%)', color: '#FFFFFF', borderRadius: '14px', padding: '24px 28px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, background: '#D2AE39', color: '#002350', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
            Active Faculty Portal
          </span>
          <h1 style={{ fontSize: '22px', fontWeight: 800, marginTop: '8px' }}>
            Welcome, {teacher?.displayName || 'Professor'}
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', marginTop: '4px' }}>
            Review eligible doubts for your assigned subjects, publish step-by-step whiteboard explanations, and resolve questions.
          </p>
        </div>

        {/* Assigned Subjects Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {teacher?.assignments?.map((a) => (
            <div key={`${a.class_level}-${a.subject}`} style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>
              {a.class_level} • {a.subject}
            </div>
          ))}
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card" style={{ borderLeft: '4px solid #C2410C' }}>
          <div className="metric-label">Pending Doubts</div>
          <div className="metric-value" style={{ color: '#C2410C' }}>{metrics.pending}</div>
          <div className="metric-sub">Waiting for teacher claim</div>
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid #1D4ED8' }}>
          <div className="metric-label">My Assigned Doubts</div>
          <div className="metric-value" style={{ color: '#1D4ED8' }}>{metrics.assigned}</div>
          <div className="metric-sub">Claimed by you</div>
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid #D2AE39' }}>
          <div className="metric-label">In Progress</div>
          <div className="metric-value" style={{ color: '#A16207' }}>{metrics.inProgress}</div>
          <div className="metric-sub">Drafting solution</div>
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid #7E22CE' }}>
          <div className="metric-label">Reopened Cases</div>
          <div className="metric-value" style={{ color: '#7E22CE' }}>{metrics.reopened}</div>
          <div className="metric-sub">Needs follow-up clarification</div>
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid #2E8B57' }}>
          <div className="metric-label">Resolved Doubts</div>
          <div className="metric-value" style={{ color: '#2E8B57' }}>{metrics.resolved}</div>
          <div className="metric-sub">Successfully closed</div>
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid #002350' }}>
          <div className="metric-label">Avg First Response</div>
          <div className="metric-value">{metrics.avgResponseTimeMinutes} <span style={{ fontSize: '14px', fontWeight: 600 }}>mins</span></div>
          <div className="metric-sub">Submission to first answer</div>
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid #002350' }}>
          <div className="metric-label">Avg Resolution Time</div>
          <div className="metric-value">{metrics.avgResolutionTimeMinutes} <span style={{ fontSize: '14px', fontWeight: 600 }}>mins</span></div>
          <div className="metric-sub">Submission to final resolution</div>
        </div>
      </div>

      {/* Recent Assigned Doubts Table */}
      <div className="table-card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#002350' }}>Recent Assigned Doubts</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Doubts matching your assigned class and subject specializations</p>
          </div>
          <button className="btn btn-outline" onClick={loadDashboard}>
            🔄 Refresh
          </button>
        </div>

        {recentDoubts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
            No doubts currently in queue for your assigned subjects.
          </div>
        ) : (
          <table className="doubt-table">
            <thead>
              <tr>
                <th>DOUBT ID</th>
                <th>STUDENT</th>
                <th>CLASS &amp; SUBJECT</th>
                <th>TITLE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentDoubts.map((d) => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 800 }}>#{d.id}</td>
                  <td>{d.student_name || 'Student'}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#002350' }}>{d.class_level}</span> • {d.subject}
                  </td>
                  <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {d.title}
                  </td>
                  <td>
                    <span className={`status-badge badge-${d.status.toLowerCase().replace(' ', '-')}`}>
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => onSelectDoubt(d.id)}
                    >
                      Open &amp; Solve →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
