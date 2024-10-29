const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer();

const socket = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

socket.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('Message', (response) => {
      console.log('Message from client:', response);
  });
  
    socket.emit('Message', 'Hello from server, I am good, how are you?');

});

httpServer.listen(4000, () => {
    console.log('Server is running on port 4000');
});
