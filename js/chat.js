document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const chatIcon = document.getElementById('chat-icon');
    const chatExpandButton = document.getElementById('chat-expand');
    const chatMinimizeButton = document.getElementById('chat-minimize');

    chatExpandButton.addEventListener('click', function() {
        chatBox.style.display = 'block';
        chatIcon.style.display = 'none'; // Hide chat icon when chat box is open
    });

    chatMinimizeButton.addEventListener('click', function() {
        chatBox.style.display = 'none';
        chatIcon.style.display = 'block'; // Show chat icon when chat box is minimized
    });
});
