// Advanced Answer Matcher for Short Answer Questions
// Provides intelligent matching beyond simple string comparison

class AnswerMatcher {
    constructor() {
        // Common words to ignore in matching (articles, prepositions, etc.)
        this.stopWords = new Set([
            'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
            'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'from', 'as', 'into',
            'and', 'or', 'but', 'if', 'then', 'than', 'that', 'this', 'these', 'those'
        ]);

        // Common synonyms mapping (can be expanded)
        this.synonyms = {
            'system': ['systems', 'computer', 'computers'],
            'memory': ['storage', 'storage device'],
            'cpu': ['processor', 'central processing unit'],
            'instruction': ['command', 'operation'],
            'data': ['information'],
            'hardware': ['physical components'],
            'software': ['program', 'programs', 'application', 'applications']
        };
    }

    // Main matching function - tries multiple strategies
    match(userAnswer, correctAnswer, options = {}) {
        if (!userAnswer || !correctAnswer) {
            return { match: false, score: 0, method: 'none' };
        }

        // Normalize both answers
        const normalizedUser = this.normalize(userAnswer);
        const normalizedCorrect = this.normalize(correctAnswer);

        // Strategy 1: Exact match (after normalization)
        if (normalizedUser === normalizedCorrect) {
            return { match: true, score: 1.0, method: 'exact' };
        }

        // Strategy 2: Fuzzy match (Levenshtein distance)
        const fuzzyResult = this.fuzzyMatch(normalizedUser, normalizedCorrect);
        if (fuzzyResult.score >= 0.85) {
            return { match: true, score: fuzzyResult.score, method: 'fuzzy' };
        }

        // Strategy 3: Keyword-based matching
        const keywordResult = this.keywordMatch(normalizedUser, normalizedCorrect);
        if (keywordResult.score >= 0.7) {
            return { match: true, score: keywordResult.score, method: 'keyword' };
        }

        // Strategy 4: Semantic similarity (word overlap)
        const semanticResult = this.semanticMatch(normalizedUser, normalizedCorrect);
        if (semanticResult.score >= 0.6) {
            return { match: true, score: semanticResult.score, method: 'semantic' };
        }

        // Strategy 5: Partial match (for longer answers)
        const partialResult = this.partialMatch(normalizedUser, normalizedCorrect);
        if (partialResult.score >= 0.5) {
            return { match: true, score: partialResult.score, method: 'partial' };
        }

        // No match found
        return { 
            match: false, 
            score: Math.max(fuzzyResult.score, keywordResult.score, semanticResult.score, partialResult.score),
            method: 'none' 
        };
    }

    // Normalize text: lowercase, trim, remove extra spaces, handle punctuation
    normalize(text) {
        return String(text)
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
            .replace(/\s+/g, ' ')      // Collapse multiple spaces
            .trim();
    }

    // Extract keywords (remove stop words)
    extractKeywords(text) {
        const words = text.split(/\s+/);
        return words.filter(word => 
            word.length > 2 && 
            !this.stopWords.has(word.toLowerCase())
        );
    }

    // Fuzzy matching using Levenshtein distance
    fuzzyMatch(str1, str2) {
        const distance = this.levenshteinDistance(str1, str2);
        const maxLength = Math.max(str1.length, str2.length);
        const similarity = 1 - (distance / maxLength);
        
        return {
            match: similarity >= 0.85,
            score: similarity,
            distance: distance
        };
    }

    // Calculate Levenshtein distance between two strings
    levenshteinDistance(str1, str2) {
        const m = str1.length;
        const n = str2.length;
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + 1,      // deletion
                        dp[i][j - 1] + 1,      // insertion
                        dp[i - 1][j - 1] + 1   // substitution
                    );
                }
            }
        }

        return dp[m][n];
    }

    // Keyword-based matching
    keywordMatch(userAnswer, correctAnswer) {
        const userKeywords = new Set(this.extractKeywords(userAnswer));
        const correctKeywords = new Set(this.extractKeywords(correctAnswer));

        if (correctKeywords.size === 0) {
            return { match: false, score: 0 };
        }

        // Count matching keywords (including synonyms)
        let matches = 0;
        for (const keyword of correctKeywords) {
            if (userKeywords.has(keyword)) {
                matches++;
            } else {
                // Check synonyms
                const found = this.findSynonymMatch(keyword, userKeywords);
                if (found) matches += 0.8; // Partial credit for synonym
            }
        }

        const score = matches / correctKeywords.size;
        return {
            match: score >= 0.7,
            score: score,
            matchedKeywords: matches,
            totalKeywords: correctKeywords.size
        };
    }

    // Find if a keyword or its synonym exists in user answer
    findSynonymMatch(keyword, userKeywords) {
        if (userKeywords.has(keyword)) return true;
        
        // Check if any synonym exists
        for (const [base, synonyms] of Object.entries(this.synonyms)) {
            if (keyword === base || synonyms.includes(keyword)) {
                for (const syn of synonyms) {
                    if (userKeywords.has(syn)) return true;
                }
            }
        }
        return false;
    }

    // Semantic matching based on word overlap
    semanticMatch(userAnswer, correctAnswer) {
        const userWords = new Set(userAnswer.split(/\s+/));
        const correctWords = new Set(correctAnswer.split(/\s+/));

        // Calculate Jaccard similarity
        const intersection = new Set([...userWords].filter(x => correctWords.has(x)));
        const union = new Set([...userWords, ...correctWords]);
        
        const jaccard = intersection.size / union.size;

        // Weight by important words (longer words are usually more important)
        let weightedScore = 0;
        let totalWeight = 0;

        for (const word of correctWords) {
            const weight = word.length > 4 ? 2 : 1; // Longer words weighted more
            totalWeight += weight;
            if (userWords.has(word)) {
                weightedScore += weight;
            }
        }

        const weightedSimilarity = totalWeight > 0 ? weightedScore / totalWeight : 0;
        const finalScore = (jaccard * 0.4) + (weightedSimilarity * 0.6);

        return {
            match: finalScore >= 0.6,
            score: finalScore,
            jaccard: jaccard,
            weighted: weightedSimilarity
        };
    }

    // Partial match for longer answers
    partialMatch(userAnswer, correctAnswer) {
        // Check if user answer contains significant portions of correct answer
        const correctPhrases = this.extractPhrases(correctAnswer);
        const userText = userAnswer.toLowerCase();

        let matchedPhrases = 0;
        for (const phrase of correctPhrases) {
            if (userText.includes(phrase.toLowerCase())) {
                matchedPhrases++;
            }
        }

        const score = correctPhrases.length > 0 ? matchedPhrases / correctPhrases.length : 0;
        
        return {
            match: score >= 0.5,
            score: score,
            matchedPhrases: matchedPhrases,
            totalPhrases: correctPhrases.length
        };
    }

    // Extract meaningful phrases (3+ word sequences)
    extractPhrases(text) {
        const words = text.split(/\s+/);
        const phrases = [];
        
        for (let i = 0; i <= words.length - 3; i++) {
            const phrase = words.slice(i, i + 3).join(' ');
            if (phrase.length > 10) { // Only meaningful phrases
                phrases.push(phrase);
            }
        }
        
        return phrases;
    }

    // Check if answer contains all required key concepts
    checkRequiredConcepts(userAnswer, requiredConcepts) {
        if (!requiredConcepts || requiredConcepts.length === 0) {
            return { match: true, score: 1.0, missing: [] };
        }

        const normalizedUser = this.normalize(userAnswer);
        const missing = [];

        for (const concept of requiredConcepts) {
            const normalizedConcept = this.normalize(concept);
            if (!normalizedUser.includes(normalizedConcept)) {
                // Check synonyms
                if (!this.findSynonymMatch(normalizedConcept, new Set(this.extractKeywords(normalizedUser)))) {
                    missing.push(concept);
                }
            }
        }

        const score = 1 - (missing.length / requiredConcepts.length);
        return {
            match: missing.length === 0,
            score: score,
            missing: missing,
            found: requiredConcepts.length - missing.length,
            total: requiredConcepts.length
        };
    }

    // Get detailed feedback about why answer was/wasn't matched
    getFeedback(userAnswer, correctAnswer, matchResult) {
        const feedback = {
            matched: matchResult.match,
            score: matchResult.score,
            method: matchResult.method,
            suggestions: []
        };

        if (!matchResult.match) {
            const userKeywords = this.extractKeywords(userAnswer);
            const correctKeywords = this.extractKeywords(correctAnswer);
            const missingKeywords = correctKeywords.filter(kw => 
                !userKeywords.some(ukw => 
                    ukw.includes(kw) || kw.includes(ukw) || 
                    this.findSynonymMatch(kw, new Set([ukw]))
                )
            );

            if (missingKeywords.length > 0) {
                feedback.suggestions.push(`Missing key concepts: ${missingKeywords.slice(0, 3).join(', ')}`);
            }

            // Check if answer is too short
            if (userAnswer.length < correctAnswer.length * 0.5) {
                feedback.suggestions.push('Your answer seems too brief. Try to include more details.');
            }

            // Check if answer is too long (might be off-topic)
            if (userAnswer.length > correctAnswer.length * 2) {
                feedback.suggestions.push('Your answer is quite long. Make sure you\'re addressing the specific question.');
            }
        }

        return feedback;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnswerMatcher;
}





