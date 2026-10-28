import React, { useState, useEffect } from 'react';
import TeacherLogin from './pages/TeacherLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherDoubtQueue from './pages/TeacherDoubtQueue';
import TeacherDoubtDetail from './pages/TeacherDoubtDetail';
import TeacherProfile from './pages/TeacherProfile';
import { getTeacherToken, clearTeacherToken, getTeacherUser, setTeacherUser } from './api';

export default function App() {
  const [token, setToken] = useState(getTeacherToken());
  const [user, setUser] = useState(getTeacherUser());
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'queue' | 'detail' | 'profile'
  const [selectedDoubtId, setSelectedDoubtId] = useState(null);

  useEffect(() => {
    setToken(getTeacherToken());
    setUser(getTeacherUser());
  }, []);

  const handleLoginSuccess = (loginData) => {
    setToken(loginData.token);
    setUser(loginData.teacher);
    setTeacherUser(loginData.teacher);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    clearTeacherToken();
    setToken(null);
    setUser(null);
    setActiveView('dashboard');
    setSelectedDoubtId(null);
  };

  const handleSelectDoubt = (doubtId) => {
    setSelectedDoubtId(doubtId);
    setActiveView('detail');
  };

  const handleBackToQueue = () => {
    setSelectedDoubtId(null);
    setActiveView('queue');
  };

  if (!token) {
    return <TeacherLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="teacher-app-container">
      {/* Top Navigation Bar */}
      <header className="teacher-navbar">
        <div className="navbar-brand" onClick={() => { setActiveView('dashboard'); setSelectedDoubtId(null); }} style={{ cursor: 'pointer' }}>
          <div className="brand-logo-circle">IN</div>
          <div className="brand-text">
            <span className="brand-title">Indraprastha NEET Academy</span>
            <span className="brand-subtitle">Teacher Portal • Doubt Resolution</span>
          </div>
        </div>

        <nav className="navbar-links">
          <button
            className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveView('dashboard'); setSelectedDoubtId(null); }}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-link ${activeView === 'queue' || activeView === 'detail' ? 'active' : ''}`}
            onClick={() => { setActiveView('queue'); setSelectedDoubtId(null); }}
          >
            🎯 Doubts Queue
          </button>
          <button
            className={`nav-link ${activeView === 'profile' ? 'active' : ''}`}
            onClick={() => { setActiveView('profile'); setSelectedDoubtId(null); }}
          >
            👤 Profile
          </button>
        </nav>

        <div className="navbar-user-actions">
          <div className="user-badge" onClick={() => setActiveView('profile')} style={{ cursor: 'pointer' }}>
            <span className="user-name">{user?.display_name || 'Faculty Member'}</span>
            <span className="user-role">{user?.teacher_code || 'Teacher'}</span>
          </div>
          <button className="btn btn-sm btn-outline" onClick={handleLogout} title="Log out">
            Log Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="teacher-main-content">
        {activeView === 'dashboard' && (
          <TeacherDashboard
            onNavigateQueue={() => setActiveView('queue')}
            onSelectDoubt={handleSelectDoubt}
          />
        )}
        {activeView === 'queue' && (
          <TeacherDoubtQueue onSelectDoubt={handleSelectDoubt} />
        )}
        {activeView === 'detail' && selectedDoubtId && (
          <TeacherDoubtDetail doubtId={selectedDoubtId} onBack={handleBackToQueue} />
        )}
        {activeView === 'profile' && (
          <TeacherProfile onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}
