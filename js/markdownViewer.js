// Markdown Viewer - Parses and displays markdown content

class MarkdownViewer {
    constructor() {
        // Simple markdown parser for basic formatting
    }

    // Parse markdown to HTML
    parseMarkdown(markdown) {
        let html = markdown;

        // Escape HTML first
        html = this.escapeHtml(html);

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        html = html.replace(/`(.+?)`/g, '<code>$1</code>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Lists
        html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
        html = html.replace(/^- (.+)$/gim, '<li>$1</li>');
        html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');

        // Wrap consecutive list items in ul/ol
        html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
            return '<ul>' + match + '</ul>';
        });

        // Paragraphs (lines that aren't already HTML tags)
        html = html.split('\n').map(line => {
            line = line.trim();
            if (!line) return '';
            if (line.startsWith('<')) return line; // Already HTML
            if (line.match(/^<[h|u|o|l|p|d]/)) return line; // Already HTML tag
            return '<p>' + line + '</p>';
        }).join('\n');

        // Horizontal rules
        html = html.replace(/^---$/gim, '<hr>');

        // Line breaks
        html = html.replace(/\n\n/g, '<br><br>');

        return html;
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load and display markdown file
    async loadAndDisplay(filePath, anchor = null) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load file: ${filePath}`);
            }
            
            let content = await response.text();
            
            // If anchor is provided, extract that section
            if (anchor) {
                content = this.extractSection(content, anchor);
            }
            
            const html = this.parseMarkdown(content);
            return html;
        } catch (error) {
            console.error('Error loading markdown:', error);
            return `<p class="error">Error loading study guide: ${error.message}</p>`;
        }
    }

    // Extract a specific section from markdown based on anchor
    extractSection(content, anchor) {
        if (!anchor) {
            return content; // Return full content if no anchor
        }

        // Convert anchor to header format (e.g., "instruction-cycle" -> "Instruction Cycle")
        const headerPattern = anchor.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        // Try to find the section
        const lines = content.split('\n');
        let inSection = false;
        let sectionLines = [];
        let sectionLevel = 0;
        let foundHeader = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Check if this is a header
            const headerMatch = line.match(/^(#{1,6})\s+(.+)$/i);
            if (headerMatch) {
                const headerText = headerMatch[2].trim();
                const currentLevel = headerMatch[1].length;
                
                // Normalize for comparison
                const normalizedHeader = headerText.toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                const normalizedAnchor = headerPattern.toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                
                // Check if this is our target header
                if (normalizedHeader === normalizedAnchor || 
                    normalizedHeader.includes(normalizedAnchor) || 
                    normalizedAnchor.includes(normalizedHeader)) {
                    inSection = true;
                    foundHeader = true;
                    sectionLevel = currentLevel;
                    sectionLines = [line];
                    continue;
                }
                
                // Check if we've hit a header at same or higher level (end of section)
                if (inSection && foundHeader) {
                    if (currentLevel > 0 && currentLevel <= sectionLevel) {
                        break; // End of our section
                    }
                }
            }
            
            if (inSection && foundHeader) {
                sectionLines.push(line);
            }
        }
        
        // If we found a section, return it; otherwise return full content
        return sectionLines.length > 0 ? sectionLines.join('\n') : content;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarkdownViewer;
}

