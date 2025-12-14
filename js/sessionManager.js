// Session Manager - Handles saving and loading sessions

class SessionManager {
    constructor() {
        this.storageKey = 'exercise_sessions';
        this.maxSessions = 50; // Keep last 50 sessions
    }

    // Save a session
    saveSession(sessionData) {
        const sessions = this.getAllSessions();
        
        const session = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            groupNumber: sessionData.groupNumber,
            totalQuestions: sessionData.totalQuestions,
            questionIds: sessionData.questionIds,
            userAnswers: sessionData.userAnswers,
            results: sessionData.results,
            completed: sessionData.completed || false
        };

        sessions.unshift(session); // Add to beginning

        // Keep only last N sessions
        if (sessions.length > this.maxSessions) {
            sessions.splice(this.maxSessions);
        }

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(sessions));
            return session.id;
        } catch (error) {
            console.error('Error saving session:', error);
            return null;
        }
    }

    // Get all sessions
    getAllSessions() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading sessions:', error);
            return [];
        }
    }

    // Get a specific session by ID
    getSession(sessionId) {
        const sessions = this.getAllSessions();
        return sessions.find(s => s.id === sessionId);
    }

    // Delete a session
    deleteSession(sessionId) {
        const sessions = this.getAllSessions();
        const filtered = sessions.filter(s => s.id !== sessionId);
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error deleting session:', error);
            return false;
        }
    }

    // Clear all sessions
    clearAllSessions() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing sessions:', error);
            return false;
        }
    }

    // Format session date for display
    formatSessionDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) {
            return 'Just now';
        } else if (diffMins < 60) {
            return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }

    // Get session statistics
    getSessionStats(session) {
        if (!session.results) {
            return null;
        }

        const results = session.results;
        return {
            total: results.total || 0,
            correct: results.correct || 0,
            incorrect: results.incorrect || 0,
            unanswered: results.unanswered || 0,
            percentage: results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SessionManager;
}





