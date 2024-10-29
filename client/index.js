const socket = io('http://localhost:4000');

socket.on('connect', (response) => {
    console.log(response);
    
});

socket.on('Message', (response) => {
    console.log(response);

    socket.emit('Message', 'Hello...!!!, lets have music jamming session');
});