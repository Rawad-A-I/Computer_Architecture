// Script to generate flashcards from study guides and save as JSON
// Run with: node generate_flashcards.js

const fs = require('fs');
const path = require('path');

// Import the FlashcardParser (simplified version for Node.js)
class FlashcardParser {
    constructor() {
        this.flashcards = [];
    }

    parseStudyGuide(content, groupNumber) {
        const lines = content.split('\n');
        const flashcards = [];
        
        let currentSection = '';
        let currentSubsection = '';
        let currentCard = null;
        let inCard = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Skip table of contents and separators
            if (line.startsWith('## Table of Contents') || 
                line.startsWith('**Chapter') ||
                line.length === 0) {
                continue;
            }
            
            // Handle separators - don't skip, but don't break card collection either
            if (line === '---') {
                continue;
            }

            // Main section (##)
            const mainSectionMatch = line.match(/^##\s+(.+)$/);
            if (mainSectionMatch) {
                currentSection = mainSectionMatch[1];
                currentSubsection = '';
                continue;
            }

            // Subsection (###)
            const subsectionMatch = line.match(/^###\s+(.+)$/);
            if (subsectionMatch) {
                currentSubsection = subsectionMatch[1];
                // Save previous card if exists
                if (currentCard) {
                    flashcards.push(currentCard);
                }
                currentCard = null;
                inCard = false;
                continue;
            }

            // Sub-subsection (####)
            const subSubsectionMatch = line.match(/^####\s+(.+)$/);
            if (subSubsectionMatch) {
                // Save previous card
                if (currentCard) {
                    flashcards.push(currentCard);
                }
                
                // Create new card for sub-subsection
                currentCard = {
                    group: groupNumber,
                    section: currentSection,
                    subsection: currentSubsection,
                    title: subSubsectionMatch[1],
                    front: subSubsectionMatch[1],
                    back: '',
                    type: 'concept',
                    points: []
                };
                inCard = true;
                continue;
            }

            // Bold text (often definitions or key points)
            const boldMatch = line.match(/^\*\*(.+?):\*\*\s*(.+)$/);
            if (boldMatch) {
                // Save previous card
                if (currentCard) {
                    flashcards.push(currentCard);
                }

                // Create definition card
                currentCard = {
                    group: groupNumber,
                    section: currentSection,
                    subsection: currentSubsection,
                    title: boldMatch[1],
                    front: boldMatch[1],
                    back: boldMatch[2] || '',
                    type: 'definition',
                    points: []
                };
                inCard = true;
                continue;
            }
            
            // Check for bold text without description on same line (e.g., **Hardwired Systems:**)
            const boldHeaderMatch = line.match(/^\*\*(.+?):\*\*\s*$/);
            if (boldHeaderMatch) {
                // Save previous card
                if (currentCard) {
                    flashcards.push(currentCard);
                }
                // Create card with title only, content will come from next lines
                currentCard = {
                    group: groupNumber,
                    section: currentSection,
                    subsection: currentSubsection,
                    title: boldHeaderMatch[1],
                    front: boldHeaderMatch[1],
                    back: '',
                    type: 'definition',
                    points: []
                };
                inCard = true;
                continue;
            }

            // Key point or principle
            if (line.match(/^\*\*(Fundamental Principle|Key Insight|Key Point|Definition|Function|Purpose|Process|Example):\*\*/)) {
                if (currentCard) {
                    flashcards.push(currentCard);
                }
                
                const principleMatch = line.match(/^\*\*(.+?):\*\*\s*(.+)$/);
                if (principleMatch) {
                    currentCard = {
                        group: groupNumber,
                        section: currentSection,
                        subsection: currentSubsection,
                        title: principleMatch[1],
                        front: principleMatch[1],
                        back: principleMatch[2],
                        type: 'principle',
                        points: []
                    };
                    inCard = true;
                }
                continue;
            }

            // Bullet points (list items)
            const bulletMatch = line.match(/^[-*]\s+(.+)$/);
            if (bulletMatch) {
                if (!currentCard) {
                    // Create a new list card
                    currentCard = {
                        group: groupNumber,
                        section: currentSection,
                        subsection: currentSubsection,
                        title: currentSubsection || currentSection,
                        front: currentSubsection || currentSection,
                        back: '',
                        type: 'list',
                        points: []
                    };
                    inCard = true;
                }
                currentCard.points.push(bulletMatch[1]);
                continue;
            }

            // Numbered list
            const numberedMatch = line.match(/^\d+\.\s+(.+)$/);
            if (numberedMatch) {
                if (!currentCard) {
                    currentCard = {
                        group: groupNumber,
                        section: currentSection,
                        subsection: currentSubsection,
                        title: currentSubsection || currentSection,
                        front: currentSubsection || currentSection,
                        back: '',
                        type: 'list',
                        points: []
                    };
                    inCard = true;
                }
                currentCard.points.push(numberedMatch[1]);
                continue;
            }

            // Regular text - add to current card's back
            // Only skip if it's a pure list card (created as list, has points, no back text)
            if (inCard && currentCard && line.length > 10) {
                const isPureList = currentCard.type === 'list' && currentCard.points.length > 0 && !currentCard.back;
                if (!isPureList) {
                    if (currentCard.back) {
                        currentCard.back += ' ' + line;
                    } else {
                        currentCard.back = line;
                    }
                }
            }
        }

        // Save last card
        if (currentCard) {
            flashcards.push(currentCard);
        }

        // Process cards to format back content
        flashcards.forEach((card) => {
            // If card has points, use them for the back content (regardless of type)
            if (card.points.length > 0) {
                card.back = card.points.map((point, idx) => `${idx + 1}. ${point}`).join('\n');
                // Change type to list if it wasn't already
                if (card.type !== 'list') {
                    card.type = 'list';
                }
            } else if (card.back) {
                // Clean up back content
                card.back = card.back.trim().replace(/\s+/g, ' ');
            }
            
            // Ensure front is set
            if (!card.front) {
                card.front = card.title;
            }
        });

        return flashcards;
    }

    async loadGroupFlashcards(groupNumber) {
        // Map group numbers to actual file names
        const groupFileMap = {
            1: 'Group_1_Foundations_of_Computer_Architecture.md',
            2: 'Group_2_CPU_Architecture_and_Instruction_Execution.md',
            3: 'Group_3_Part1_Instruction_Set_Fundamentals.md',
            4: 'Group_4_Memory_Architecture_and_Hierarchy.md',
            5: 'Group_5_External_Memory_and_Storage_Systems.md',
            6: 'Group_6_Input_Output_Systems_and_Interfaces.md'
        };

        // Also try alternative names
        const alternativeFiles = {
            3: ['Group_3_Part1_Instruction_Set_Fundamentals.md', 'Group_3_Part2_MIPS_Case_Study_and_Addressing.md']
        };

        let content = null;
        const fileName = groupFileMap[groupNumber];
        
        if (fileName) {
            const filePath = path.join('Studying guides', fileName);
            try {
                if (fs.existsSync(filePath)) {
                    content = fs.readFileSync(filePath, 'utf-8');
                }
            } catch (e) {
                console.warn(`Failed to load ${filePath}:`, e.message);
            }
        }

        // Try alternative files for group 3
        if (!content && groupNumber === 3 && alternativeFiles[3]) {
            for (const altFile of alternativeFiles[3]) {
                try {
                    const filePath = path.join('Studying guides', altFile);
                    if (fs.existsSync(filePath)) {
                        const altContent = fs.readFileSync(filePath, 'utf-8');
                        if (content) {
                            content += '\n\n---\n\n' + altContent;
                        } else {
                            content = altContent;
                        }
                    }
                } catch (e) {
                    continue;
                }
            }
        }

        if (!content) {
            throw new Error(`No study guide found for Group ${groupNumber}`);
        }

        return this.parseStudyGuide(content, groupNumber);
    }

    // Get flashcards grouped by section
    groupBySection(flashcards) {
        const grouped = {};
        
        flashcards.forEach(card => {
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

        return grouped;
    }
}

// Main function to generate flashcards
async function generateFlashcards() {
    const parser = new FlashcardParser();
    const allGroups = {};
    const flashcardsDir = 'flashcards';

    // Create flashcards directory if it doesn't exist
    if (!fs.existsSync(flashcardsDir)) {
        fs.mkdirSync(flashcardsDir, { recursive: true });
    }

    console.log('Generating flashcards for all groups...\n');

    // Process each group
    for (let groupNum = 1; groupNum <= 6; groupNum++) {
        try {
            console.log(`Processing Group ${groupNum}...`);
            const flashcards = await parser.loadGroupFlashcards(groupNum);
            
            // Group by section for better organization
            const grouped = parser.groupBySection(flashcards);
            
            // Create structured data
            const groupData = {
                group: groupNum,
                totalCards: flashcards.length,
                sections: Object.keys(grouped).map(sectionKey => {
                    const section = grouped[sectionKey];
                    return {
                        section: section.section,
                        subsections: Object.keys(section.subsections).map(subKey => {
                            const sub = section.subsections[subKey];
                            return {
                                subsection: sub.subsection,
                                cardCount: sub.cards.length,
                                cards: sub.cards.map(card => ({
                                    id: `${groupNum}-${card.section}-${card.subsection}-${card.title}`.replace(/[^a-zA-Z0-9-]/g, '-'),
                                    title: card.title,
                                    front: card.front,
                                    back: card.back,
                                    type: card.type,
                                    section: card.section,
                                    subsection: card.subsection
                                }))
                            };
                        })
                    };
                }),
                allCards: flashcards.map(card => ({
                    id: `${groupNum}-${card.section}-${card.subsection}-${card.title}`.replace(/[^a-zA-Z0-9-]/g, '-'),
                    title: card.title,
                    front: card.front,
                    back: card.back,
                    type: card.type,
                    section: card.section,
                    subsection: card.subsection
                }))
            };

            // Save individual group file
            const groupFileName = path.join(flashcardsDir, `group_${groupNum}_flashcards.json`);
            fs.writeFileSync(groupFileName, JSON.stringify(groupData, null, 2), 'utf-8');
            console.log(`  ✓ Saved ${flashcards.length} flashcards to ${groupFileName}`);

            // Store for combined file
            allGroups[groupNum] = groupData;
        } catch (error) {
            console.error(`  ✗ Error processing Group ${groupNum}:`, error.message);
        }
    }

    // Save combined file with all groups
    const allGroupsFile = path.join(flashcardsDir, 'all_groups_flashcards.json');
    fs.writeFileSync(allGroupsFile, JSON.stringify(allGroups, null, 2), 'utf-8');
    console.log(`\n✓ Saved combined flashcards to ${allGroupsFile}`);

    // Generate summary
    const summary = {
        generatedAt: new Date().toISOString(),
        totalGroups: Object.keys(allGroups).length,
        groups: Object.keys(allGroups).map(g => ({
            group: parseInt(g),
            totalCards: allGroups[g].totalCards,
            sections: allGroups[g].sections.length
        }))
    };

    const summaryFile = path.join(flashcardsDir, 'summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2), 'utf-8');
    console.log(`✓ Saved summary to ${summaryFile}\n`);

    console.log('Flashcard generation complete!');
    console.log(`Total groups processed: ${summary.totalGroups}`);
    console.log(`Total flashcards: ${summary.groups.reduce((sum, g) => sum + g.totalCards, 0)}`);
}

// Run the generator
generateFlashcards().catch(console.error);





