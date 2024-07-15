const chatForm = document.getElementById('chat-form');
const charMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');

// Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

socket.emit('joinRoom' , {
    username,
    room
});

socket.on('roomUsers' , ({ room , users }) => {
    outputRoomName(room);
    outputUsers(users);
});


// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get the message
    const msg = e.target.elements.msg.value;
    //Emit message to the server
    socket.emit('chatMessage', msg);
})


// Output message to DOM

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML= `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>
    `;
    document.querySelector('.chat-messages').appendChild(div); // Pass the div object here
}


function outputRoomName(room) {
    roomName.innerHTML = room;
}


function outputUsers(users) {
    usersList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}
