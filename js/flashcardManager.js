// Flashcard Manager - Manages flashcard sessions and navigation

class FlashcardManager {
    constructor() {
        this.allFlashcards = [];
        this.currentGroup = null;
        this.currentSection = null;
        this.currentSubsection = null;
        this.currentCardIndex = 0;
        this.filteredCards = [];
        this.cardStates = {}; // Track which cards user knows/doesn't know
    }

    // Load flashcards for a group
    async loadGroup(groupNumber, parser) {
        // Try to load from JSON file first (faster)
        try {
            const response = await fetch(`flashcards/group_${groupNumber}_flashcards.json`);
            if (response.ok) {
                const data = await response.json();
                this.allFlashcards = data.allCards || [];
                this.currentGroup = groupNumber;
                this.filteredCards = [...this.allFlashcards];
                this.currentCardIndex = 0;
                this.cardStates = {};
                return this.allFlashcards;
            }
        } catch (e) {
            console.warn('Failed to load from JSON, falling back to parser:', e);
        }
        
        // Fallback to parsing from markdown
        if (parser) {
            this.allFlashcards = await parser.loadGroupFlashcards(groupNumber);
            this.currentGroup = groupNumber;
            this.filteredCards = [...this.allFlashcards];
            this.currentCardIndex = 0;
            this.cardStates = {};
            return this.allFlashcards;
        }
        
        throw new Error('No parser provided and JSON file not found');
    }
    
    // Get grouped structure for navigation
    async getGroupedStructure(groupNumber) {
        try {
            const response = await fetch(`flashcards/group_${groupNumber}_flashcards.json`);
            if (response.ok) {
                const data = await response.json();
                return data.sections || [];
            }
        } catch (e) {
            console.warn('Failed to load grouped structure:', e);
        }
        return [];
    }

    // Filter cards by section and subsection
    filterCards(section = null, subsection = null) {
        if (!section && !subsection) {
            this.filteredCards = [...this.allFlashcards];
        } else if (section && !subsection) {
            this.filteredCards = this.allFlashcards.filter(card => card.section === section);
        } else if (section && subsection) {
            this.filteredCards = this.allFlashcards.filter(card => 
                card.section === section && card.subsection === subsection
            );
        }
        
        this.currentCardIndex = 0;
        this.currentSection = section;
        this.currentSubsection = subsection;
        return this.filteredCards;
    }

    // Get current card
    getCurrentCard() {
        if (this.filteredCards.length === 0) {
            return null;
        }
        return this.filteredCards[this.currentCardIndex];
    }

    // Get card by index
    getCard(index) {
        if (index < 0 || index >= this.filteredCards.length) {
            return null;
        }
        return this.filteredCards[index];
    }

    // Navigate to next card
    next() {
        if (this.currentCardIndex < this.filteredCards.length - 1) {
            this.currentCardIndex++;
            return true;
        }
        return false;
    }

    // Navigate to previous card
    previous() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            return true;
        }
        return false;
    }

    // Go to specific card index
    goToCard(index) {
        if (index >= 0 && index < this.filteredCards.length) {
            this.currentCardIndex = index;
            return true;
        }
        return false;
    }

    // Check if can go next
    canGoNext() {
        return this.currentCardIndex < this.filteredCards.length - 1;
    }

    // Check if can go previous
    canGoPrevious() {
        return this.currentCardIndex > 0;
    }

    // Get current card number
    getCurrentCardNumber() {
        return this.currentCardIndex + 1;
    }

    // Get total cards
    getTotalCards() {
        return this.filteredCards.length;
    }

    // Mark card as known/unknown
    markCard(cardId, known) {
        this.cardStates[cardId] = known;
    }

    // Get card state
    getCardState(cardId) {
        return this.cardStates[cardId] || null;
    }

    // Get statistics
    getStatistics() {
        const total = this.filteredCards.length;
        const known = Object.values(this.cardStates).filter(state => state === true).length;
        const unknown = Object.values(this.cardStates).filter(state => state === false).length;
        const unmarked = total - known - unknown;

        return {
            total,
            known,
            unknown,
            unmarked,
            progress: total > 0 ? Math.round((known / total) * 100) : 0
        };
    }

    // Get grouped structure
    async getGroupedStructure(groupNumber) {
        // Try to load from JSON file first (faster and already structured)
        try {
            const response = await fetch(`flashcards/group_${groupNumber}_flashcards.json`);
            if (response.ok) {
                const data = await response.json();
                return data.sections || [];
            }
        } catch (e) {
            console.warn('Failed to load grouped structure from JSON:', e);
        }
        
        // Fallback to generating from loaded flashcards
        const grouped = {};
        this.allFlashcards.forEach(card => {
            const sectionKey = card.section || 'Other';
            if (!grouped[sectionKey]) {
                grouped[sectionKey] = {
                    section: sectionKey,
                    subsections: {}
                };
            }

            const subsectionKey = card.subsection || 'General';
            if (!grouped[sectionKey].subsections[subsectionKey]) {
                grouped[sectionKey].subsections[subsectionKey] = {
                    subsection: subsectionKey,
                    cards: []
                };
            }

            grouped[sectionKey].subsections[subsectionKey].cards.push(card);
        });

        // Convert to array format
        return Object.keys(grouped).map(sectionKey => {
            const section = grouped[sectionKey];
            return {
                section: section.section,
                subsections: Object.keys(section.subsections).map(subKey => {
                    const sub = section.subsections[subKey];
                    return {
                        subsection: sub.subsection,
                        cardCount: sub.cards.length,
                        cards: sub.cards
                    };
                })
            };
        });
    }

    // Shuffle cards
    shuffle() {
        // Fisher-Yates shuffle
        for (let i = this.filteredCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.filteredCards[i], this.filteredCards[j]] = [this.filteredCards[j], this.filteredCards[i]];
        }
        this.currentCardIndex = 0;
    }

    // Reset filter
    resetFilter() {
        this.filteredCards = [...this.allFlashcards];
        this.currentCardIndex = 0;
        this.currentSection = null;
        this.currentSubsection = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlashcardManager;
}

