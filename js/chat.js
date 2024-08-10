document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const chatIcon = document.getElementById('chat-icon');
    const chatExpand = document.getElementById('chat-expand');
    const chatMinimize = document.getElementById('chat-minimize');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    const messagesContainer = document.querySelector('.messages');

    // Show chat box when chat icon is clicked
    chatExpand.addEventListener('click', function() {
        chatBox.style.display = 'block';
        chatIcon.style.display = 'none'; // Hide chat icon when chat box is open
    });

    // Minimize chat box when minimize button is clicked
    chatMinimize.addEventListener('click', function() {
        chatBox.style.display = 'none';
        chatIcon.style.display = 'block'; // Show chat icon when chat box is minimized
    });

    // Send message when "Send" button is clicked
    sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('You', message);
            chatInput.value = ''; // Clear input field
        }
    });

    // Send message when Enter key is pressed
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            sendButton.click(); // Trigger the send button click
        }
    });

    // Function to add a new message to the chat
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    }
});
