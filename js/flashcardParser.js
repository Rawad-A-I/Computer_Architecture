// Flashcard Parser - Extracts key points from study guides and creates flashcards

class FlashcardParser {
    constructor() {
        this.flashcards = [];
    }

    // Parse study guide markdown into flashcards
    parseStudyGuide(content, groupNumber) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:9',message:'parseStudyGuide entry',data:{groupNumber,contentLength:content.length,lineCount:content.split('\n').length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        const lines = content.split('\n');
        const flashcards = [];
        
        let currentSection = '';
        let currentSubsection = '';
        let currentCard = null;
        let inCard = false;
        let cardType = 'concept'; // 'concept', 'definition', 'list', 'example'

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:20',message:'Processing line',data:{lineNum:i,line:line.substring(0,50),currentSection,currentSubsection,inCard,hasCurrentCard:!!currentCard,currentCardType:currentCard?.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion

            // Skip table of contents and separators
            if (line.startsWith('## Table of Contents') || 
                line.startsWith('**Chapter') ||
                line.length === 0) {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:23',message:'Skipping line',data:{line,reason:line.startsWith('## Table of Contents')?'toc':line.startsWith('**Chapter')?'chapter':line.length===0?'empty':'other',hasCurrentCard:!!currentCard},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                // #endregion
                continue;
            }
            
            // Handle separators - don't skip, but don't break card collection either
            if (line === '---') {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:31',message:'Found separator',data:{hasCurrentCard:!!currentCard,inCard},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                // #endregion
                // Don't break card collection on separator, just continue
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
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:52',message:'Saving card before new sub-subsection',data:{title:currentCard.title,backLength:currentCard.back?.length||0,pointsCount:currentCard.points.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
                    // #endregion
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
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:75',message:'Bold text check',data:{line,hasMatch:!!boldMatch,match1:boldMatch?.[1],match2:boldMatch?.[2],hasCurrentCard:!!currentCard},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            if (boldMatch) {
                // Save previous card
                if (currentCard) {
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:78',message:'Saving previous card before new bold',data:{prevCardTitle:currentCard.title,prevCardBack:currentCard.back?.substring(0,100),prevCardType:currentCard.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                    // #endregion
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
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:93',message:'Created bold card',data:{title:currentCard.title,back:currentCard.back,hasBack:!!currentCard.back},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                // #endregion
                inCard = true;
                continue;
            }
            
            // Check for bold text without description on same line (e.g., **Hardwired Systems:**)
            const boldHeaderMatch = line.match(/^\*\*(.+?):\*\*\s*$/);
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:103',message:'Bold header check',data:{line,hasMatch:!!boldHeaderMatch,match1:boldHeaderMatch?.[1],hasCurrentCard:!!currentCard},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
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
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:115',message:'Created bold header card',data:{title:currentCard.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                // #endregion
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
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:121',message:'Bullet point check',data:{line,hasMatch:!!bulletMatch,hasCurrentCard:!!currentCard,currentCardType:currentCard?.type,currentCardTitle:currentCard?.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
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
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:135',message:'Created new list card for bullet',data:{title:currentCard.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                    // #endregion
                    inCard = true;
                }
                currentCard.points.push(bulletMatch[1]);
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:137',message:'Added bullet point',data:{point:bulletMatch[1].substring(0,50),totalPoints:currentCard.points.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                // #endregion
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
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:162',message:'Regular text processing',data:{line:line.substring(0,50),cardType:currentCard.type,hasPoints:currentCard.points.length>0,currentBackLength:currentCard.back?.length||0,willAdd:true},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                // Skip only if it's a pure list card (type is list, has points, and no back text)
                const isPureList = currentCard.type === 'list' && currentCard.points.length > 0 && !currentCard.back;
                if (!isPureList) {
                    if (currentCard.back) {
                        currentCard.back += ' ' + line;
                        // #region agent log
                        fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:169',message:'Appended to card back',data:{newBackLength:currentCard.back.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
                        // #endregion
                    } else {
                        currentCard.back = line;
                        // #region agent log
                        fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:172',message:'Set initial card back',data:{backLength:currentCard.back.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
                        // #endregion
                    }
                }
            }
        }

        // Save last card
        if (currentCard) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:174',message:'Saving last card',data:{title:currentCard.title,backLength:currentCard.back?.length||0,pointsCount:currentCard.points.length,type:currentCard.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            flashcards.push(currentCard);
        }

        // Process cards to format back content
        flashcards.forEach((card, idx) => {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:179',message:'Processing card before format',data:{index:idx,title:card.title,type:card.type,backLength:card.back?.length||0,pointsCount:card.points.length,backPreview:card.back?.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
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
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:189',message:'Card after format',data:{index:idx,title:card.title,backLength:card.back?.length||0,backPreview:card.back?.substring(0,150),type:card.type},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
        });

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/f7fb0275-9700-4f0e-b7e7-948c183aac46',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'flashcardParser.js:188',message:'parseStudyGuide exit',data:{totalCards:flashcards.length,cardsWithBack:flashcards.filter(c=>c.back).length,cardsWithPoints:flashcards.filter(c=>c.points.length>0).length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return flashcards;
    }

    // Load flashcards for a group
    async loadGroupFlashcards(groupNumber) {
        try {
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
                const filePath = `Studying guides/${fileName}`;
                try {
                    const response = await fetch(filePath);
                    if (response.ok) {
                        content = await response.text();
                    }
                } catch (e) {
                    console.warn(`Failed to load ${filePath}:`, e);
                }
            }

            // Try alternative files for group 3
            if (!content && groupNumber === 3 && alternativeFiles[3]) {
                for (const altFile of alternativeFiles[3]) {
                    try {
                        const response = await fetch(`Studying guides/${altFile}`);
                        if (response.ok) {
                            const altContent = await response.text();
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
        } catch (error) {
            console.error('Error loading flashcards:', error);
            throw error;
        }
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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlashcardParser;
}

