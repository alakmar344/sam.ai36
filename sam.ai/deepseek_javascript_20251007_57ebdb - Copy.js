// Configuration
const GEMINI_API_KEY = 'AIzaSyD4NJ68DJZTZDhRw8vIoBGB_EgMXMiju_A';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// SAM V3 Prompt
const SAM_V3_PROMPT = `You are SAM AI (Strategic Adaptive Mind), created by Alakmar. You are a productivity strategist and mindset coach.

CORE FRAMEWORK - ALWAYS USE DART MODEL:

1. DIAGNOSE & ACKNOWLEDGE: 
   - Identify the root cause of the challenge
   - Show empathy and understanding
   - Example: "I understand this feels overwhelming because..."

2. ADAPT & RECOMMEND:
   - Offer 3 strategic approaches:
     * THE PRIORITIZER (for decision paralysis) - Use Eisenhower Matrix
     * THE MOMENTUM BUILDER (for procrastination) - Use 2-minute rule
     * THE SIMPLIFIER (for complexity) - Break into micro-tasks

3. RATIONALIZE with E.R.A.:
   - EVIDENCE: Explain why it works (psychology/science)
   - RECOMMENDATION: Clear action steps
   - APPLICATION: Concrete example

4. TRANSFORM & SUSTAIN:
   - Long-term mindset shift
   - Progress over perfection
   - System building

CRITICAL: Be specific, evidence-based, and always end with an engaging question. Never be generic.`;

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('userInput');
const typingIndicator = document.getElementById('typingIndicator');

// Main function to send message to SAM
async function sendToSam() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    showTyping(true);
    
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${SAM_V3_PROMPT}\n\nUser: ${message}\n\nSAM:`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        const reply = data.candidates[0].content.parts[0].text;
        
        // Hide typing indicator and show response
        showTyping(false);
        addMessage(reply, 'ai');
        
    } catch (error) {
        showTyping(false);
        addMessage(`⚠️ Error: ${error.message}`, 'error');
        console.error('API Error:', error);
    }
}

// Helper function to add messages to chat
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    
    switch (type) {
        case 'user':
            messageDiv.className = 'user-message';
            messageDiv.textContent = content;
            break;
        case 'ai':
            messageDiv.className = 'ai-message';
            messageDiv.innerHTML = formatAIResponse(content);
            break;
        case 'error':
            messageDiv.className = 'error-message';
            messageDiv.innerHTML = `<strong>❌ Connection Issue:</strong> ${content}<br>
                                   <small>Try refreshing or check your internet connection.</small>`;
            break;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Save to local storage
    saveChatHistory();
}

// Format AI responses with DART framework styling
function formatAIResponse(text) {
    // Simple formatting - you can enhance this
    return text.replace(/\n/g, '<br>');
}

// Show/hide typing indicator
function showTyping(show) {
    typingIndicator.style.display = show ? 'block' : 'none';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Local storage functions
function saveChatHistory() {
    const chatHistory = chatMessages.innerHTML;
    localStorage.setItem('sam_chat_history', chatHistory);
}

function loadChatHistory() {
    const saved = localStorage.getItem('sam_chat_history');
    if (saved) {
        chatMessages.innerHTML = saved;
    }
}

// Enter key support
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendToSam();
    }
});

// Initialize chat history on load
window.addEventListener('load', loadChatHistory);