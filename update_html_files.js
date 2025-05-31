// This is a Node.js script to update all HTML files to include sidebar CSS and JS
// Usage: Run with node update_html_files.js

const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const directory = './';

// Read all files in the directory
fs.readdir(directory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter for HTML files
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(directory, file);
        
        // Read the file content
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }

            // Check if the file uses sidebar.css
            if (content.includes('sidebar.css')) {
                // Check if colors.css is already included
                if (!content.includes('colors.css')) {
                    // Add colors.css after sidebar.css
                    const updatedContent = content.replace(
                        /<link rel="stylesheet" href="sidebar.css">/,
                        '<link rel="stylesheet" href="sidebar.css">\n  <link rel="stylesheet" href="colors.css">'
                    );

                    // Write the updated content back to the file
                    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
                        if (err) {
                            console.error(`Error writing to file ${file}:`, err);
                            return;
                        }
                        console.log(`Updated ${file}`);
                    });
                }
            }
        });
    });
});

// Function to add sidebar script to HTML files
function addSidebarScript(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if the script is already added
        if (content.includes('javascript_sidebar.js')) {
            console.log(`Script already exists in ${filePath}`);
            return;
        }

        // Add the script before the closing body tag
        content = content.replace(
            '</body>',
            '    <script src="javascript_sidebar.js"></script>\n</body>'
        );

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added sidebar script to ${filePath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Get all HTML files in the current directory
const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.html') && file !== 'index.html');

// Process each HTML file
files.forEach(file => {
    addSidebarScript(file);
}); 