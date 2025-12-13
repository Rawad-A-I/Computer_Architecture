// Feedback Generator - Analyzes wrong answers and generates study guide recommendations

class FeedbackGenerator {
    constructor() {
        // Map tags to study guide file names
        this.tagToGuideMap = {
            'Introduction and Core Concepts': {
                file: 'Group_1_Foundations_of_Computer_Architecture.md',
                anchor: 'introduction-and-core-concepts'
            },
            'Computer Components Overview': {
                file: 'Group_1_Foundations_of_Computer_Architecture.md',
                anchor: 'computer-components-overview'
            },
            'Instruction Cycle': {
                file: 'Group_1_Foundations_of_Computer_Architecture.md',
                anchor: 'instruction-cycle'
            },
            'Interrupts': {
                file: 'Group_1_Foundations_of_Computer_Architecture.md',
                anchor: 'interrupts'
            },
            'System Interconnection: The Bus': {
                file: 'Group_1_Foundations_of_Computer_Architecture.md',
                anchor: 'system-interconnection-the-bus'
            },
            'Bus Architecture and Design': {
                file: 'Group_1_Foundations_of_Computer_Architecture.md',
                anchor: 'bus-architecture-and-design'
            }
        };
    }

    // Generate recommendations based on wrong answers
    generateRecommendations(wrongAnswersByTag, groupNumber) {
        if (!wrongAnswersByTag || wrongAnswersByTag.length === 0) {
            return {
                hasRecommendations: false,
                message: 'Great job! You answered all questions correctly. Keep up the excellent work!',
                recommendations: []
            };
        }

        const recommendations = wrongAnswersByTag.map(tagData => {
            const guideInfo = this.tagToGuideMap[tagData.tag];
            if (!guideInfo) {
                return {
                    tag: tagData.tag,
                    count: tagData.count,
                    message: `Review ${tagData.tag} - You missed ${tagData.count} question${tagData.count > 1 ? 's' : ''} on this topic.`,
                    guidePath: null
                };
            }

            const guidePath = `Studying guides/${guideInfo.file}`;
            return {
                tag: tagData.tag,
                count: tagData.count,
                message: `Review ${tagData.tag} - You missed ${tagData.count} question${tagData.count > 1 ? 's' : ''} on this topic.`,
                guidePath: guidePath,
                anchor: guideInfo.anchor
            };
        });

        return {
            hasRecommendations: true,
            message: `You missed questions in ${recommendations.length} topic area${recommendations.length > 1 ? 's' : ''}. Focus on reviewing these sections:`,
            recommendations: recommendations
        };
    }

    // Format recommendation HTML
    formatRecommendationHTML(recommendation) {
        let html = `<div class="recommendation-item">`;
        html += `<p class="recommendation-text">${recommendation.message}</p>`;
        
        if (recommendation.guidePath) {
            // Use button instead of link to open in webview
            html += `<button class="guide-link guide-link-btn" data-guide-path="${recommendation.guidePath}" data-anchor="${recommendation.anchor || ''}" data-tag="${recommendation.tag}">`;
            html += `Open Study Guide: ${recommendation.tag}`;
            html += `</button>`;
        }
        
        html += `</div>`;
        return html;
    }

    // Generate full feedback summary
    generateSummary(results, wrongAnswersByTag, groupNumber) {
        const recommendations = this.generateRecommendations(wrongAnswersByTag, groupNumber);
        
        const summary = {
            score: {
                total: results.total,
                correct: results.correct,
                incorrect: results.incorrect,
                unanswered: results.unanswered,
                percentage: Math.round((results.correct / results.total) * 100)
            },
            recommendations: recommendations,
            questionDetails: results.questions.map(item => ({
                id: item.question.id,
                text: item.question.text,
                type: item.question.type,
                userAnswer: item.userAnswer,
                correctAnswer: item.correctAnswer,
                isCorrect: item.isCorrect,
                explanation: item.explanation,
                tag: item.question.tag
            }))
        };

        return summary;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedbackGenerator;
}

