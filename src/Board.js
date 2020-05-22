import React from 'react'
import Square from './Square'
import Piece from './Piece'
import './css/board.css'

class Board extends React.Component {

    constructor(props){
        super(props)
        this.state = {squares: Array(64).fill(null)}
    }

    renderSquare(i){
        return <Square value = {i}/>;
    }

    renderRow(n){
        let row = []

        for (let index = 0; index < 8; index++) {
            row.push(n*8 + index)
        }
        let rowItems = row.map((i) => this.renderSquare(i))
        rowItems.unshift(<div id={"num"+String(n)+"l"} className="num-square">{n+1}</div>)
        rowItems.push(<div id={"num"+String(n)+"r"} className="num-square">{n+1}</div>)
        return(
            <div className="board-row">{rowItems}</div>
        )
    }

    renderAlpha(pos){
        const row = ['','A','B','C','D','E','F','G','H']
        const alpha = row.map((a) => <div className = "alpha-square">{a}</div>)
        return(
            <div id = {"alpha-"+pos} className="alpha-row">{alpha}</div>
        )
    }

    renderPieces(){
        //const offsets = [40,80,120,160,200,240,280,320]
        const pawn_w = [0,1,2,3,4,5,6,7].map((i) => <Piece id_val = {"pawn_w_"+i} class_val = "piece pawn_w"></Piece>)
        const bishop_w = [0,1].map((i) => <Piece id_val = {"bishop_w_"+i} class_val = "piece bishop_w"></Piece>)
        const king_w = <Piece id_val = "king_w" class_val = "piece king_w"></Piece>
        const knight_w = [0,1].map((i) => <Piece id_val = {"knight_w_"+i} class_val = "piece knight_w"></Piece>)
        const queen_w = <Piece id_val = "queen_w" class_val = "piece queen_w"></Piece>
        const rook_w = [0,1].map((i) => <Piece id_val = {"rook_w_"+i} class_val = "piece rook_w"></Piece>)
        return [...pawn_w, ...bishop_w, king_w, ...knight_w, queen_w, ...rook_w]
    }

    movePieces(){
        const pawn_offsets = [40,80,120,160,200,240,280,320]
        const bishop_offsets = [120, 240]
        const knight_offsets = [80, 280]
        const rook_offsets = [40, 320]

        const pawn_w_id = [0,1,2,3,4,5,6,7].map((i) => "pawn_w_"+i)
        for (let i = 0; i < 8; i++){
            let piece = document.getElementById(pawn_w_id[i])
            piece.style.top = "80px"
            piece.style.left = pawn_offsets[i] + "px"
        }
        const bishop_w_id = [0,1].map((i) => "bishop_w_"+i)
        for (let i = 0; i < 2; i++){
            let piece = document.getElementById(bishop_w_id[i])
            piece.style.top = "40px"
            piece.style.left = bishop_offsets[i] + "px"
        }
        const king_w = document.getElementById("king_w")
        king_w.style.top = "40px"
        king_w.style.left = "160px"
        const knight_w_id = [0,1].map((i) => "knight_w_"+i)
        for (let i = 0; i < 2; i++){
            let piece = document.getElementById(knight_w_id[i])
            piece.style.top = "40px"
            piece.style.left = knight_offsets[i] + "px"
        }
        const queen_w = document.getElementById("queen_w")
        queen_w.style.top = "40px"
        queen_w.style.left = "200px"
        const rook_w_id = [0,1].map((i) => "rook_w_"+i)
        for (let i = 0; i < 2; i++){
            let piece = document.getElementById(rook_w_id[i])
            piece.style.top = "40px"
            piece.style.left = rook_offsets[i] + "px"
        }
    }

    componentDidMount() {
        this.movePieces()
    }

    render() {
        let board = [this.renderAlpha("top")]
        for (let n = 0; n < 8; n++){
            board.push(this.renderRow(n))
        }
        board.push(this.renderAlpha("bot"))
        const pieces = this.renderPieces()
        return(
            <div className = "Board">
                {board}
                {pieces}
            </div>
        )
    }
  }

  export default Board;