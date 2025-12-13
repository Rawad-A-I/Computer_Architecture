// Main Application Entry Point

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create instances
    const parser = new ExerciseParser();
    const answerMatcher = new AnswerMatcher();
    const questionManager = new QuestionManager();
    const feedbackGenerator = new FeedbackGenerator();
    const sessionManager = new SessionManager();
    const markdownViewer = new MarkdownViewer();
    const flashcardParser = new FlashcardParser();
    const flashcardManager = new FlashcardManager();
    const uiController = new UIController(questionManager, feedbackGenerator, sessionManager);

    // Set parser and answer matcher in question manager
    questionManager.setParser(parser);
    questionManager.setAnswerMatcher(answerMatcher);

    // Set markdown viewer in UI controller
    uiController.setMarkdownViewer(markdownViewer);

    // Set flashcard components in UI controller
    uiController.setFlashcardComponents(flashcardManager, flashcardParser);

    // Initialize UI
    uiController.init();

    // Make available globally for debugging
    window.app = {
        parser,
        answerMatcher,
        questionManager,
        feedbackGenerator,
        sessionManager,
        markdownViewer,
        flashcardParser,
        flashcardManager,
        uiController
    };
});

