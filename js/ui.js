// UI Controller - Handles all UI rendering and interactions

class UIController {
    constructor(questionManager, feedbackGenerator, sessionManager) {
        this.questionManager = questionManager;
        this.feedbackGenerator = feedbackGenerator;
        this.sessionManager = sessionManager;
        this.currentScreen = 'setup'; // 'setup', 'question', 'summary', 'sessions', 'flashcards'
        this.availableGroups = [1, 2, 3, 4, 5, 6]; // All groups with study guides
        this.currentGroupNumber = null;
        this.markdownViewer = null; // Markdown viewer for study guides
        this.flashcardManager = null; // Flashcard manager
        this.flashcardParser = null; // Flashcard parser
        this.flashcardFlipped = false; // Track if current card is flipped
    }

    // Set markdown viewer
    setMarkdownViewer(viewer) {
        this.markdownViewer = viewer;
    }

    // Set flashcard components
    setFlashcardComponents(manager, parser) {
        this.flashcardManager = manager;
        this.flashcardParser = parser;
    }

    // Initialize UI
    init() {
        this.renderSetupScreen();
        this.setupEventListeners();
    }

    // Setup event listeners
    setupEventListeners() {
        // Setup screen
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.handleStart());
        }

        // Question screen
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const answerForm = document.getElementById('answer-form');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.handleNext());
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.handlePrevious());
        }
        if (answerForm) {
            answerForm.addEventListener('change', (e) => this.handleAnswerChange(e));
        }

        // Summary screen
        const newSessionBtn = document.getElementById('new-session-btn');
        if (newSessionBtn) {
            newSessionBtn.addEventListener('click', () => this.handleNewSession());
        }

        // Setup screen
        const viewSessionsBtn = document.getElementById('view-sessions-btn');
        if (viewSessionsBtn) {
            viewSessionsBtn.addEventListener('click', () => this.renderSessionsScreen());
        }

        const flashcardsBtn = document.getElementById('flashcards-btn');
        if (flashcardsBtn) {
            flashcardsBtn.addEventListener('click', () => this.renderFlashcardSelectionScreen());
        }

        // Sessions screen
        const backToSetupBtn = document.getElementById('back-to-setup-btn');
        if (backToSetupBtn) {
            backToSetupBtn.addEventListener('click', () => this.renderSetupScreen());
        }

        // Guide link buttons (for opening study guides in webview)
        document.querySelectorAll('.guide-link-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const guidePath = e.target.getAttribute('data-guide-path');
                const anchor = e.target.getAttribute('data-anchor');
                const tag = e.target.getAttribute('data-tag');
                this.openStudyGuide(guidePath, anchor, tag);
            });
        });
    }

    // Render setup screen
    renderSetupScreen() {
        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="screen setup-screen">
                <h1>Learning Helpdesk</h1>
                <div class="main-menu">
                    <div class="menu-section">
                        <h2>Practice Exercises</h2>
                        <div class="setup-form">
                            <div class="form-group">
                                <label for="group-select">Select Study Group:</label>
                                <select id="group-select" class="form-control">
                                    ${this.availableGroups.filter(g => [1, 3].includes(g)).map(g => `<option value="${g}">Group ${g}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="question-count">Number of Questions:</label>
                                <input type="number" id="question-count" class="form-control" min="1" value="10" max="100">
                                <small class="form-text">Select number of questions to practice</small>
                            </div>
                            <button id="start-btn" class="btn btn-primary">Start New Quiz</button>
                            <div id="loading-message" class="loading-message" style="display: none;">
                                Loading questions...
                            </div>
                        </div>
                        <div class="setup-actions">
                            <button id="view-sessions-btn" class="btn btn-secondary">View Past Sessions</button>
                        </div>
                    </div>
                    
                    <div class="menu-section">
                        <h2>Study Guides & Flashcards</h2>
                        <div class="flashcard-menu">
                            <button id="flashcards-btn" class="btn btn-primary btn-large">
                                📚 Study Flashcards
                            </button>
                            <p class="menu-description">Review key concepts with interactive flashcards organized by group, section, and topic.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.currentScreen = 'setup';
        this.setupEventListeners();
    }

    // Handle start button
    async handleStart() {
        const groupSelect = document.getElementById('group-select');
        const questionCountInput = document.getElementById('question-count');
        const loadingMessage = document.getElementById('loading-message');
        const startBtn = document.getElementById('start-btn');
        const questionCountSmall = document.querySelector('#question-count + small');

        if (!groupSelect || !questionCountInput) return;

        const groupNumber = parseInt(groupSelect.value);
        const questionCount = parseInt(questionCountInput.value);

        if (questionCount < 1) {
            alert('Please enter a valid number of questions (at least 1)');
            return;
        }

        // Show loading
        if (loadingMessage) loadingMessage.style.display = 'block';
        if (startBtn) startBtn.disabled = true;
        if (questionCountSmall) questionCountSmall.textContent = 'Loading questions...';

        try {
            // Load group
            const questions = await this.questionManager.loadGroup(groupNumber);
            this.currentGroupNumber = groupNumber;
            
            // Update question count input max
            questionCountInput.max = questions.length;
            if (questionCountSmall) {
                questionCountSmall.textContent = `Available: ${questions.length} questions`;
            }
            
            // Validate question count
            const validCount = Math.min(questionCount, questions.length);
            if (validCount !== questionCount) {
                questionCountInput.value = validCount;
            }
            
            // Start session
            this.questionManager.startSession(validCount);
            
            // Render first question
            this.renderQuestionScreen();
        } catch (error) {
            console.error('Error starting session:', error);
            alert('Error loading questions. Please check that the exercise files are available. You may need to run a local web server.');
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (startBtn) startBtn.disabled = false;
            if (questionCountSmall) questionCountSmall.textContent = 'Error loading questions';
        }
    }

    // Render question screen
    renderQuestionScreen() {
        const question = this.questionManager.getCurrentQuestion();
        if (!question) {
            this.renderSummaryScreen();
            return;
        }

        const currentNum = this.questionManager.getCurrentQuestionNumber();
        const total = this.questionManager.getTotalQuestions();
        const userAnswer = this.questionManager.getAnswer(question.id);
        const isAnswered = this.questionManager.isAnswered(question.id);
        const isCorrect = isAnswered ? this.questionManager.checkAnswer(question.id, userAnswer) : null;

        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="screen question-screen">
                <div class="question-header">
                    <div class="question-counter">Question ${currentNum} of ${total}</div>
                    <div class="question-type-badge">${this.getQuestionTypeLabel(question.type)}</div>
                </div>
                
                <div class="question-content">
                    <div class="question-text">${this.escapeHtml(question.text)}</div>
                    
                    <form id="answer-form" class="answer-form">
                        ${this.renderAnswerInput(question, userAnswer)}
                    </form>

                    ${isAnswered ? this.renderFeedback(question, userAnswer, isCorrect) : ''}
                </div>

                <div class="question-navigation">
                    <button id="prev-btn" class="btn btn-secondary" ${!this.questionManager.canGoPrevious() ? 'disabled' : ''}>
                        Previous
                    </button>
                    <button id="next-btn" class="btn btn-primary" ${!this.questionManager.canGoNext() && !isAnswered ? 'disabled' : ''}>
                        ${this.questionManager.canGoNext() ? 'Next' : 'Finish'}
                    </button>
                </div>
            </div>
        `;

        this.currentScreen = 'question';
        this.setupEventListeners();
    }

    // Render answer input based on question type
    renderAnswerInput(question, userAnswer) {
        if (question.type === 'multiple-choice') {
            return question.options.map(opt => `
                <label class="answer-option">
                    <input type="radio" name="answer" value="${opt.letter}" ${userAnswer === opt.letter ? 'checked' : ''}>
                    <span class="option-letter">${opt.letter})</span>
                    <span class="option-text">${this.escapeHtml(opt.text)}</span>
                </label>
            `).join('');
        } else if (question.type === 'true-false') {
            return `
                <label class="answer-option">
                    <input type="radio" name="answer" value="True" ${userAnswer === 'True' ? 'checked' : ''}>
                    <span class="option-text">True</span>
                </label>
                <label class="answer-option">
                    <input type="radio" name="answer" value="False" ${userAnswer === 'False' ? 'checked' : ''}>
                    <span class="option-text">False</span>
                </label>
            `;
        } else if (question.type === 'short-answer') {
            return `
                <textarea 
                    name="answer" 
                    class="answer-textarea" 
                    placeholder="Enter your answer here..."
                    rows="4"
                >${userAnswer || ''}</textarea>
            `;
        }
        return '';
    }

    // Render feedback
    renderFeedback(question, userAnswer, isCorrect) {
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
        const feedbackIcon = isCorrect ? '✓' : '✗';
        const feedbackText = isCorrect ? 'Correct!' : 'Incorrect';

        // Get match details for short answer questions
        let matchDetails = null;
        let matchFeedback = null;
        if (question.type === 'short-answer' && this.questionManager.answerMatcher) {
            matchDetails = this.questionManager.getMatchDetails(question.id);
            if (matchDetails) {
                matchFeedback = this.questionManager.answerMatcher.getFeedback(
                    userAnswer, 
                    question.correctAnswer, 
                    matchDetails
                );
            }
        }

        let html = `
            <div class="feedback ${feedbackClass}">
                <div class="feedback-header">
                    <span class="feedback-icon">${feedbackIcon}</span>
                    <span class="feedback-text">${feedbackText}</span>
                    ${matchDetails && matchDetails.method !== 'exact' ? `
                        <span class="match-method-badge" title="Matched using ${matchDetails.method} method">
                            ${matchDetails.method} (${Math.round(matchDetails.score * 100)}%)
                        </span>
                    ` : ''}
                </div>
                <div class="feedback-content">
                    <div class="correct-answer">
                        <strong>Correct Answer:</strong> ${this.formatCorrectAnswer(question)}
                    </div>
                    ${matchFeedback && matchFeedback.suggestions && matchFeedback.suggestions.length > 0 ? `
                        <div class="match-suggestions">
                            <strong>Suggestions:</strong>
                            <ul>
                                ${matchFeedback.suggestions.map(s => `<li>${this.escapeHtml(s)}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${question.explanation ? `
                        <div class="explanation">
                            <strong>Explanation:</strong>
                            <div class="explanation-text">${this.formatExplanation(question.explanation)}</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        return html;
    }

    // Format correct answer for display
    formatCorrectAnswer(question) {
        if (question.type === 'multiple-choice') {
            const correctOption = question.options.find(opt => opt.letter === question.correctAnswer);
            return correctOption ? `${question.correctAnswer}) ${correctOption.text}` : question.correctAnswer;
        } else if (question.type === 'true-false') {
            return question.correctAnswer;
        } else {
            return question.correctAnswer || 'See explanation';
        }
    }

    // Format explanation (convert markdown-like formatting)
    formatExplanation(explanation) {
        if (!explanation) return '';
        // Convert markdown bullets to HTML
        return explanation
            .split('\n')
            .map(line => {
                if (line.trim().startsWith('-')) {
                    return `<li>${this.escapeHtml(line.trim().substring(1).trim())}</li>`;
                }
                return `<p>${this.escapeHtml(line)}</p>`;
            })
            .join('')
            .replace(/<li>/g, '<ul><li>')
            .replace(/<\/li>/g, '</li></ul>')
            .replace(/<\/ul>\s*<ul>/g, '');
    }

    // Handle answer change
    handleAnswerChange(event) {
        const form = event.target.closest('form');
        if (!form) return;

        const formData = new FormData(form);
        const answer = formData.get('answer');
        
        if (answer) {
            this.questionManager.submitAnswer(answer);
            // Auto-save session
            this.autoSaveSession();
            // Re-render to show feedback
            this.renderQuestionScreen();
        }
    }

    // Handle next button
    handleNext() {
        // Save current answer if form has a value
        const form = document.getElementById('answer-form');
        if (form) {
            const formData = new FormData(form);
            const answer = formData.get('answer');
            if (answer) {
                const currentQuestion = this.questionManager.getCurrentQuestion();
                if (currentQuestion && !this.questionManager.isAnswered(currentQuestion.id)) {
                    this.questionManager.submitAnswer(answer);
                }
            }
        }

        // Auto-save before moving
        this.autoSaveSession();

        if (this.questionManager.canGoNext()) {
            this.questionManager.next();
            this.renderQuestionScreen();
        } else {
            // Show summary
            this.renderSummaryScreen();
        }
    }

    // Handle previous button
    handlePrevious() {
        if (this.questionManager.canGoPrevious()) {
            this.questionManager.previous();
            this.renderQuestionScreen();
        }
    }

    // Render summary screen
    renderSummaryScreen() {
        const results = this.questionManager.getSessionResults();
        const wrongAnswersByTag = this.questionManager.getWrongAnswersByTag();
        const groupNumber = this.currentGroupNumber || this.questionManager.getCurrentGroupNumber() || 1;
        const summary = this.feedbackGenerator.generateSummary(results, wrongAnswersByTag, groupNumber);

        // Save session
        const sessionData = this.questionManager.exportSessionData(groupNumber);
        sessionData.results = results;
        sessionData.completed = true;
        const sessionId = this.sessionManager.saveSession(sessionData);

        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="screen summary-screen">
                <h1>Session Summary</h1>
                
                <div class="score-card">
                    <div class="score-main">
                        <div class="score-percentage">${summary.score.percentage}%</div>
                        <div class="score-details">
                            <div class="score-item correct">
                                <span class="score-label">Correct:</span>
                                <span class="score-value">${summary.score.correct}</span>
                            </div>
                            <div class="score-item incorrect">
                                <span class="score-label">Incorrect:</span>
                                <span class="score-value">${summary.score.incorrect}</span>
                            </div>
                            <div class="score-item unanswered">
                                <span class="score-label">Unanswered:</span>
                                <span class="score-value">${summary.score.unanswered}</span>
                            </div>
                            <div class="score-item total">
                                <span class="score-label">Total:</span>
                                <span class="score-value">${summary.score.total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="recommendations-section">
                    <h2>Study Guide Recommendations</h2>
                    <p class="recommendations-message">${summary.recommendations.message}</p>
                    ${summary.recommendations.hasRecommendations ? `
                        <div class="recommendations-list">
                            ${summary.recommendations.recommendations.map(rec => 
                                this.feedbackGenerator.formatRecommendationHTML(rec)
                            ).join('')}
                        </div>
                    ` : ''}
                </div>

                <div class="question-details-section">
                    <h2>Question Details</h2>
                    <div class="question-details-list">
                        ${summary.questionDetails.map((item, index) => this.renderQuestionDetail(item, index + 1)).join('')}
                    </div>
                </div>

                <div class="summary-actions">
                    <button id="new-session-btn" class="btn btn-primary">Start New Session</button>
                    <button id="view-sessions-summary-btn" class="btn btn-secondary">View All Sessions</button>
                </div>
            </div>
        `;

        this.currentScreen = 'summary';
        this.setupEventListeners();
        
        // Add event listener for view sessions button
        const viewSessionsSummaryBtn = document.getElementById('view-sessions-summary-btn');
        if (viewSessionsSummaryBtn) {
            viewSessionsSummaryBtn.addEventListener('click', () => this.renderSessionsScreen());
        }

        // Setup guide link buttons after a short delay to ensure DOM is ready
        setTimeout(() => {
            document.querySelectorAll('.guide-link-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const guidePath = e.target.getAttribute('data-guide-path');
                    const anchor = e.target.getAttribute('data-anchor');
                    const tag = e.target.getAttribute('data-tag');
                    this.openStudyGuide(guidePath, anchor, tag);
                });
            });
        }, 100);
    }

    // Render question detail in summary
    renderQuestionDetail(item, number) {
        const statusClass = item.isCorrect ? 'correct' : 'incorrect';
        const statusIcon = item.isCorrect ? '✓' : '✗';
        
        return `
            <div class="question-detail-item ${statusClass}">
                <div class="question-detail-header">
                    <span class="question-detail-number">Q${number}</span>
                    <span class="question-detail-status">${statusIcon} ${item.isCorrect ? 'Correct' : 'Incorrect'}</span>
                </div>
                <div class="question-detail-text">${this.escapeHtml(item.text)}</div>
                <div class="question-detail-answers">
                    <div class="answer-item">
                        <strong>Your Answer:</strong> ${item.userAnswer || 'Not answered'}
                    </div>
                    <div class="answer-item">
                        <strong>Correct Answer:</strong> ${this.formatCorrectAnswerForDetail(item)}
                    </div>
                </div>
                ${item.explanation ? `
                    <div class="question-detail-explanation">
                        <strong>Explanation:</strong>
                        <div>${this.formatExplanation(item.explanation)}</div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Format correct answer for detail view
    formatCorrectAnswerForDetail(item) {
        if (item.type === 'multiple-choice') {
            return item.correctAnswer;
        }
        return item.correctAnswer || 'See explanation';
    }

    // Handle new session
    handleNewSession() {
        // Save current session before resetting
        if (this.questionManager.sessionQuestions.length > 0) {
            const groupNumber = this.currentGroupNumber || this.questionManager.getCurrentGroupNumber();
            if (groupNumber) {
                const sessionData = this.questionManager.exportSessionData(groupNumber);
                this.sessionManager.saveSession(sessionData);
            }
        }
        
        this.questionManager.reset();
        this.currentGroupNumber = null;
        this.renderSetupScreen();
    }

    // Render sessions screen
    renderSessionsScreen() {
        const sessions = this.sessionManager.getAllSessions();
        
        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="screen sessions-screen">
                <div class="sessions-header">
                    <h1>Past Sessions</h1>
                    <button id="back-to-setup-btn" class="btn btn-secondary">Back to Setup</button>
                </div>
                
                ${sessions.length === 0 ? `
                    <div class="no-sessions">
                        <p>No past sessions found. Start a quiz to create your first session!</p>
                    </div>
                ` : `
                    <div class="sessions-list">
                        ${sessions.map(session => {
                            const stats = this.sessionManager.getSessionStats(session);
                            const dateStr = this.sessionManager.formatSessionDate(session.timestamp);
                            return `
                                <div class="session-item ${session.completed ? 'completed' : 'in-progress'}">
                                    <div class="session-header">
                                        <div class="session-info">
                                            <h3>Group ${session.groupNumber} - ${dateStr}</h3>
                                            <div class="session-meta">
                                                <span class="session-status">${session.completed ? '✓ Completed' : '⏸ In Progress'}</span>
                                                ${stats ? `
                                                    <span class="session-score">Score: ${stats.percentage}% (${stats.correct}/${stats.total})</span>
                                                ` : ''}
                                            </div>
                                        </div>
                                        <div class="session-actions">
                                            ${!session.completed ? `
                                                <button class="btn btn-small btn-primary" data-action="resume" data-session-id="${session.id}">
                                                    Resume
                                                </button>
                                            ` : `
                                                <button class="btn btn-small btn-secondary" data-action="view" data-session-id="${session.id}">
                                                    View Details
                                                </button>
                                            `}
                                            <button class="btn btn-small btn-danger" data-action="delete" data-session-id="${session.id}">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div class="sessions-actions">
                        <button id="clear-all-sessions-btn" class="btn btn-danger">Clear All Sessions</button>
                    </div>
                `}
            </div>
        `;

        this.currentScreen = 'sessions';
        this.setupEventListeners();
        
        // Add event listeners for session actions
        container.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                const sessionId = e.target.getAttribute('data-session-id');
                
                if (action === 'resume') {
                    this.handleResumeSession(sessionId);
                } else if (action === 'view') {
                    this.handleViewSession(sessionId);
                } else if (action === 'delete') {
                    if (confirm('Are you sure you want to delete this session?')) {
                        this.sessionManager.deleteSession(sessionId);
                        this.renderSessionsScreen();
                    }
                }
            });
        });

        const clearAllBtn = document.getElementById('clear-all-sessions-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete all sessions? This cannot be undone.')) {
                    this.sessionManager.clearAllSessions();
                    this.renderSessionsScreen();
                }
            });
        }
    }

    // Handle resume session
    async handleResumeSession(sessionId) {
        const session = this.sessionManager.getSession(sessionId);
        if (!session) {
            alert('Session not found');
            return;
        }

        try {
            // Load the group
            await this.questionManager.loadGroup(session.groupNumber);
            this.currentGroupNumber = session.groupNumber;
            
            // Load session data
            this.questionManager.loadSessionData(session, this.questionManager.allQuestions);
            
            // Render question screen
            this.renderQuestionScreen();
        } catch (error) {
            console.error('Error resuming session:', error);
            alert('Error resuming session. Please try again.');
        }
    }

    // Handle view session details
    handleViewSession(sessionId) {
        const session = this.sessionManager.getSession(sessionId);
        if (!session) {
            alert('Session not found');
            return;
        }

        // Reconstruct results for display
        const results = session.results || {
            total: session.totalQuestions,
            correct: 0,
            incorrect: 0,
            unanswered: 0,
            questions: []
        };

        const wrongAnswersByTag = {};
        if (results.questions) {
            results.questions.forEach(item => {
                if (!item.isCorrect && item.userAnswer !== null) {
                    const tag = item.tag;
                    if (!wrongAnswersByTag[tag]) {
                        wrongAnswersByTag[tag] = {
                            tag: tag,
                            count: 0,
                            questions: []
                        };
                    }
                    wrongAnswersByTag[tag].count++;
                    wrongAnswersByTag[tag].questions.push(item);
                }
            });
        }

        const wrongAnswersByTagArray = Object.values(wrongAnswersByTag).sort((a, b) => b.count - a.count);
        const summary = this.feedbackGenerator.generateSummary(results, wrongAnswersByTagArray, session.groupNumber);

        // Render summary screen with session data
        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="screen summary-screen">
                <div class="session-header-info">
                    <h2>Session from ${this.sessionManager.formatSessionDate(session.timestamp)}</h2>
                    <button id="back-to-sessions-btn" class="btn btn-secondary">Back to Sessions</button>
                </div>
                
                <h1>Session Summary</h1>
                
                <div class="score-card">
                    <div class="score-main">
                        <div class="score-percentage">${summary.score.percentage}%</div>
                        <div class="score-details">
                            <div class="score-item correct">
                                <span class="score-label">Correct:</span>
                                <span class="score-value">${summary.score.correct}</span>
                            </div>
                            <div class="score-item incorrect">
                                <span class="score-label">Incorrect:</span>
                                <span class="score-value">${summary.score.incorrect}</span>
                            </div>
                            <div class="score-item unanswered">
                                <span class="score-label">Unanswered:</span>
                                <span class="score-value">${summary.score.unanswered}</span>
                            </div>
                            <div class="score-item total">
                                <span class="score-label">Total:</span>
                                <span class="score-value">${summary.score.total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="recommendations-section">
                    <h2>Study Guide Recommendations</h2>
                    <p class="recommendations-message">${summary.recommendations.message}</p>
                    ${summary.recommendations.hasRecommendations ? `
                        <div class="recommendations-list">
                            ${summary.recommendations.recommendations.map(rec => 
                                this.feedbackGenerator.formatRecommendationHTML(rec)
                            ).join('')}
                        </div>
                    ` : ''}
                </div>

                <div class="question-details-section">
                    <h2>Question Details</h2>
                    <div class="question-details-list">
                        ${summary.questionDetails.map((item, index) => this.renderQuestionDetail(item, index + 1)).join('')}
                    </div>
                </div>

                <div class="summary-actions">
                    <button id="back-to-sessions-btn2" class="btn btn-primary">Back to Sessions</button>
                </div>
            </div>
        `;

        // Add event listeners
        const backBtn1 = document.getElementById('back-to-sessions-btn');
        const backBtn2 = document.getElementById('back-to-sessions-btn2');
        if (backBtn1) backBtn1.addEventListener('click', () => this.renderSessionsScreen());
        if (backBtn2) backBtn2.addEventListener('click', () => this.renderSessionsScreen());

        // Setup guide link buttons
        setTimeout(() => {
            document.querySelectorAll('.guide-link-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const guidePath = e.target.getAttribute('data-guide-path');
                    const anchor = e.target.getAttribute('data-anchor');
                    const tag = e.target.getAttribute('data-tag');
                    this.openStudyGuide(guidePath, anchor, tag);
                });
            });
        }, 100);
    }

    // Auto-save session periodically
    autoSaveSession() {
        if (this.questionManager.sessionQuestions.length > 0) {
            const groupNumber = this.currentGroupNumber || this.questionManager.getCurrentGroupNumber();
            if (groupNumber) {
                const sessionData = this.questionManager.exportSessionData(groupNumber);
                this.sessionManager.saveSession(sessionData);
            }
        }
    }

    // Open study guide in webview modal
    async openStudyGuide(guidePath, anchor, tag) {
        if (!this.markdownViewer) {
            alert('Markdown viewer not available');
            return;
        }

        // Show loading modal
        this.showStudyGuideModal('Loading...', true);

        try {
            // Load and parse markdown
            const html = await this.markdownViewer.loadAndDisplay(guidePath, anchor);
            
            // Display in modal
            this.showStudyGuideModal(html, false, tag);
        } catch (error) {
            console.error('Error opening study guide:', error);
            this.showStudyGuideModal(`<p class="error">Error loading study guide: ${error.message}</p>`, false, tag);
        }
    }

    // Show study guide modal
    showStudyGuideModal(content, isLoading, title = 'Study Guide') {
        // Create or update modal
        let modal = document.getElementById('study-guide-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'study-guide-modal';
            modal.className = 'study-guide-modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="study-guide-modal-overlay"></div>
            <div class="study-guide-modal-content">
                <div class="study-guide-modal-header">
                    <h2>${title}</h2>
                    <button class="study-guide-close-btn" id="close-study-guide-btn">&times;</button>
                </div>
                <div class="study-guide-modal-body">
                    ${isLoading ? '<div class="loading-spinner">Loading study guide...</div>' : content}
                </div>
            </div>
        `;

        // Show modal
        modal.style.display = 'flex';

        // Close button handler
        const closeBtn = document.getElementById('close-study-guide-btn');
        const overlay = modal.querySelector('.study-guide-modal-overlay');
        
        const closeModal = () => {
            modal.style.display = 'none';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    // Get question type label
    getQuestionTypeLabel(type) {
        const labels = {
            'multiple-choice': 'Multiple Choice',
            'true-false': 'True/False',
            'short-answer': 'Short Answer'
        };
        return labels[type] || type;
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Render flashcard selection screen
    renderFlashcardSelectionScreen() {
        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="screen flashcard-selection-screen">
                <div class="screen-header">
                    <h1>Study Flashcards</h1>
                    <button id="back-to-main-btn" class="btn btn-secondary">Back to Main Menu</button>
                </div>
                
                <div class="flashcard-selection-content">
                    <div class="form-group">
                        <label for="flashcard-group-select">Select Study Group:</label>
                        <select id="flashcard-group-select" class="form-control">
                            ${this.availableGroups.map(g => `<option value="${g}">Group ${g}</option>`).join('')}
                        </select>
                    </div>
                    
                    <button id="load-flashcards-btn" class="btn btn-primary">Load Flashcards</button>
                    
                    <div id="flashcard-loading" class="loading-message" style="display: none;">
                        Loading flashcards...
                    </div>
                </div>
            </div>
        `;

        this.currentScreen = 'flashcard-selection';
        this.setupEventListeners();

        const backBtn = document.getElementById('back-to-main-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.renderSetupScreen());
        }

        const loadBtn = document.getElementById('load-flashcards-btn');
        if (loadBtn) {
            loadBtn.addEventListener('click', () => this.handleLoadFlashcards());
        }
    }

    // Handle loading flashcards
    async handleLoadFlashcards() {
        const groupSelect = document.getElementById('flashcard-group-select');
        const loadingMsg = document.getElementById('flashcard-loading');
        const loadBtn = document.getElementById('load-flashcards-btn');

        if (!groupSelect || !this.flashcardManager || !this.flashcardParser) {
            alert('Flashcard system not initialized');
            return;
        }

        const groupNumber = parseInt(groupSelect.value);

        if (loadingMsg) loadingMsg.style.display = 'block';
        if (loadBtn) loadBtn.disabled = true;

        try {
            await this.flashcardManager.loadGroup(groupNumber, this.flashcardParser);
            this.renderFlashcardNavigationScreen();
        } catch (error) {
            console.error('Error loading flashcards:', error);
            alert('Error loading flashcards. Please check that the study guide files are available.');
            if (loadingMsg) loadingMsg.style.display = 'none';
            if (loadBtn) loadBtn.disabled = false;
        }
    }

    // Render flashcard navigation screen (group → section → subsection)
    async renderFlashcardNavigationScreen() {
        const sections = await this.flashcardManager.getGroupedStructure(this.flashcardManager.currentGroup);

        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="screen flashcard-navigation-screen">
                <div class="screen-header">
                    <h1>Group ${this.flashcardManager.currentGroup} Flashcards</h1>
                    <button id="back-to-flashcard-selection-btn" class="btn btn-secondary">Back</button>
                </div>
                
                <div class="flashcard-stats">
                    <div class="stat-item">
                        <span class="stat-label">Total Cards:</span>
                        <span class="stat-value">${this.flashcardManager.allFlashcards.length}</span>
                    </div>
                </div>

                <div class="flashcard-sections">
                    <h2>Select Section</h2>
                    <div class="sections-list">
                        ${sections.map(sectionData => {
                            const totalCards = sectionData.subsections
                                .reduce((sum, sub) => sum + sub.cardCount, 0);
                            
                            return `
                                <div class="section-item" data-section="${this.escapeHtml(sectionData.section)}">
                                    <div class="section-header">
                                        <h3>${this.escapeHtml(sectionData.section)}</h3>
                                        <span class="card-count">${totalCards} cards</span>
                                    </div>
                                    <div class="subsections-list">
                                        ${sectionData.subsections.map(subData => {
                                            return `
                                                <div class="subsection-item" 
                                                     data-section="${this.escapeHtml(sectionData.section)}" 
                                                     data-subsection="${this.escapeHtml(subData.subsection)}">
                                                    <span class="subsection-name">${this.escapeHtml(subData.subsection)}</span>
                                                    <span class="subsection-count">${subData.cardCount} cards</span>
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div class="flashcard-actions">
                        <button id="study-all-cards-btn" class="btn btn-primary">Study All Cards</button>
                        <button id="shuffle-cards-btn" class="btn btn-secondary">Shuffle All</button>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();

        // Section/subsection click handlers
        document.querySelectorAll('.subsection-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                const subsection = item.getAttribute('data-subsection');
                this.flashcardManager.filterCards(section, subsection);
                this.flashcardFlipped = false;
                this.renderFlashcardView();
            });
        });

        document.querySelectorAll('.section-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.subsection-item')) return;
                const section = item.getAttribute('data-section');
                this.flashcardManager.filterCards(section, null);
                this.flashcardFlipped = false;
                this.renderFlashcardView();
            });
        });

        const studyAllBtn = document.getElementById('study-all-cards-btn');
        if (studyAllBtn) {
            studyAllBtn.addEventListener('click', () => {
                this.flashcardManager.resetFilter();
                this.flashcardFlipped = false;
                this.renderFlashcardView();
            });
        }

        const shuffleBtn = document.getElementById('shuffle-cards-btn');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                this.flashcardManager.shuffle();
                this.flashcardFlipped = false;
                this.renderFlashcardView();
            });
        }

        const backBtn = document.getElementById('back-to-flashcard-selection-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.renderFlashcardSelectionScreen());
        }
    }

    // Render flashcard view (the actual card display)
    renderFlashcardView() {
        const card = this.flashcardManager.getCurrentCard();
        if (!card) {
            alert('No cards available');
            this.renderFlashcardNavigationScreen();
            return;
        }

        const stats = this.flashcardManager.getStatistics();
        const currentNum = this.flashcardManager.getCurrentCardNumber();
        const total = this.flashcardManager.getTotalCards();
        const isFlipped = this.flashcardFlipped;
        const cardState = this.flashcardManager.getCardState(card.title);

        const container = document.getElementById('app-container');
        container.innerHTML = `
            <div class="screen flashcard-view-screen">
                <div class="flashcard-header">
                    <div class="flashcard-progress">
                        Card ${currentNum} of ${total}
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(currentNum / total) * 100}%"></div>
                        </div>
                    </div>
                    <button id="back-to-navigation-btn" class="btn btn-secondary btn-small">Back to Sections</button>
                </div>

                <div class="flashcard-stats-bar">
                    <div class="stat-badge known">Known: ${stats.known}</div>
                    <div class="stat-badge unknown">Unknown: ${stats.unknown}</div>
                    <div class="stat-badge unmarked">Unmarked: ${stats.unmarked}</div>
                    <div class="stat-badge progress">Progress: ${stats.progress}%</div>
                </div>

                <div class="flashcard-container">
                    <div class="flashcard ${isFlipped ? 'flipped' : ''}" id="flashcard">
                        <div class="flashcard-front">
                            <div class="flashcard-section-info">
                                <span class="section-badge">${card.section}</span>
                                ${card.subsection ? `<span class="subsection-badge">${card.subsection}</span>` : ''}
                            </div>
                            <div class="flashcard-content">
                                <h2 class="flashcard-title">${this.escapeHtml(card.front)}</h2>
                                ${card.type === 'definition' ? '<p class="flashcard-hint">Click to reveal definition</p>' : ''}
                            </div>
                        </div>
                        <div class="flashcard-back">
                            <div class="flashcard-section-info">
                                <span class="section-badge">${card.section}</span>
                                ${card.subsection ? `<span class="subsection-badge">${card.subsection}</span>` : ''}
                            </div>
                            <div class="flashcard-content">
                                ${card.type === 'list' ? 
                                    `<ul class="flashcard-list">${card.points.map(p => `<li>${this.escapeHtml(p)}</li>`).join('')}</ul>` :
                                    `<div class="flashcard-answer">${this.formatFlashcardBack(card.back)}</div>`
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flashcard-actions">
                    <button id="prev-card-btn" class="btn btn-secondary" ${!this.flashcardManager.canGoPrevious() ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button id="flip-card-btn" class="btn btn-primary">${isFlipped ? 'Show Question' : 'Show Answer'}</button>
                    <button id="next-card-btn" class="btn btn-secondary" ${!this.flashcardManager.canGoNext() ? 'disabled' : ''}>
                        Next →
                    </button>
                </div>

                <div class="flashcard-knowledge-actions">
                    <button id="mark-known-btn" class="btn btn-success ${cardState === true ? 'active' : ''}" 
                            data-card-id="${card.title}">
                        ✓ I Know This
                    </button>
                    <button id="mark-unknown-btn" class="btn btn-danger ${cardState === false ? 'active' : ''}"
                            data-card-id="${card.title}">
                        ✗ Need to Review
                    </button>
                </div>
            </div>
        `;

        this.setupEventListeners();

        // Flashcard-specific event listeners
        const flipBtn = document.getElementById('flip-card-btn');
        const flashcard = document.getElementById('flashcard');
        
        if (flipBtn) {
            flipBtn.addEventListener('click', () => this.flipCard());
        }
        if (flashcard) {
            flashcard.addEventListener('click', () => this.flipCard());
        }

        const prevBtn = document.getElementById('prev-card-btn');
        const nextBtn = document.getElementById('next-card-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.flashcardFlipped = false;
                this.flashcardManager.previous();
                this.renderFlashcardView();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.flashcardFlipped = false;
                this.flashcardManager.next();
                this.renderFlashcardView();
            });
        }

        const markKnownBtn = document.getElementById('mark-known-btn');
        const markUnknownBtn = document.getElementById('mark-unknown-btn');
        if (markKnownBtn) {
            markKnownBtn.addEventListener('click', () => {
                this.flashcardManager.markCard(card.title, true);
                this.renderFlashcardView();
            });
        }
        if (markUnknownBtn) {
            markUnknownBtn.addEventListener('click', () => {
                this.flashcardManager.markCard(card.title, false);
                this.renderFlashcardView();
            });
        }

        const backBtn = document.getElementById('back-to-navigation-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.renderFlashcardNavigationScreen());
        }

        // Keyboard navigation
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft' && this.flashcardManager.canGoPrevious()) {
                this.flashcardFlipped = false;
                this.flashcardManager.previous();
                this.renderFlashcardView();
            } else if (e.key === 'ArrowRight' && this.flashcardManager.canGoNext()) {
                this.flashcardFlipped = false;
                this.flashcardManager.next();
                this.renderFlashcardView();
            } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.flipCard();
            }
        };
        document.addEventListener('keydown', handleKeyPress);
    }

    // Flip flashcard
    flipCard() {
        this.flashcardFlipped = !this.flashcardFlipped;
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.toggle('flipped', this.flashcardFlipped);
        }
        const flipBtn = document.getElementById('flip-card-btn');
        if (flipBtn) {
            flipBtn.textContent = this.flashcardFlipped ? 'Show Question' : 'Show Answer';
        }
    }

    // Format flashcard back content
    formatFlashcardBack(content) {
        if (!content) return '';
        // Simple formatting - convert markdown-like formatting
        return this.escapeHtml(content)
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIController;
}

