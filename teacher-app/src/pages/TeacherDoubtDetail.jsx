import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  getTeacherDoubtDetail,
  claimDoubt,
  startSolvingDoubt,
  submitTeacherResponse,
  uploadMediaFile,
  markDoubtResolved
} from '../api';
import TeacherWhiteboard from '../components/TeacherWhiteboard';

export default function TeacherDoubtDetail({ doubtId, onBack }) {
  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyAction, setBusyAction] = useState(false);

  // Answer form
  const [responseText, setResponseText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [activeTab, setActiveTab] = useState('answer'); // 'answer' | 'whiteboard' | 'history'

  const fileInputRef = useRef(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTeacherDoubtDetail(doubtId);
      setDoubt(data.doubt);
    } catch (err) {
      setError(err.message || 'Failed to load doubt details');
    } finally {
      setLoading(false);
    }
  }, [doubtId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleClaim = async () => {
    setBusyAction(true);
    try {
      await claimDoubt(doubtId);
      await fetchDetail();
    } catch (err) {
      alert(`Claim failed: ${err.message}`);
    } finally {
      setBusyAction(false);
    }
  };

  const handleStartSolving = async () => {
    setBusyAction(true);
    try {
      await startSolvingDoubt(doubtId);
      await fetchDetail();
    } catch (err) {
      alert(`Start solving failed: ${err.message}`);
    } finally {
      setBusyAction(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');
    try {
      const uploaded = await uploadMediaFile(file, `doubts/${doubtId}/teacher_responses`);
      setAttachments((prev) => [
        ...prev,
        {
          storage_key: uploaded.storage_key,
          original_filename: uploaded.original_filename || file.name,
          mime_type: uploaded.mime_type || file.type,
          file_size: uploaded.file_size || file.size,
          drive_file_id: uploaded.drive_file_id,
          drive_view_link: uploaded.drive_view_link,
          thumbnail_url: uploaded.thumbnail_url,
          file_url: uploaded.file_url
        }
      ]);
    } catch (err) {
      setUploadError(`Failed to upload to Google Drive: ${err.message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!responseText.trim()) {
      alert('Please enter an explanation before submitting.');
      return;
    }
    setSubmittingAnswer(true);
    try {
      await submitTeacherResponse(doubtId, {
        responseText: responseText,
        response_text: responseText,
        attachments: attachments
      });
      setResponseText('');
      setAttachments([]);
      await fetchDetail();
      setActiveTab('history');
      alert('✓ Answer submitted successfully!');
    } catch (err) {
      alert(`Submission failed: ${err.message}`);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const handleResolve = async () => {
    if (!window.confirm('Are you sure you want to mark this doubt as resolved?')) return;
    setBusyAction(true);
    try {
      await markDoubtResolved(doubtId);
      await fetchDetail();
      alert('Doubt has been marked as resolved.');
    } catch (err) {
      alert(`Failed to resolve: ${err.message}`);
    } finally {
      setBusyAction(false);
    }
  };

  if (loading) {
    return (
      <div className="teacher-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading doubt details...</p>
        </div>
      </div>
    );
  }

  if (error || !doubt) {
    return (
      <div className="teacher-page">
        <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '16px' }}>
          ← Back to Doubts
        </button>
        <div className="alert-error">{error || 'Doubt not found'}</div>
      </div>
    );
  }

  const isPending = doubt.status === 'pending';
  const isAssigned = doubt.status === 'assigned';
  const isResolved = doubt.status === 'resolved';

  return (
    <div className="teacher-page">
      {/* Top action bar */}
      <div className="page-header flex-between" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back
          </button>
          <div>
            <h2 style={{ margin: 0 }}>Doubt #{doubt.id}: {doubt.title}</h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              <span className="badge badge-assigned">{doubt.class_level}</span>
              <span className="badge badge-navy">{doubt.subject}</span>
              <span className={`badge badge-${doubt.status}`}>{doubt.status.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {isPending && (
            <button className="btn btn-primary" disabled={busyAction} onClick={handleClaim}>
              {busyAction ? 'Claiming...' : 'Claim This Doubt'}
            </button>
          )}
          {isAssigned && (
            <button className="btn btn-secondary" disabled={busyAction} onClick={handleStartSolving}>
              {busyAction ? 'Starting...' : 'Start Solving'}
            </button>
          )}
          {!isResolved && (
            <button className="btn btn-success" disabled={busyAction} onClick={handleResolve}>
              ✓ Mark Resolved
            </button>
          )}
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="doubt-detail-grid">
        {/* Left Column: Student Question & Context */}
        <div className="doubt-left-col">
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
              Student Doubt Details
            </h3>
            <div style={{ marginTop: '12px', fontSize: '13px' }}>
              <p><strong>Student:</strong> {doubt.student_name || 'Student'} (ID: {doubt.student_id ? String(doubt.student_id).substring(0, 8) : '—'})</p>
              <p><strong>Submitted At:</strong> {doubt.created_at ? new Date(doubt.created_at).toLocaleString('en-IN') : '—'}</p>
              <p><strong>Assigned Teacher:</strong> {doubt.assigned_teacher_name || 'Not yet claimed'}</p>
            </div>

            <div style={{ marginTop: '16px', background: '#F8F9FC', padding: '14px', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--color-navy)' }}>Question Description</h4>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>
                {doubt.description || 'No detailed text description provided.'}
              </p>
            </div>

            {/* Submitted Attachments */}
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
                Student Submitted Attachments ({doubt.attachments ? doubt.attachments.length : 0})
              </h4>
              {doubt.attachments && doubt.attachments.length > 0 ? (
                <div className="attachments-grid">
                  {doubt.attachments.map((att, idx) => {
                    const isImg = (att.mime_type && att.mime_type.startsWith('image/')) ||
                      att.original_filename?.endsWith('.jpg') ||
                      att.original_filename?.endsWith('.png') ||
                      att.original_filename?.endsWith('.jpeg') ||
                      att.original_filename?.endsWith('.webp');
                    const isAudio = (att.mime_type && att.mime_type.startsWith('audio/')) ||
                      att.original_filename?.endsWith('.mp3') ||
                      att.original_filename?.endsWith('.m4a') ||
                      att.original_filename?.endsWith('.wav') ||
                      att.original_filename?.endsWith('.aac');
                    const fileId = att.drive_file_id || (att.drive_view_link && att.drive_view_link.match(/\/d\/([^/]+)/)?.[1]);
                    const imgUrl = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : (att.drive_view_link || att.file_url);
                    const audioStreamUrl = fileId ? `https://docs.google.com/uc?export=download&id=${fileId}` : (att.drive_download_link || att.file_url || att.drive_view_link);
                    const viewUrl = att.drive_view_link || att.file_url;

                    return (
                      <div key={att.id || idx} className="attachment-card" style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden', padding: '10px', background: '#FFF' }}>
                        {isImg ? (
                          <div style={{ height: '150px', overflow: 'hidden', borderRadius: '4px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                              src={imgUrl}
                              alt={att.original_filename}
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                          </div>
                        ) : isAudio ? (
                          <div style={{ padding: '12px 8px', textAlign: 'center', background: '#EEF2F7', borderRadius: '6px' }}>
                            <span style={{ fontSize: '26px' }}>🎵</span>
                            <div style={{ fontSize: '12px', marginTop: '4px', fontWeight: 600 }} className="truncate">
                              {att.original_filename}
                            </div>
                            <audio controls src={audioStreamUrl} style={{ width: '100%', height: '36px', marginTop: '10px' }} />
                          </div>
                        ) : (
                          <div style={{ padding: '24px 12px', textAlign: 'center', background: '#EEF2F7', borderRadius: '4px' }}>
                            <span style={{ fontSize: '28px' }}>
                              {att.mime_type?.includes('pdf') ? '📄' : '📁'}
                            </span>
                            <div style={{ fontSize: '12px', marginTop: '6px', fontWeight: 600 }} className="truncate">
                              {att.original_filename}
                            </div>
                          </div>
                        )}
                        <div style={{ padding: '8px 0 0 0', textAlign: 'center' }}>
                          <a
                            href={viewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline"
                            style={{ width: '100%', fontSize: '11px', display: 'block', textAlign: 'center' }}
                          >
                            Open in Drive ↗
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted" style={{ fontSize: '13px' }}>
                  No media files were attached by the student.
                </p>
              )}
            </div>
          </div>

          {/* Published Solution Whiteboard Snapshot if exists */}
          {doubt.published_whiteboard && (
            <div className="card" style={{ marginBottom: '20px' }}>
              <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                Current Published Whiteboard Solution
              </h3>
              <div style={{ marginTop: '12px' }}>
                <span className="badge badge-success">✓ Published to Student</span>
                <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '4px' }}>
                  Published at: {new Date(doubt.published_whiteboard.published_at).toLocaleString('en-IN')} (v{doubt.published_whiteboard.version})
                </p>
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '12px', background: '#FAFAFA', marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#555' }}>
                    Canvas solution contains {doubt.published_whiteboard.document_json?.strokes?.length || 0} drawing strokes / elements.
                    Student can view this in read-only mode in their app.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Teacher Solution Workspace */}
        <div className="doubt-right-col">
          {/* Tabs header */}
          <div className="tabs-header" style={{ marginBottom: '16px' }}>
            <button
              className={`tab-btn ${activeTab === 'answer' ? 'active' : ''}`}
              onClick={() => setActiveTab('answer')}
            >
              ✍️ Written Answer
            </button>
            <button
              className={`tab-btn ${activeTab === 'whiteboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('whiteboard')}
            >
              🎨 Solution Whiteboard
            </button>
            <button
              className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              📜 Response History ({doubt.responses ? doubt.responses.length : 0})
            </button>
          </div>

          {/* Tab 1: Written Answer Composer */}
          {activeTab === 'answer' && (
            <div className="card">
              <h3>Compose Teacher Solution</h3>
              <p className="text-muted" style={{ fontSize: '13px' }}>
                Provide a step-by-step scientific explanation. Attach images, diagrams, audio explanations, or PDFs.
              </p>

              <form onSubmit={handleSubmitAnswer} style={{ marginTop: '16px' }}>
                <div className="form-group">
                  <label>Step-by-Step Explanation *</label>
                  <textarea
                    rows={8}
                    className="input-field"
                    placeholder="Enter complete solution, equations, logic, and concluding sentence (e.g. 'Therefore, Option (A) is the correct answer.')..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    required
                  />
                </div>

                {/* Upload to Google Drive */}
                <div className="form-group" style={{ marginTop: '14px' }}>
                  <label>Solution Attachments (Saved directly to Admin Google Drive)</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      accept="image/*,video/*,audio/*,.pdf"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      {isUploading ? 'Uploading to Drive...' : '📎 Upload File to Drive'}
                    </button>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                      Supports Images, Videos, Voice notes, and PDF
                    </span>
                  </div>
                  {uploadError && <div className="alert-error" style={{ marginTop: '8px' }}>{uploadError}</div>}
                </div>

                {/* List of attached files */}
                {attachments.length > 0 && (
                  <div style={{ marginTop: '12px', background: '#F8F9FC', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Attached Files:</div>
                    {attachments.map((att, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '4px 0',
                          fontSize: '12px',
                          borderBottom: '1px solid #ECECEC'
                        }}
                      >
                        <span>📎 {att.original_filename}</span>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          onClick={() => removeAttachment(idx)}
                          style={{ color: '#D92D20' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submittingAnswer || isUploading}
                    style={{ minWidth: '160px' }}
                  >
                    {submittingAnswer ? 'Submitting...' : '🚀 Submit Answer'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 2: Interactive Solution Whiteboard */}
          {activeTab === 'whiteboard' && (
            <div className="card">
              <div style={{ marginBottom: '14px' }}>
                <h3 style={{ margin: '0 0 4px 0' }}>Interactive Solution Whiteboard</h3>
                <p className="text-muted" style={{ fontSize: '13px', margin: 0 }}>
                  Draw diagrams and step-by-step physics/chemistry structures. Save drafts privately or publish live to the student.
                </p>
              </div>
              <TeacherWhiteboard
                doubtId={doubtId}
                initialDocument={doubt.whiteboard?.document_json}
                onPublished={() => {
                  fetchDetail();
                  alert('Whiteboard solution successfully published to student!');
                }}
              />
            </div>
          )}

          {/* Tab 3: Response History */}
          {activeTab === 'history' && (
            <div className="card">
              <h3>Resolution History & Teacher Responses</h3>
              {doubt.responses && doubt.responses.length > 0 ? (
                <div className="timeline-container" style={{ marginTop: '16px' }}>
                  {doubt.responses.map((resp, idx) => (
                    <div key={resp.id || idx} className="timeline-item" style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-muted)' }}>
                        <strong>Response #{idx + 1} by {resp.teacher_name || 'Teacher'}</strong>
                        <span>{resp.created_at ? new Date(resp.created_at).toLocaleString('en-IN') : '—'}</span>
                      </div>
                      <div style={{ marginTop: '8px', background: '#F8F9FC', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                        {resp.response_text}
                      </div>
                      {resp.attachments && resp.attachments.length > 0 && (
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {resp.attachments.map((att, aIdx) => (
                            <a
                              key={aIdx}
                              href={att.drive_view_link || att.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline"
                            >
                              📎 {att.original_filename || 'Attachment'} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '30px' }}>
                  <p className="text-muted">No responses have been submitted yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
