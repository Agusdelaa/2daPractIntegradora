// const socket = io();

// function sendMessage(user) {
//     const message = document.querySelector('#message');
//     if (message.value) {
//         socket.emit('message', user, message.value);
//         message.value = '';
//     }
// }

// socket.on('messages', messages => {
//     const chat = document.querySelector('#chat');
//     chat.innerHTML = '';
//     messages.forEach(message => {
//         const date = new Date(message.date).toLocaleDateString();
//         const hour = new Date(message.date).toLocaleTimeString();
//         chat.innerHTML += `<p>${date} ${hour} ${message.user.first_name} ${message.user.last_name} dijo: ${message.message}</p>`
//     });
// });