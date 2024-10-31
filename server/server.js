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
      socket.emit('playerScore', playerScore);
      // setInterval(() => {
      //   socket.emit('playerScore', playerScore);
      // }, 15000);
    });
    socket.on('editScore', (response) => {
      console.log(response);
      let index = playerScore.findIndex(item => item.id === response.id);
      if (index !== -1) {
        playerScore[index] = {
          ...playerScore[index],
          ...response
        };
        socket.emit('playerScore', playerScore);
      }
    });

    socket.on('deleteScore', (id) => {
      let index = playerScore.findIndex(item => item.id === id);
      if (index !== -1) {
        playerScore.splice(index, 1);
        io.emit('playerScore', playerScore);
      }
    });

  });

  

httpServer.listen(4000, () => {
    console.log('Server is running on port 4000');
});
