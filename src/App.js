import React from 'react';
import Board from './Board'
import InitBoard from './InitBoard'
import InitStage from './InitStage'
import './css/main.css'


function App() {
  return (
    <div className="App">
      <h1>Welcome to Chess Plus!</h1>
      <div padding="0">
        <InitStage></InitStage>
      </div>
    </div>
  );
}

export default App;
