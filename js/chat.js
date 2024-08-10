// chat.js

document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const chatIcon = document.getElementById('chat-icon');
    const chatExpand = document.getElementById('chat-expand');
    const chatMinimize = document.getElementById('chat-minimize');

    // Show chat box when expand button is clicked
    chatExpand.addEventListener('click', function() {
        chatBox.style.display = 'flex';
        chatIcon.style.display = 'none';
    });

    // Hide chat box when minimize button is clicked
    chatMinimize.addEventListener('click', function() {
        chatBox.style.display = 'none';
        chatIcon.style.display = 'flex';
    });

    // Handle sending messages
    const sendMessageButton = chatBox.querySelector('.chat-input button');
    const messageInput = chatBox.querySelector('.chat-input input');
    const messagesContainer = chatBox.querySelector('.messages');

    sendMessageButton.addEventListener('click', function() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.textContent = messageText;
            messageElement.className = 'message';
            messagesContainer.appendChild(messageElement);
            messageInput.value = ''; // Clear the input field
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }
    });

    // Handle Enter key for sending messages
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessageButton.click();
        }
    });
});
