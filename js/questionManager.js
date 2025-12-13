// Question Manager - Handles question selection, state, and answer tracking

class QuestionManager {
    constructor() {
        this.allQuestions = [];
        this.sessionQuestions = [];
        this.userAnswers = {};
        this.currentIndex = 0;
        this.parser = null;
        this.answerMatcher = null; // For advanced short answer matching
    }

    // Initialize with parser
    setParser(parser) {
        this.parser = parser;
    }

    // Set answer matcher for advanced short answer checking
    setAnswerMatcher(matcher) {
        this.answerMatcher = matcher;
    }

    // Load questions for a group
    async loadGroup(groupNumber) {
        if (!this.parser) {
            throw new Error('Parser not set');
        }

        this.allQuestions = await this.parser.loadGroup(groupNumber);
        return this.allQuestions;
    }

    // Start a new session with N random questions
    startSession(numQuestions) {
        if (numQuestions > this.allQuestions.length) {
            numQuestions = this.allQuestions.length;
        }

        // Shuffle and select questions
        const shuffled = [...this.allQuestions].sort(() => Math.random() - 0.5);
        this.sessionQuestions = shuffled.slice(0, numQuestions);
        this.userAnswers = {};
        this.currentIndex = 0;

        return {
            total: this.sessionQuestions.length,
            current: 1
        };
    }

    // Get current question
    getCurrentQuestion() {
        if (this.sessionQuestions.length === 0) {
            return null;
        }
        return this.sessionQuestions[this.currentIndex];
    }

    // Get question by index
    getQuestion(index) {
        if (index < 0 || index >= this.sessionQuestions.length) {
            return null;
        }
        return this.sessionQuestions[index];
    }

    // Submit answer for current question
    submitAnswer(answer) {
        const question = this.getCurrentQuestion();
        if (!question) {
            return false;
        }

        this.userAnswers[question.id] = {
            answer: answer,
            question: question,
            timestamp: Date.now()
        };

        return true;
    }

    // Get answer for a question
    getAnswer(questionId) {
        return this.userAnswers[questionId]?.answer || null;
    }

    // Check if question is answered
    isAnswered(questionId) {
        return questionId in this.userAnswers;
    }

    // Navigate to next question
    next() {
        if (this.currentIndex < this.sessionQuestions.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }

    // Navigate to previous question
    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        return false;
    }

    // Check if can go next
    canGoNext() {
        return this.currentIndex < this.sessionQuestions.length - 1;
    }

    // Check if can go previous
    canGoPrevious() {
        return this.currentIndex > 0;
    }

    // Get current question number
    getCurrentQuestionNumber() {
        return this.currentIndex + 1;
    }

    // Get total questions
    getTotalQuestions() {
        return this.sessionQuestions.length;
    }

    // Check answer correctness
    checkAnswer(questionId, userAnswer) {
        const question = this.sessionQuestions.find(q => q.id === questionId);
        if (!question) {
            return false;
        }

        const correctAnswer = question.correctAnswer;
        if (!correctAnswer) {
            return false;
        }

        // Normalize answers for comparison
        let normalizedUser = String(userAnswer).trim().toLowerCase();
        let normalizedCorrect = String(correctAnswer).trim().toLowerCase();

        // For true/false, handle case variations
        if (question.type === 'true-false') {
            normalizedUser = normalizedUser === 'true' ? 'True' : (normalizedUser === 'false' ? 'False' : normalizedUser);
            normalizedCorrect = normalizedCorrect === 'true' ? 'True' : (normalizedCorrect === 'false' ? 'False' : normalizedCorrect);
            return normalizedUser === normalizedCorrect;
        }

        // For multiple choice, compare letters
        if (question.type === 'multiple-choice') {
            // Extract just the letter if answer includes text
            const userLetter = normalizedUser.charAt(0);
            const correctLetter = normalizedCorrect.charAt(0);
            return userLetter === correctLetter;
        }

        // For short answer, use advanced matching if available
        if (question.type === 'short-answer') {
            if (this.answerMatcher) {
                const matchResult = this.answerMatcher.match(userAnswer, correctAnswer);
                // Store match details for feedback
                question._lastMatchResult = matchResult;
                // Consider it correct if score is above threshold (0.7 = 70% match)
                return matchResult.match && matchResult.score >= 0.7;
            } else {
                // Fallback to simple case-insensitive comparison
                return normalizedUser === normalizedCorrect;
            }
        }

        return false;
    }

    // Get match details for short answer questions (for detailed feedback)
    getMatchDetails(questionId) {
        const question = this.sessionQuestions.find(q => q.id === questionId);
        if (question && question.type === 'short-answer' && question._lastMatchResult) {
            return question._lastMatchResult;
        }
        return null;
    }

    // Get session results
    getSessionResults() {
        const results = {
            total: this.sessionQuestions.length,
            correct: 0,
            incorrect: 0,
            unanswered: 0,
            questions: []
        };

        this.sessionQuestions.forEach(question => {
            const userAnswer = this.getAnswer(question.id);
            const isCorrect = userAnswer ? this.checkAnswer(question.id, userAnswer) : false;

            if (!userAnswer) {
                results.unanswered++;
            } else if (isCorrect) {
                results.correct++;
            } else {
                results.incorrect++;
            }

            results.questions.push({
                question: question,
                userAnswer: userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
                explanation: question.explanation
            });
        });

        return results;
    }

    // Get wrong answers grouped by tag
    getWrongAnswersByTag() {
        const results = this.getSessionResults();
        const tagMap = {};

        results.questions.forEach(item => {
            if (!item.isCorrect && item.userAnswer !== null) {
                const tag = item.question.tag;
                if (!tagMap[tag]) {
                    tagMap[tag] = {
                        tag: tag,
                        count: 0,
                        questions: []
                    };
                }
                tagMap[tag].count++;
                tagMap[tag].questions.push(item);
            }
        });

        return Object.values(tagMap).sort((a, b) => b.count - a.count);
    }

    // Reset session
    reset() {
        this.sessionQuestions = [];
        this.userAnswers = {};
        this.currentIndex = 0;
    }

    // Export session data for saving
    exportSessionData(groupNumber) {
        const results = this.getSessionResults();
        return {
            groupNumber: groupNumber,
            totalQuestions: this.sessionQuestions.length,
            questionIds: this.sessionQuestions.map(q => q.id),
            userAnswers: { ...this.userAnswers },
            results: results,
            completed: this.currentIndex === this.sessionQuestions.length - 1 && 
                      Object.keys(this.userAnswers).length === this.sessionQuestions.length
        };
    }

    // Load session data (for resuming)
    loadSessionData(sessionData, allQuestions) {
        // Find questions by IDs
        this.sessionQuestions = sessionData.questionIds
            .map(id => allQuestions.find(q => q.id === id))
            .filter(q => q !== undefined);
        
        this.userAnswers = { ...sessionData.userAnswers };
        
        // Find the first unanswered question, or go to last if all answered
        const unansweredIndex = this.sessionQuestions.findIndex(q => !this.userAnswers[q.id]);
        this.currentIndex = unansweredIndex >= 0 ? unansweredIndex : this.sessionQuestions.length - 1;
        
        return {
            total: this.sessionQuestions.length,
            current: this.currentIndex + 1
        };
    }

    // Get current group number (if available)
    getCurrentGroupNumber() {
        if (this.sessionQuestions.length > 0) {
            return this.sessionQuestions[0].group;
        }
        return null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionManager;
}

