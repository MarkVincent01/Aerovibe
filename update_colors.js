const fs = require('fs');
const path = require('path');

// Function to update a single HTML file
function updateHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add colors.css link if it doesn't exist
        if (!content.includes('colors.css')) {
            content = content.replace(
                /<link rel="stylesheet" href="styles.css">/,
                '<link rel="stylesheet" href="colors.css">\n  <link rel="stylesheet" href="styles.css">'
            );
        }

        // Update color values to use CSS variables
        const colorReplacements = [
            { from: /#000000|#000/g, to: 'var(--primary)' },
            { from: /#ffffff|#fff/g, to: 'var(--background)' },
            { from: /#333333|#333/g, to: 'var(--accent2)' },
            { from: /#666666|#666/g, to: 'var(--text-secondary)' },
            { from: /#999999|#999/g, to: 'var(--text-secondary)' },
            { from: /#cccccc|#ccc/g, to: 'var(--secondary)' },
            { from: /#f5f5f5|#f5f5f7/g, to: 'var(--secondary)' },
            { from: /#0071e3/g, to: 'var(--accent1)' },
            { from: /#1c1c1e/g, to: 'var(--text-primary)' },
            { from: /#6e6e73/g, to: 'var(--text-secondary)' }
        ];

        colorReplacements.forEach(({ from, to }) => {
            content = content.replace(from, to);
        });

        // Update background colors
        content = content.replace(/background-color:\s*#[0-9a-fA-F]{3,6}/g, 'background-color: var(--background)');
        content = content.replace(/background:\s*#[0-9a-fA-F]{3,6}/g, 'background: var(--background)');

        // Update text colors
        content = content.replace(/color:\s*#[0-9a-fA-F]{3,6}/g, 'color: var(--text-primary)');

        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
    }
}

// Get all HTML files in the current directory
const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'));

// Update each HTML file
htmlFiles.forEach(file => {
    updateHtmlFile(file);
});

console.log('Color scheme update completed!'); 