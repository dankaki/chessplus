import React from 'react';
import Board from './Board'
import './css/main.css'


function App() {
  return (
    <div className="App">
      <h1>Welcome to Chess Plus!</h1>
      <div padding="0">
        <Board reversed = {true}></Board>
      </div>
    </div>
  );
}

export default App;
