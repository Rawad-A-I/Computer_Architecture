# Flashcards JSON Files

This directory contains pre-generated flashcard JSON files for all study guide groups.

## Files

- **`group_X_flashcards.json`** - Individual flashcard files for each group (1-6)
- **`all_groups_flashcards.json`** - Combined file with all groups
- **`summary.json`** - Summary statistics of all flashcards

## JSON Format

Each group file has the following structure:

```json
{
  "group": 1,
  "totalCards": 159,
  "sections": [
    {
      "section": "Introduction and Core Concepts",
      "subsections": [
        {
          "subsection": "The Program Concept",
          "cardCount": 6,
          "cards": [
            {
              "id": "unique-card-id",
              "title": "Card Title",
              "front": "Front side text",
              "back": "Back side text or numbered list",
              "type": "definition|list|concept|principle",
              "section": "Section name",
              "subsection": "Subsection name"
            }
          ]
        }
      ]
    }
  ],
  "allCards": [ /* All cards in a flat array */ ]
}
```

## Card Types

- **`definition`** - Term/definition pairs
- **`list`** - Cards with numbered bullet points
- **`concept`** - Conceptual explanations
- **`principle`** - Key principles or insights

## Regenerating Flashcards

To regenerate flashcards from the study guides, run:

```bash
node generate_flashcards.js
```

This will:
1. Parse all study guide markdown files
2. Extract key concepts, definitions, and lists
3. Generate structured flashcards
4. Save them as JSON files in this directory

## Usage in Application

The flashcard manager automatically loads from these JSON files for faster performance. If JSON files are not available, it falls back to parsing markdown files on-the-fly.

## Statistics

As of the last generation:
- **Total Groups**: 6
- **Total Flashcards**: 1,242
- **Group 1**: 159 cards, 10 sections
- **Group 2**: 207 cards, 12 sections
- **Group 3**: 162 cards, 11 sections
- **Group 4**: 271 cards, 15 sections
- **Group 5**: 212 cards, 12 sections
- **Group 6**: 231 cards, 13 sections





