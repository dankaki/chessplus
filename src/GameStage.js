import React from 'react';
import './css/main.css'
import Board from './Board'

class GameStage extends React.Component{
    render(){
        return(
            <Board squares = {this.props.squares}></Board>
        )
    }
}

export default GameStage