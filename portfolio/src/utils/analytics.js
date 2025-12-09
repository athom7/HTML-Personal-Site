/**
 * Lightweight custom analytics utility
 * Tracks visitor behavior without external dependencies
 */

const STORAGE_KEY = 'portfolio_analytics';
const SESSION_KEY = 'portfolio_session';

// Generate a simple visitor ID (persists across sessions)
const getVisitorId = () => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

// Generate session ID (new for each visit)
const getSessionId = () => {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

// Get or initialize analytics data
const getAnalyticsData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return {
      sessions: [],
      totalVisits: 0,
      lastVisit: null
    };
  }
  return JSON.parse(data);
};

// Save analytics data
const saveAnalyticsData = (data) => {
  // Keep only last 100 sessions to avoid storage bloat
  if (data.sessions.length > 100) {
    data.sessions = data.sessions.slice(-100);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Initialize a new session
export const initSession = (variant = null) => {
  const data = getAnalyticsData();
  const sessionId = getSessionId();
  const visitorId = getVisitorId();

  // Check if session already exists
  const existingSession = data.sessions.find(s => s.sessionId === sessionId);
  if (!existingSession) {
    const session = {
      sessionId,
      visitorId,
      startTime: Date.now(),
      endTime: null,
      pageViews: 1,
      sectionsVisited: [],
      events: [],
      variant,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenResolution: `${window.screen.width}x${window.screen.height}`
    };

    data.sessions.push(session);
    data.totalVisits++;
    data.lastVisit = Date.now();
    saveAnalyticsData(data);
  }

  return sessionId;
};

// Update session end time
export const updateSessionEnd = () => {
  const data = getAnalyticsData();
  const sessionId = getSessionId();
  const session = data.sessions.find(s => s.sessionId === sessionId);

  if (session) {
    session.endTime = Date.now();
    saveAnalyticsData(data);
  }
};

// Track page view
export const trackPageView = () => {
  const data = getAnalyticsData();
  const sessionId = getSessionId();
  const session = data.sessions.find(s => s.sessionId === sessionId);

  if (session) {
    session.pageViews++;
    updateSessionEnd();
    saveAnalyticsData(data);
  }
};

// Track section visit
export const trackSectionVisit = (sectionId) => {
  const data = getAnalyticsData();
  const sessionId = getSessionId();
  const session = data.sessions.find(s => s.sessionId === sessionId);

  if (session && !session.sectionsVisited.includes(sectionId)) {
    session.sectionsVisited.push(sectionId);
    updateSessionEnd();
    saveAnalyticsData(data);
  }
};

// Track custom event
export const trackEvent = (eventName, eventData = {}) => {
  const data = getAnalyticsData();
  const sessionId = getSessionId();
  const session = data.sessions.find(s => s.sessionId === sessionId);

  if (session) {
    session.events.push({
      name: eventName,
      data: eventData,
      timestamp: Date.now()
    });
    updateSessionEnd();
    saveAnalyticsData(data);
  }
};

// Get analytics summary
export const getAnalyticsSummary = () => {
  const data = getAnalyticsData();
  const now = Date.now();
  const last7Days = now - (7 * 24 * 60 * 60 * 1000);
  const last30Days = now - (30 * 24 * 60 * 60 * 1000);

  const recentSessions = data.sessions.filter(s => s.startTime >= last7Days);
  const monthlySessions = data.sessions.filter(s => s.startTime >= last30Days);

  // Calculate average session duration
  const avgDuration = data.sessions
    .filter(s => s.endTime)
    .reduce((acc, s) => {
      const duration = (s.endTime - s.startTime) / 1000; // in seconds
      return acc + duration;
    }, 0) / data.sessions.filter(s => s.endTime).length || 0;

  // Section popularity
  const sectionCounts = {};
  data.sessions.forEach(session => {
    session.sectionsVisited.forEach(section => {
      sectionCounts[section] = (sectionCounts[section] || 0) + 1;
    });
  });

  // A/B test results
  const variantStats = {};
  data.sessions.forEach(session => {
    if (session.variant) {
      if (!variantStats[session.variant]) {
        variantStats[session.variant] = {
          sessions: 0,
          totalDuration: 0,
          totalSections: 0
        };
      }
      variantStats[session.variant].sessions++;
      if (session.endTime) {
        variantStats[session.variant].totalDuration += (session.endTime - session.startTime);
      }
      variantStats[session.variant].totalSections += session.sectionsVisited.length;
    }
  });

  // Calculate averages for each variant
  Object.keys(variantStats).forEach(variant => {
    const stats = variantStats[variant];
    stats.avgDuration = stats.totalDuration / stats.sessions / 1000; // seconds
    stats.avgSections = stats.totalSections / stats.sessions;
  });

  return {
    totalVisits: data.totalVisits,
    totalSessions: data.sessions.length,
    last7DaysSessions: recentSessions.length,
    last30DaysSessions: monthlySessions.length,
    averageSessionDuration: Math.round(avgDuration),
    sectionPopularity: sectionCounts,
    variantStats,
    lastVisit: data.lastVisit
  };
};

// Export all data (for debugging or export feature)
export const exportAnalyticsData = () => {
  return getAnalyticsData();
};

// Clear all analytics data
export const clearAnalyticsData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
