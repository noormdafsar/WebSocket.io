import { io } from 'socket.io-client';
import './App.css'
import { useEffect, useState } from 'react';
import Input from './components/Input';
import { v4 as uuidv4 } from 'uuid';


function App() {

const [score, setScore] = useState({name: '', score: ''});
const [displayScore, setDisplayScore] = useState([]);
const [editScore, setEditScore] = useState(false);

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
  
  socket.emit('score', {...score, id: uuidv4()});
  socket.on('playerScore', (playerScore) => {
   // console.log('playerScore', playerScore);
    setDisplayScore(playerScore);
    setScore({
      name: '',
      score: ''
    });
  });
}

const getEditData = (score) => {
  console.log('score', score);
  setScore(score);
  setEditScore(true);
}

const handleEdit = () => {
  console.log('editScore', score);
  socket.emit('editScore', score);
  socket.on('playerScore', (playerScore) => {
    // console.log('playerScore', playerScore);
    setDisplayScore(playerScore);
    setScore({
      name: '',
      score: ''
    });
    setEditScore(false);
  });
}

const handleDeleteData = (id) => {
  socket.emit('deleteScore', id); 
  socket.on('playerScore', (playerScore) => {
    // console.log('playerScore', playerScore);
    setDisplayScore(playerScore);
    setScore({
      name: '',
      score: '',
    })
  });
}

useEffect(() => {
 connectionSocket();
},[])

  return (
   <>
    <h1>Multiplayer score dashboard </h1>
    <Input name = 'name'
     placeholder='Enter your name'
    onChange={inputHandler}
    value={score.name || ''}
     />
    <Input name = 'score'
    placeholder='Enter your score' 
    onChange={inputHandler} 
    value={score.score || ''}
    />
    <button className = 'send-score' onClick={editScore ? handleEdit : sendScore}>{editScore ? 'edit' : 'Publish score'}</button>

    {Object.keys(displayScore).length > 0 ?
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      {displayScore.map((score, index) => {
        return (
          <tr key={index}>
            <td>{score?.name}</td>
            <td>{score?.score}</td>
            <td>
              <button onClick={() => {
                getEditData(score)
              }
            }>
            Edit
            </button>
            </td>
            <td>
              <button onClick={ ()=>{
                handleDeleteData(score?.id)
                }
              }>
              Delete
              </button>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table> : <></>
    }
   </>
  )
}

export default App
