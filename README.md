# Exercise Practice Interface

A web-based interface for practicing exercises from markdown files with immediate feedback and personalized study guide recommendations.

## Features

- **Multiple Question Types**: Supports Multiple Choice, True/False, and Short Answer questions
- **One Question at a Time**: Clean, focused interface showing one question per screen
- **Immediate Feedback**: See results and correct answers immediately after answering
- **Navigation**: Previous and Next buttons to move between questions
- **Session Summary**: Detailed summary with score and performance breakdown
- **Study Guide Recommendations**: Personalized recommendations based on wrong answers, suggesting which study guide sections to review
- **Question Tagging**: Questions are tagged with study guide sections for targeted feedback
- **Session Saving**: Automatically saves your progress - resume incomplete sessions or review past sessions
- **Session History**: View all past sessions with scores and dates

## Setup

### Option 1: Using a Local Web Server (Recommended)

Since the application needs to load markdown files, you'll need to run a local web server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Usage

1. **Select Study Group**: Choose from available exercise groups (Group 1, Group 3, etc.)
2. **Select Number of Questions**: Choose how many questions you want to practice (1 to total available)
3. **Start Quiz**: Click "Start Quiz" to begin
4. **Answer Questions**: 
   - Select your answer (radio buttons for MC/TF, text input for short answer)
   - Feedback appears immediately showing if you're correct
   - Use Previous/Next buttons to navigate
   - Your progress is automatically saved as you answer questions
5. **View Summary**: After completing all questions, see your score and study guide recommendations
6. **Review Recommendations**: Click on study guide links to review topics where you missed questions
7. **Manage Sessions**: 
   - Click "View Past Sessions" to see all your previous quiz sessions
   - Resume incomplete sessions to continue where you left off
   - View details of completed sessions to review your performance
   - Delete sessions you no longer need

## File Structure

```
/
├── index.html              # Main HTML file
├── js/
│   ├── app.js             # Application entry point
│   ├── parser.js          # Markdown parser for exercises
│   ├── questionManager.js # Question selection and state management
│   ├── ui.js              # UI rendering and interactions
│   └── feedback.js        # Study guide recommendation generator
├── css/
│   └── style.css          # Styling
├── Exercises/             # Exercise markdown files
└── Studying guides/        # Study guide markdown files
```

## Question Format

The parser expects exercises in the following format:

### Multiple Choice
```markdown
**1.1** Question text here?

a) Option A
b) Option B
c) Option C
d) Option D
```

### True/False
```markdown
**T/F 1.1** Question text here?
```

### Short Answer
```markdown
**SA 1.1** Question text here?
```

## Solution Format

Solutions should be in separate files with the format:

```markdown
**1.1** Question text

**Answer: b) Option B**

**Explanation:**
- Explanation point 1
- Explanation point 2
```

## Study Guide Tagging

Questions are automatically tagged based on their section. The tags map to study guide sections:

- "Section 1: Program Concept" → "Introduction and Core Concepts"
- "Section 2: Instruction Cycle" → "Instruction Cycle"
- "Section 3: Interrupts" → "Interrupts"
- "Section 4: System Bus" → "System Interconnection: The Bus"
- "Section 5: Bus Architecture" → "Bus Architecture and Design"

When you miss questions, the system recommends reviewing the corresponding study guide sections.

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern browsers with ES6+ support

## Notes

- The application uses vanilla JavaScript (no frameworks required)
- Questions are randomly selected from available exercises
- Answers are saved as you navigate between questions
- You can change your answer before moving to the next question
- The summary screen shows all questions with your answers and explanations
- **Sessions are saved automatically** using browser localStorage (data persists between browser sessions)
- You can resume incomplete sessions at any time
- Up to 50 past sessions are kept (oldest are automatically removed)
- **Short Answer Questions**: See `SUBJECTIVE_QUESTIONS_EXPLANATION.md` for details on how subjective questions are evaluated

