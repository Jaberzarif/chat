const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message => {
    console.log(message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get the message
    const msg = e.target.elements.msg.value;
    //Emit message to the server
    socket.emit('chatMessage', msg);
})