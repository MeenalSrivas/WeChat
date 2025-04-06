const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById("messageInp");
const messageContainer = document.querySelector('.container');


//What happens when the form is submitted

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = ''
})

const audio = new Audio("message-notification-190034.mp3")
// Function to append messages to the container
const append = (message, position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position =='left'){
        audio.play();
    }

}

// Get user's name and emit the new-user-joined event with the name as a string
const name = prompt("Enter your name to join");

socket.emit("new-user-joined", name);

socket.on("user-joined",name =>{
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
});


socket.on('left', name =>{
    append(`${name} left the chat`, 'left');
});




      




