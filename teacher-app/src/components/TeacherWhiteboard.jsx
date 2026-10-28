import React, { useRef, useState, useEffect } from 'react';
import { saveSolutionWhiteboardDraft, publishSolutionWhiteboard, uploadMediaFile } from '../api';

export default function TeacherWhiteboard({ doubtId, initialWhiteboard, onPublished }) {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#002350');
  const [lineWidth, setLineWidth] = useState(4);
  const [strokes, setStrokes] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublished, setIsPublished] = useState(initialWhiteboard?.is_published || false);
  const [message, setMessage] = useState('');

  const colors = ['#002350', '#D2AE39', '#2E8B57', '#E53E3E', '#3182CE', '#1A202C'];

  // Load initial elements
  useEffect(() => {
    if (initialWhiteboard?.document_json) {
      try {
        const doc = typeof initialWhiteboard.document_json === 'string'
          ? JSON.parse(initialWhiteboard.document_json)
          : initialWhiteboard.document_json;
        if (doc?.elements) {
          setStrokes(doc.elements);
        }
      } catch (e) {
        console.error('Failed to parse initial whiteboard:', e);
      }
    }
    setIsPublished(Boolean(initialWhiteboard?.is_published));
  }, [initialWhiteboard]);

  // Redraw canvas whenever strokes change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

    allStrokes.forEach((s) => {
      if (!s.points || s.points.length === 0) return;
      ctx.beginPath();
      ctx.strokeStyle = s.type === 'eraser' ? '#FFFFFF' : s.color;
      ctx.lineWidth = s.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(s.points[0][0], s.points[0][1]);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i][0], s.points[i][1]);
      }
      ctx.stroke();
    });
  }, [strokes, currentStroke]);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return [
      (e.clientX - rect.left) * scaleX,
      (e.clientY - rect.top) * scaleY,
    ];
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    setCurrentStroke({
      type: tool,
      color: color,
      strokeWidth: tool === 'eraser' ? lineWidth * 3 : lineWidth,
      points: [coords],
    });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentStroke) return;
    const coords = getCanvasCoords(e);
    setCurrentStroke((prev) => ({
      ...prev,
      points: [...prev.points, coords],
    }));
  };

  const handleMouseUp = () => {
    if (currentStroke) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke(null);
      setRedoStack([]);
    }
    setIsDrawing(false);
  };

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const last = strokes[strokes.length - 1];
    setStrokes((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, last]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const last = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setStrokes((prev) => [...prev, last]);
  };

  const handleClear = () => {
    if (window.confirm('Clear whiteboard canvas?')) {
      setStrokes([]);
      setRedoStack([]);
    }
  };

  const exportCanvasBlob = () => {
    return new Promise((resolve) => {
      canvasRef.current.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      const docJson = { version: 1, elements: strokes };
      await saveSolutionWhiteboardDraft(doubtId, { documentJson: docJson });
      setMessage('Draft saved successfully');
    } catch (e) {
      alert('Failed to save draft: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!window.confirm('Publish solution whiteboard to student? Once published, the student can view it in read-only mode.')) {
      return;
    }
    setIsSaving(true);
    setMessage('');
    try {
      const docJson = { version: 1, elements: strokes };

      // Upload snapshot to Google Drive
      let snapshotDriveLink = '';
      try {
        const blob = await exportCanvasBlob();
        const file = new File([blob], `solution_doubt_${doubtId}.png`, { type: 'image/png' });
        const uploaded = await uploadMediaFile(file, 'TeacherSolutionWhiteboards');
        snapshotDriveLink = uploaded.imageLink || uploaded.viewLink || '';
      } catch (err) {
        console.warn('Snapshot upload warning:', err);
      }

      await publishSolutionWhiteboard(doubtId, {
        documentJson: docJson,
        snapshotDriveLink,
      });

      setIsPublished(true);
      setMessage('Published solution whiteboard to student!');
      if (onPublished) onPublished();
    } catch (e) {
      alert('Failed to publish solution: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="whiteboard-container">
      {/* Header bar */}
      <div style={{ padding: '12px 16px', background: '#002350', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🎨</span>
          <span style={{ fontWeight: 800, fontSize: '14px' }}>Teacher Solution Whiteboard</span>
          {isPublished ? (
            <span style={{ background: '#2E8B57', color: '#FFF', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
              LIVE (PUBLISHED)
            </span>
          ) : (
            <span style={{ background: '#D2AE39', color: '#002350', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
              UNPUBLISHED DRAFT
            </span>
          )}
        </div>
        {message && <span style={{ color: '#86efac', fontSize: '12px', fontWeight: 600 }}>{message}</span>}
      </div>

      {/* Toolbar */}
      <div className="whiteboard-toolbar">
        {/* Tools */}
        <button
          className={`btn ${tool === 'pen' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTool('pen')}
          title="Pen"
        >
          ✏️ Pen
        </button>
        <button
          className={`btn ${tool === 'eraser' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTool('eraser')}
          title="Eraser"
        >
          🧹 Eraser
        </button>

        {/* Color Palette */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', borderLeft: '1px solid #CBD5E1', paddingLeft: '10px' }}>
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => { setColor(c); setTool('pen'); }}
              style={{
                width: color === c && tool !== 'eraser' ? 24 : 18,
                height: color === c && tool !== 'eraser' ? 24 : 18,
                borderRadius: '50%',
                backgroundColor: c,
                cursor: 'pointer',
                border: color === c ? '2px solid #000' : '1px solid #ccc',
              }}
            />
          ))}
        </div>

        {/* Line Width */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: '1px solid #CBD5E1', paddingLeft: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>Size:</span>
          <input
            type="range"
            min="2"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            style={{ width: '80px' }}
          />
        </div>

        {/* Undo / Redo / Clear */}
        <button className="btn btn-outline" onClick={handleUndo} disabled={strokes.length === 0} title="Undo">
          ↩ Undo
        </button>
        <button className="btn btn-outline" onClick={handleRedo} disabled={redoStack.length === 0} title="Redo">
          ↪ Redo
        </button>
        <button className="btn btn-outline" onClick={handleClear} title="Clear Canvas">
          🗑 Clear
        </button>

        {/* Actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline" onClick={handleSaveDraft} disabled={isSaving}>
            💾 Save Draft
          </button>
          <button className="btn btn-gold" onClick={handlePublish} disabled={isSaving}>
            🚀 {isPublished ? 'Update Published Solution' : 'Publish Solution to Student'}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={960}
        height={500}
        className="canvas-element"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
