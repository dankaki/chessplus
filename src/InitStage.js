import React from 'react';
import InitBoard from './InitBoard'
import './css/main.css'

class InitStage extends React.Component {
    constructor(props) {
        super(props);
        this.board = React.createRef();
    }

    toDefault(){
        this.board.current.loadPieces()
    }

    render(){
        return(
            <div class = "init-stage">
                <h2>Arrange your pieces</h2>
                <InitBoard ref={this.board} reversed = "true"></InitBoard>
                <div display = "table" >
                    <button class = "menu-button">Done!</button>
                    <button class = "menu-button" onClick = {() => this.toDefault()}>To default</button>
                </div>
                
                
            </div>
        )
    }
}

export default InitStage