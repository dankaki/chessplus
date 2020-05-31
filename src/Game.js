import React from 'react';
import InitStage from './InitStage'
import GameStage from './GameStage'
import './css/main.css'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {squares : Array(64).fill(null), toRender: "InitWhite"}
    }


    handleDone(stage_squares, reversed) {
        let game_squares = this.state.squares.slice()
        if (reversed) {
            game_squares = [...stage_squares.slice(0,32), ...game_squares.slice(32,64)]
        }
        else{
            game_squares = [...game_squares.slice(0,32), ...stage_squares.slice(32,64)]
        }
        this.setState({squares : game_squares})
        if(this.state.toRender === "InitWhite"){
            this.setState({toRender : "InitBlack"})
        }
        else if (this.state.toRender === "InitBlack"){
            this.setState({toRender : "GameStage"})
        }
    }

    render() {
        let stage = null
        switch(this.state.toRender){
            case "InitWhite":
                stage = <InitStage key="init-white" reversed = {true} handleDone = {(a,b) => this.handleDone(a,b)}></InitStage>
                break;
            case "InitBlack":
                stage = <InitStage key="init-black" reversed = {false} handleDone = {(a,b) => this.handleDone(a,b)}></InitStage>
                break;
            case "GameStage":
                stage = <GameStage key="game-stage" squares = {this.state.squares.slice()}></GameStage>
                break;
        }

        return(
            <div class = "game">
                {stage}
            </div>
        )
    }
}

export default Game;