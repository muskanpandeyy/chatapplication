




















// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:3000');

// Handle incoming messages
ws.onmessage = (event) => {
    let messageData = event.data;

    // Check if the message is a Blob
    if (messageData instanceof Blob) {
        // Convert Blob to text
        const reader = new FileReader();
        reader.onload = function() {
            const messages = document.getElementById('messages');
            const message = document.createElement('div');
            message.textContent = reader.result;
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
        };
        reader.readAsText(messageData);
    } else {
        // Handle text messages directly
        const messages = document.getElementById('messages');
        const message = document.createElement('div');
        message.textContent = messageData;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
    }
};

// Send a message when the button is clicked
document.getElementById('sendButton').onclick = () => {
    const input = document.getElementById('messageInput');
    const message = input.value;
    if (message) {
        ws.send(message);
        input.value = ''; // Clear the input field
    }
};

// Send a message when the Enter key is pressed
document.getElementById('messageInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('sendButton').click();
    }
});
