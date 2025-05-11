document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const cursor = document.getElementById('cursor');
    
    // Terminal commands and responses
    const conversation = [
        { type: 'command', text: 'user@server:~$ whoami' },
        { type: 'output', text: 'YourName - Full Stack Developer' },
        { type: 'command', text: 'user@server:~$ ls skills/' },
        { type: 'output', text: 'javascript.js python.py react.jsx vue.vue node.js' },
        { type: 'command', text: 'user@server:~$ cat contact_info.txt' },
        { type: 'output', text: 'Email: your.email@example.com' },
        { type: 'output', text: 'Location: Your City, Country' },
        { type: 'command', text: 'user@server:~$' }
    ];
    
    // Initial delay before starting animation
    setTimeout(() => {
        typeConversation(conversation, 0);
    }, 500);
    
    // Function to type out the entire conversation
    function typeConversation(conversation, index) {
        if (index >= conversation.length) return;
        
        const item = conversation[index];
        const element = document.createElement('p');
        element.className = item.type;
        terminal.appendChild(element);
        
        // Move cursor to the new element
        if (cursor.parentNode) {
            terminal.removeChild(cursor.parentNode);
        }
        element.appendChild(cursor);
        
        // Type the text character by character
        typeText(element, item.text, 0, () => {
            // When typing is complete, move to the next item
            let delay = item.type === 'command' ? 300 : 500;
            setTimeout(() => {
                typeConversation(conversation, index + 1);
            }, delay);
        });
    }
    
    // Function to type text with a typewriter effect
    function typeText(element, text, index, callback) {
        if (index >= text.length) {
            callback();
            return;
        }
        
        const currentText = text.substring(0, index + 1);
        element.innerHTML = currentText;
        element.appendChild(cursor);
        
        // Random typing speed for more realistic effect
        const randomSpeed = Math.floor(Math.random() * 40) + 30;
        
        setTimeout(() => {
            typeText(element, text, index + 1, callback);
        }, randomSpeed);
    }
    
    // Add fade-in animation to bio sections
    const bioSections = document.querySelectorAll('.bio p, .project-section');
    bioSections.forEach((section, index) => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.classList.add('fade-in');
        }, 300 + (index * 200));
    });
});