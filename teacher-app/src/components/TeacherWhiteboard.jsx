import React, { useRef, useState, useEffect, useCallback } from 'react';
import { saveSolutionWhiteboardDraft, publishSolutionWhiteboard, uploadMediaFile } from '../api';

export default function TeacherWhiteboard({ doubtId, initialWhiteboard, onPublished }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [tool, setTool] = useState('pen'); // 'pen', 'eraser', 'move'
  const [color, setColor] = useState('#002350');
  const [lineWidth, setLineWidth] = useState(4);
  const [strokes, setStrokes] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [currentStroke, setCurrentStroke] = useState(null);

  // Zoom and Pan states
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const pinchStartDistRef = useRef(0);
  const pinchStartZoomRef = useRef(1.0);

  const [isSaving, setIsSaving] = useState(false);
  const [isPublished, setIsPublished] = useState(initialWhiteboard?.is_published || false);
  const [message, setMessage] = useState('');

  const colors = ['#002350', '#D2AE39', '#2E8B57', '#E53E3E', '#3182CE', '#1A202C'];

  // Helper to extract [x, y] from any point format
  const getPt = (p) => {
    if (!p) return [0, 0];
    if (Array.isArray(p)) return [Number(p[0]) || 0, Number(p[1]) || 0];
    if (typeof p === 'object') {
      return [Number(p.x ?? p.dx ?? 0), Number(p.y ?? p.dy ?? 0)];
    }
    return [0, 0];
  };

  // Helper to format color
  const formatColor = (c) => {
    if (!c) return '#002350';
    if (typeof c === 'number') {
      const hex = (c >>> 0).toString(16).padStart(8, '0');
      return '#' + hex.substring(2);
    }
    if (typeof c === 'string') {
      if (c.startsWith('#')) return c;
      return '#' + c;
    }
    return '#002350';
  };

  // Load initial strokes/elements
  useEffect(() => {
    if (initialWhiteboard?.document_json) {
      try {
        const doc = typeof initialWhiteboard.document_json === 'string'
          ? JSON.parse(initialWhiteboard.document_json)
          : initialWhiteboard.document_json;
        const list = doc?.elements || doc?.strokes;
        if (Array.isArray(list)) {
          setStrokes(list);
        }
      } catch (e) {
        console.error('Failed to parse initial whiteboard:', e);
      }
    }
    setIsPublished(Boolean(initialWhiteboard?.is_published));
  }, [initialWhiteboard]);

  // Redraw canvas whenever strokes, currentStroke, zoom, or pan change
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.save();
    // Fill background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply Pan and Zoom transforms
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

    allStrokes.forEach((s) => {
      if (!s.points || s.points.length === 0) return;
      ctx.beginPath();
      const isEraser = s.type === 'eraser' || s.isEraser;
      ctx.strokeStyle = isEraser ? '#FFFFFF' : formatColor(s.color);
      ctx.lineWidth = Number(s.strokeWidth || s.stroke_width || 4);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const first = getPt(s.points[0]);
      ctx.moveTo(first[0], first[1]);
      for (let i = 1; i < s.points.length; i++) {
        const pt = getPt(s.points[i]);
        ctx.lineTo(pt[0], pt[1]);
      }
      ctx.stroke();
    });

    ctx.restore();
  }, [strokes, currentStroke, zoom, pan]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  // Convert client viewport coordinates to Canvas Virtual Coordinates taking Pan & Zoom into account
  const getCanvasCoords = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const screenX = (clientX - rect.left) * scaleX;
    const screenY = (clientY - rect.top) * scaleY;
    return [
      (screenX - pan.x) / zoom,
      (screenY - pan.y) / zoom,
    ];
  };

  // Zoom actions
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.25, 4.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.25, 0.4));
  };

  const handleResetView = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  // Pointer & Touch Handlers
  const handlePointerDown = (e) => {
    e.preventDefault();
    if (tool === 'move' || e.button === 1 || e.buttons === 4) {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      return;
    }

    setIsDrawing(true);
    const coords = getCanvasCoords(e.clientX, e.clientY);
    setCurrentStroke({
      type: tool,
      isEraser: tool === 'eraser',
      color: color,
      strokeWidth: tool === 'eraser' ? lineWidth * 3 : lineWidth,
      points: [coords],
    });
  };

  const handlePointerMove = (e) => {
    e.preventDefault();
    if (isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
      return;
    }

    if (!isDrawing || !currentStroke) return;
    const coords = getCanvasCoords(e.clientX, e.clientY);
    setCurrentStroke((prev) => ({
      ...prev,
      points: [...prev.points, coords],
    }));
  };

  const handlePointerUp = (e) => {
    if (isPanning) {
      setIsPanning(false);
    }
    if (currentStroke) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke(null);
      setRedoStack([]);
    }
    setIsDrawing(false);
  };

  // Touch handlers for mobile/pinch gestures
  const handleTouchStart = (e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      // Pinch to zoom start
      setIsDrawing(false);
      setCurrentStroke(null);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchStartDistRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      pinchStartZoomRef.current = zoom;
      return;
    }

    if (e.touches.length === 1) {
      const t = e.touches[0];
      if (tool === 'move') {
        setIsPanning(true);
        panStartRef.current = { x: t.clientX - pan.x, y: t.clientY - pan.y };
      } else {
        setIsDrawing(true);
        const coords = getCanvasCoords(t.clientX, t.clientY);
        setCurrentStroke({
          type: tool,
          isEraser: tool === 'eraser',
          color: color,
          strokeWidth: tool === 'eraser' ? lineWidth * 3 : lineWidth,
          points: [coords],
        });
      }
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (pinchStartDistRef.current > 10) {
        const factor = dist / pinchStartDistRef.current;
        const newZoom = Math.min(Math.max(pinchStartZoomRef.current * factor, 0.4), 4.0);
        setZoom(newZoom);
      }
      return;
    }

    if (e.touches.length === 1) {
      const t = e.touches[0];
      if (isPanning) {
        setPan({
          x: t.clientX - panStartRef.current.x,
          y: t.clientY - panStartRef.current.y,
        });
      } else if (isDrawing && currentStroke) {
        const coords = getCanvasCoords(t.clientX, t.clientY);
        setCurrentStroke((prev) => ({
          ...prev,
          points: [...prev.points, coords],
        }));
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (isPanning) {
      setIsPanning(false);
    }
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
      // Export full clean canvas at zoom 1.0
      const offscreen = document.createElement('canvas');
      offscreen.width = 960;
      offscreen.height = 540;
      const ctx = offscreen.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, offscreen.width, offscreen.height);

      strokes.forEach((s) => {
        if (!s.points || s.points.length === 0) return;
        ctx.beginPath();
        const isEraser = s.type === 'eraser' || s.isEraser;
        ctx.strokeStyle = isEraser ? '#FFFFFF' : formatColor(s.color);
        ctx.lineWidth = Number(s.strokeWidth || s.stroke_width || 4);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const first = getPt(s.points[0]);
        ctx.moveTo(first[0], first[1]);
        for (let i = 1; i < s.points.length; i++) {
          const pt = getPt(s.points[i]);
          ctx.lineTo(pt[0], pt[1]);
        }
        ctx.stroke();
      });

      offscreen.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      const docJson = {
        version: 1,
        elements: strokes,
        strokes: strokes,
      };
      await saveSolutionWhiteboardDraft(doubtId, { documentJson: docJson });
      setMessage('✓ Draft saved successfully');
    } catch (e) {
      alert('Failed to save draft: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!window.confirm('Publish solution whiteboard to student? Once published, the student can view it live.')) {
      return;
    }
    setIsSaving(true);
    setMessage('');
    try {
      const docJson = {
        version: 1,
        elements: strokes,
        strokes: strokes,
      };

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
      setMessage('✓ Solution published live to student!');
      if (onPublished) onPublished();
    } catch (e) {
      alert('Failed to publish solution: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="whiteboard-container" ref={containerRef} style={{ touchAction: 'none', userSelect: 'none' }}>
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
      <div className="whiteboard-toolbar" style={{ flexWrap: 'wrap', gap: '8px' }}>
        {/* Draw Tools */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            className={`btn ${tool === 'pen' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTool('pen')}
            title="Pen"
          >
            ✏️ Pen
          </button>
          <button
            type="button"
            className={`btn ${tool === 'eraser' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTool('eraser')}
            title="Eraser"
          >
            🧹 Eraser
          </button>
          <button
            type="button"
            className={`btn ${tool === 'move' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTool('move')}
            title="Move / Pan Canvas with Hand"
          >
            ✋ Move
          </button>
        </div>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', borderLeft: '1px solid #CBD5E1', paddingLeft: '8px' }}>
          <button type="button" className="btn btn-outline" onClick={handleZoomOut} title="Zoom Out">
            🔍-
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleResetView}
            title="Reset Zoom & Pan to 100%"
            style={{ fontWeight: 700, fontSize: '11px', minWidth: '55px' }}
          >
            {Math.round(zoom * 100)}%
          </button>
          <button type="button" className="btn btn-outline" onClick={handleZoomIn} title="Zoom In">
            🔍+
          </button>
        </div>

        {/* Color Palette */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', borderLeft: '1px solid #CBD5E1', paddingLeft: '8px' }}>
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => { setColor(c); if (tool === 'eraser' || tool === 'move') setTool('pen'); }}
              style={{
                width: color === c && tool === 'pen' ? 24 : 18,
                height: color === c && tool === 'pen' ? 24 : 18,
                borderRadius: '50%',
                backgroundColor: c,
                cursor: 'pointer',
                border: color === c && tool === 'pen' ? '2px solid #000' : '1px solid #ccc',
              }}
            />
          ))}
        </div>

        {/* Line Width */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: '1px solid #CBD5E1', paddingLeft: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>Size:</span>
          <input
            type="range"
            min="2"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            style={{ width: '70px' }}
          />
        </div>

        {/* Undo / Redo / Clear */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button type="button" className="btn btn-outline" onClick={handleUndo} disabled={strokes.length === 0} title="Undo">
            ↩ Undo
          </button>
          <button type="button" className="btn btn-outline" onClick={handleRedo} disabled={redoStack.length === 0} title="Redo">
            ↪ Redo
          </button>
          <button type="button" className="btn btn-outline" onClick={handleClear} title="Clear Canvas">
            🗑 Clear
          </button>
        </div>

        {/* Actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button type="button" className="btn btn-outline" onClick={handleSaveDraft} disabled={isSaving}>
            💾 Save Draft
          </button>
          <button type="button" className="btn btn-gold" onClick={handlePublish} disabled={isSaving}>
            🚀 {isPublished ? 'Update Published Live' : 'Publish to Student'}
          </button>
        </div>
      </div>

      {/* Canvas Element with touchAction none */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#e2e8f0' }}>
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="canvas-element"
          style={{
            touchAction: 'none',
            cursor: tool === 'move' ? (isPanning ? 'grabbing' : 'grab') : (tool === 'eraser' ? 'crosshair' : 'crosshair'),
            display: 'block',
            width: '100%',
            height: 'auto',
            background: '#FFFFFF',
          }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        />
        {(zoom !== 1.0 || pan.x !== 0 || pan.y !== 0) && (
          <button
            type="button"
            onClick={handleResetView}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 35, 80, 0.85)',
              color: '#FFF',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            🎯 Recenter ({Math.round(zoom * 100)}%)
          </button>
        )}
      </div>
    </div>
  );
}
