import { io } from 'socket.io-client';
import './App.css'
import { useEffect, useState } from 'react';
import Input from './components/Input';

function App() {

const [score, setScore] = useState({});

const socket = io('http://localhost:4000');

const connectionSocket = () => {
  socket.on('connect', (socket) => {
    console.log('Connected to server', socket);
  }); 
}


const inputHandler = (e) => {
  e.preventDefault(e);
  let {name, value } = e.target;
  // console.log({[name]: value });
  let currentObj = {[name]: value};
  setScore((prev) => ({...prev, ...currentObj}));
}

const sendScore = () => {
  
  socket.emit('score', score);
  socket.on('playerScore', (playerScore) => {
    console.log(playerScore);
  });
}

useEffect(() => {
 connectionSocket();
},[])

  return (
   <>
    <h1>Multiplayer score dashboard </h1>
    <Input name = 'name' placeholder='Enter your name' onChange={inputHandler} />
    <Input name = 'score' placeholder='Enter your score' onChange={inputHandler} />
    <button className = 'send-score' onClick={sendScore}>Publish score</button>
   </>
  )
}

export default App
