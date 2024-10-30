const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

let playerScore = [];

io.on('connection', (socket) => {
    socket.on('score', (score) => {
      playerScore.push(score);
      //socket.emit('playerScore', playerScore);
      setInterval(() => {
        socket.emit('playerScore', playerScore);
      }, 5000);
    });
  });
  

httpServer.listen(4000, () => {
    console.log('Server is running on port 4000');
});
