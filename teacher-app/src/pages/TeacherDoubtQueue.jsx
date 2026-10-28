import React, { useState, useEffect, useCallback } from 'react';
import { getTeacherDoubts, claimDoubt, startSolvingDoubt } from '../api';

export default function TeacherDoubtQueue({ onSelectDoubt }) {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionInProgress, setActionInProgress] = useState(null);

  const fetchDoubts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (classFilter) params.class_level = classFilter;
      if (subjectFilter) params.subject = subjectFilter;
      if (searchQuery) params.search = searchQuery;
      const data = await getTeacherDoubts(params);
      setDoubts(data.doubts || []);
    } catch (err) {
      setError(err.message || 'Failed to load doubts');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, classFilter, subjectFilter, searchQuery]);

  useEffect(() => {
    fetchDoubts();
  }, [fetchDoubts]);

  const handleClaim = async (e, doubtId) => {
    e.stopPropagation();
    setActionInProgress(doubtId);
    try {
      await claimDoubt(doubtId);
      await fetchDoubts();
    } catch (err) {
      alert(`Could not claim doubt: ${err.message}`);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleStart = async (e, doubtId) => {
    e.stopPropagation();
    setActionInProgress(doubtId);
    try {
      await startSolvingDoubt(doubtId);
      await fetchDoubts();
    } catch (err) {
      alert(`Could not start solving: ${err.message}`);
    } finally {
      setActionInProgress(null);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    let cls = 'badge-pending';
    if (s === 'assigned') cls = 'badge-assigned';
    else if (s === 'in_progress') cls = 'badge-in_progress';
    else if (s === 'answered') cls = 'badge-answered';
    else if (s === 'resolved') cls = 'badge-resolved';
    else if (s === 'reopened') cls = 'badge-reopened';
    return <span className={`badge ${cls}`}>{(status || '').replace('_', ' ').toUpperCase()}</span>;
  };

  return (
    <div className="teacher-page">
      <div className="page-header flex-between">
        <div>
          <h2>Subject Doubt Queue</h2>
          <p className="text-muted">
            All submitted doubts for your assigned subjects and classes.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchDoubts}>
          🔄 Refresh
        </button>
      </div>

      {error && <div className="alert-error" style={{ marginBottom: '16px' }}>{error}</div>}

      {/* Filters bar */}
      <div className="card filters-card" style={{ marginBottom: '20px' }}>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search Doubt / Student</label>
            <input
              type="text"
              className="input-field"
              placeholder="Search title, ID, student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select
              className="input-field"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="answered">Answered</option>
              <option value="reopened">Reopened</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Class</label>
            <select
              className="input-field"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="">All Classes</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Subject</label>
            <select
              className="input-field"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doubts table / cards */}
      <div className="card">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading eligible doubts...</p>
          </div>
        ) : doubts.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: '42px' }}>🎯</span>
            <h3>No doubts found</h3>
            <p className="text-muted">
              There are no doubts matching your current filter criteria.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doubt ID</th>
                  <th>Student</th>
                  <th>Class & Subject</th>
                  <th>Title & Description</th>
                  <th>Attachments</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doubts.map((doubt) => {
                  const isActionBusy = actionInProgress === doubt.id;
                  const canClaim = doubt.status === 'pending';
                  const canStart = doubt.status === 'assigned';
                  return (
                    <tr
                      key={doubt.id}
                      className="clickable-row"
                      onClick={() => onSelectDoubt && onSelectDoubt(doubt.id)}
                    >
                      <td style={{ fontWeight: 600, color: 'var(--color-navy)' }}>
                        #{doubt.id}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{doubt.student_name || 'Student'}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                          ID: {doubt.student_id ? String(doubt.student_id).substring(0, 8) : '—'}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-assigned" style={{ marginRight: '4px' }}>
                          {doubt.class_level}
                        </span>
                        <span className="badge badge-navy">
                          {doubt.subject}
                        </span>
                      </td>
                      <td style={{ maxWidth: '280px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-navy)' }} className="truncate">
                          {doubt.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-muted)' }} className="truncate">
                          {doubt.description || 'No additional text'}
                        </div>
                      </td>
                      <td>
                        {doubt.attachments && doubt.attachments.length > 0 ? (
                          <span className="badge badge-gold" title={`${doubt.attachments.length} attachment(s)`}>
                            📎 {doubt.attachments.length}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-muted)', fontSize: '12px' }}>None</span>
                        )}
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                        {doubt.created_at ? new Date(doubt.created_at).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '—'}
                      </td>
                      <td>{getStatusBadge(doubt.status)}</td>
                      <td style={{ fontSize: '12px' }}>
                        {doubt.assigned_teacher_name ? (
                          <span style={{ fontWeight: 600 }}>{doubt.assigned_teacher_name}</span>
                        ) : (
                          <span style={{ color: 'var(--color-muted)', fontStyle: 'italic' }}>Unassigned</span>
                        )}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="btn-group">
                          {canClaim && (
                            <button
                              className="btn btn-sm btn-primary"
                              disabled={isActionBusy}
                              onClick={(e) => handleClaim(e, doubt.id)}
                            >
                              {isActionBusy ? '...' : 'Claim'}
                            </button>
                          )}
                          {canStart && (
                            <button
                              className="btn btn-sm btn-secondary"
                              disabled={isActionBusy}
                              onClick={(e) => handleStart(e, doubt.id)}
                            >
                              {isActionBusy ? '...' : 'Start'}
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => onSelectDoubt && onSelectDoubt(doubt.id)}
                          >
                            Open & Solve →
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
