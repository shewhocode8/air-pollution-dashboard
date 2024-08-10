// chat.js

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const chatIcon = document.getElementById('chat-icon');
    const chatExpand = document.getElementById('chat-expand');
    const chatMinimize = document.getElementById('chat-minimize');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendButton = document.querySelector('.chat-input button');
    const messagesContainer = document.querySelector('.messages');

    chatExpand.addEventListener('click', () => {
        chatBox.style.display = 'flex';
        chatIcon.style.display = 'none';
    });

    chatMinimize.addEventListener('click', () => {
        chatBox.style.display = 'none';
        chatIcon.style.display = 'block';
    });

    function appendMessage(text, isUser = true) {
        const message = document.createElement('div');
        message.className = isUser ? 'message user-message' : 'message bot-message';
        message.textContent = text;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the bottom
    }

    function getBotResponse(input) {
        const responses = {
            'hello': 'Magandang araw! Paano ako makakatulong?',
            'how are you': 'Ako po ay isang bot na maaring maging sa inyo ng ilang impormasyo.',
            'ano ang polusyon sa hangin?': 'Ang polusyon sa hangin ay ang presensya ng mga mapanganib na substansiya sa hangin na ating nilalanghap. Ito ay mula sa mga emisyon ng sasakyan, mga gawaing pang-industriya, at mga likas na pangyayari.',
            'default': 'Paumanhin, hindi ko maintindihan ang inyong katanungan. Mayroon po ba kayong ibang katangungan?'
        };
        return responses[input.toLowerCase()] || responses['default'];
    }

    chatSendButton.addEventListener('click', () => {
        const userInput = chatInput.value.trim();
        if (userInput) {
            appendMessage(userInput);
            chatInput.value = '';
            const botResponse = getBotResponse(userInput);
            setTimeout(() => appendMessage(botResponse, false), 500); // Simulate delay
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSendButton.click();
        }
    });
});
