// Question Parser for Exercise Markdown Files

// Section to Study Guide Tag Mapping
const SECTION_TAG_MAP = {
    'Section 1: Program Concept and Computer Components': 'Introduction and Core Concepts',
    'Section 1: Program Concept': 'Introduction and Core Concepts',
    'Section 2: Computer Components': 'Computer Components Overview',
    'Section 2: Instruction Cycle': 'Instruction Cycle',
    'Section 3: Instruction Cycle': 'Instruction Cycle',
    'Section 3: Interrupts': 'Interrupts',
    'Section 4: Interrupts': 'Interrupts',
    'Section 4: System Bus': 'System Interconnection: The Bus',
    'Section 5: System Bus': 'System Interconnection: The Bus',
    'Section 5: Bus Architecture': 'Bus Architecture and Design',
    'Section 6: Bus Architecture': 'Bus Architecture and Design'
};

class ExerciseParser {
    constructor() {
        this.questions = [];
        this.solutions = {};
    }

    // Parse exercise markdown file
    parseExerciseFile(content, groupNumber) {
        const lines = content.split('\n');
        let currentSection = '';
        let currentQuestion = null;
        let inQuestion = false;
        let questionText = '';
        let options = [];
        let questionId = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Detect section headers
            if (line.startsWith('### Section')) {
                currentSection = line.replace('### ', '');
                continue;
            }

            // Detect question start (Multiple Choice or True/False)
            const mcMatch = line.match(/^\*\*(\d+\.\d+)\*\*/);
            const tfMatch = line.match(/^\*\*T\/F\s+(\d+\.\d+)\*\*/);
            const saMatch = line.match(/^\*\*SA\s+(\d+\.\d+)\*\*/);

            if (mcMatch) {
                // Save previous question if exists
                if (currentQuestion) {
                    this.questions.push(currentQuestion);
                }

                questionId = mcMatch[1];
                questionText = line.replace(/^\*\*\d+\.\d+\*\*\s*/, '');
                options = [];
                inQuestion = true;
                currentQuestion = {
                    id: questionId,
                    type: 'multiple-choice',
                    text: questionText,
                    options: [],
                    section: currentSection,
                    tag: this.getTagFromSection(currentSection),
                    group: groupNumber
                };
            } else if (tfMatch) {
                if (currentQuestion) {
                    this.questions.push(currentQuestion);
                }

                questionId = `T/F ${tfMatch[1]}`;
                questionText = line.replace(/^\*\*T\/F\s+\d+\.\d+\*\*\s*/, '');
                inQuestion = true;
                currentQuestion = {
                    id: questionId,
                    type: 'true-false',
                    text: questionText,
                    options: ['True', 'False'],
                    section: currentSection,
                    tag: this.getTagFromSection(currentSection),
                    group: groupNumber
                };
            } else if (saMatch) {
                if (currentQuestion) {
                    this.questions.push(currentQuestion);
                }

                questionId = `SA ${saMatch[1]}`;
                questionText = line.replace(/^\*\*SA\s+\d+\.\d+\*\*\s*/, '');
                inQuestion = true;
                currentQuestion = {
                    id: questionId,
                    type: 'short-answer',
                    text: questionText,
                    options: [],
                    section: currentSection,
                    tag: this.getTagFromSection(currentSection),
                    group: groupNumber
                };
            } else if (inQuestion && currentQuestion) {
                // Check for multiple choice options
                const optionMatch = line.match(/^([a-d])\)\s*(.+)/);
                if (optionMatch && currentQuestion.type === 'multiple-choice') {
                    currentQuestion.options.push({
                        letter: optionMatch[1],
                        text: optionMatch[2]
                    });
                } else if (line && !line.startsWith('---') && line.length > 0) {
                    // Continue question text if not an option and not a separator
                    if (!optionMatch) {
                        if (currentQuestion.type === 'multiple-choice' && currentQuestion.options.length === 0) {
                            // Still building question text before options
                            currentQuestion.text += ' ' + line;
                        } else if (currentQuestion.type !== 'multiple-choice') {
                            // For T/F and SA, continue building question text
                            currentQuestion.text += ' ' + line;
                        }
                    }
                }

                // End question on empty line after options (for MC) or after question text
                if (line === '' && currentQuestion.options.length > 0 && currentQuestion.type === 'multiple-choice') {
                    inQuestion = false;
                } else if (line === '' && currentQuestion.type !== 'multiple-choice' && currentQuestion.text.length > 10) {
                    inQuestion = false;
                }
            }
        }

        // Add last question
        if (currentQuestion) {
            this.questions.push(currentQuestion);
        }

        return this.questions;
    }

    // Parse solution file
    parseSolutionFile(content) {
        const lines = content.split('\n');
        let currentQuestionId = null;
        let currentAnswer = null;
        let currentExplanation = [];
        let inExplanation = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Detect question ID
            const mcMatch = line.match(/^\*\*(\d+\.\d+)\*\*/);
            const tfMatch = line.match(/^\*\*T\/F\s+(\d+\.\d+)\*\*/);
            const saMatch = line.match(/^\*\*SA\s+(\d+\.\d+)\*\*/);

            if (mcMatch || tfMatch || saMatch) {
                // Save previous solution
                if (currentQuestionId && currentAnswer !== null) {
                    this.solutions[currentQuestionId] = {
                        answer: currentAnswer,
                        explanation: currentExplanation.join('\n')
                    };
                }

                // Start new question
                if (mcMatch) {
                    currentQuestionId = mcMatch[1];
                } else if (tfMatch) {
                    currentQuestionId = `T/F ${tfMatch[1]}`;
                } else if (saMatch) {
                    currentQuestionId = `SA ${saMatch[1]}`;
                }

                currentAnswer = null;
                currentExplanation = [];
                inExplanation = false;
            } else if (line.startsWith('**Answer:')) {
                // Extract answer - handle both **Answer: ...** and **Answer: ... (without closing **)
                const answerMatch = line.match(/\*\*Answer:\s*(.+?)(?:\*\*|$)/);
                if (answerMatch) {
                    let answerText = answerMatch[1].trim();
                    // Extract letter for MC (format: "d) Cache interrupts" or just "d)")
                    const letterMatch = answerText.match(/^([a-d])\)/i);
                    if (letterMatch) {
                        currentAnswer = letterMatch[1].toLowerCase();
                    } else if (answerText.match(/^(True|False)/i)) {
                        // Handle True/False
                        const match = answerText.match(/^(True|False)/i);
                        currentAnswer = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
                    } else {
                        // For short answer or other formats, use the full text
                        currentAnswer = answerText;
                    }
                }
            } else if (line.startsWith('**Explanation:') || line.startsWith('**Answer') || inExplanation) {
                if (line.startsWith('**Explanation:')) {
                    inExplanation = true;
                    const expText = line.replace('**Explanation:**', '').trim();
                    if (expText) {
                        currentExplanation.push(expText);
                    }
                } else if (inExplanation && line && !line.startsWith('---')) {
                    currentExplanation.push(line);
                }
            }
        }

        // Save last solution
        if (currentQuestionId && currentAnswer !== null) {
            this.solutions[currentQuestionId] = {
                answer: currentAnswer,
                explanation: currentExplanation.join('\n')
            };
        }

        return this.solutions;
    }

    // Merge questions with solutions
    mergeQuestionsWithSolutions() {
        return this.questions.map(q => {
            const solution = this.solutions[q.id];
            if (solution) {
                q.correctAnswer = solution.answer;
                q.explanation = solution.explanation;
            }
            return q;
        });
    }

    // Get tag from section name
    getTagFromSection(sectionName) {
        return SECTION_TAG_MAP[sectionName] || sectionName;
    }

    // Load and parse exercise files for a group
    async loadGroup(groupNumber) {
        this.questions = [];
        this.solutions = {};

        try {
            // Load exercise file
            const exercisePath = `Exercises/Group_${groupNumber}_Exercises.md`;
            const exerciseResponse = await fetch(exercisePath);
            if (!exerciseResponse.ok) {
                throw new Error(`Failed to load exercise file: ${exercisePath}`);
            }
            const exerciseContent = await exerciseResponse.text();
            this.parseExerciseFile(exerciseContent, groupNumber);

            // Load solution files (try all parts)
            let part = 1;
            let hasMoreParts = true;

            while (hasMoreParts) {
                const solutionPath = `Exercises/Group_${groupNumber}_Exercises_Solutions_Part${part}.md`;
                try {
                    const solutionResponse = await fetch(solutionPath);
                    if (solutionResponse.ok) {
                        const solutionContent = await solutionResponse.text();
                        this.parseSolutionFile(solutionContent);
                        part++;
                    } else {
                        hasMoreParts = false;
                    }
                } catch (e) {
                    hasMoreParts = false;
                }
            }

            // Merge questions with solutions
            return this.mergeQuestionsWithSolutions();
        } catch (error) {
            console.error('Error loading group:', error);
            throw error;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExerciseParser;
}

