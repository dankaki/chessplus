import React from 'react';
import './css/main.css'
import Board from './Board'

class GameStage extends React.Component{

    constructor(props) {
        super(props);
        this.board = React.createRef();
    }

    reverse(){
        this.board.current.reverse()
    }

    setPieces(){
        this.board.current.setPieces(this.board.current.state.squares)
    }

    render(){
        return(
            <div>
                <h2>Play!</h2>
                <Board ref={this.board} reversed = {true} squares = {this.props.squares}></Board>
                <button class = "menu-button" onClick = {() => this.reverse()}>Reverse!</button>
                <button class = "menu-button" onClick = {() => this.setPieces()}>Set</button>
            </div>
            
        )
    }
}

export default GameStage