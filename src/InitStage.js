import React from 'react';
import InitBoard from './InitBoard'
import './css/main.css'

class InitStage extends React.Component {
    constructor(props) {
        super(props);
        this.board = React.createRef();
        this.state = {squares : Array(64).fill(null)}
    }

    toDefault(){
        this.board.current.loadPieces()
    }

    handleDone(){
        const squares = this.board.current.getSquares()
        this.props.handleDone(squares, this.props.reversed)
    }

    render(){
        return(
            <div class = "init-stage">
                <h2>Arrange your pieces</h2>
                <InitBoard key={"init_"+this.props.reversed} ref={this.board} reversed = {this.props.reversed}></InitBoard>
                <div display = "table" >
                    <button key="done" class = "menu-button" onClick = {() => this.handleDone()}>Done!</button>
                    <button key="default" class = "menu-button" onClick = {() => this.toDefault()}>To default</button>
                </div>
                
                
            </div>
        )
    }
}

export default InitStage