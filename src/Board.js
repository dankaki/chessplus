import React from 'react'
import Square from './Square'
import Piece from './Piece'
import './css/board.css'

class Board extends React.Component {

    constructor(props){
        super(props)
        this.state = {squares: Array(64).fill(null), chosen: null}
    }

    placePiece(piece_id, i){
        // Places the piece. Does not check anything! Does not change the state!
        const piece = document.getElementById(piece_id)
        const row = Math.floor(i / 8)
        const col = i % 8
        let y = (row + 1) * 40;
        let x = (col + 1) * 40;
        if (this.props.reversed) {
            y = 360 - y
            x = 360 - x
        }
        piece.style.top = String(y) + "px"
        piece.style.left = String(x) + "px"
    }

    movePiece(piece_id, i){
        // Moves the piece. Checks if the move is legit.
        let squares = this.state.squares.slice()
        squares[squares.indexOf(piece_id)] = null
        squares[i] = piece_id
        this.setState({squares: squares})
        this.placePiece(piece_id, i)
    }

    handleClick(i){
        if (this.state.chosen) {
            const prev_i = this.state.squares.indexOf(this.state.chosen)
            const square = document.getElementById("square_"+prev_i)
            square.className = square.className.replace(" active-square","")
            if (this.state.squares[i]) {
                alert("You cannot place pieces on top of other pieces")
            }
            else{
                this.movePiece(this.state.chosen, i)
            }
            this.setState({chosen : null})
        }
        else {
            if(this.state.squares[i]){
                const square = document.getElementById("square_"+i)
                square.className = square.className + " active-square"
                this.setState({chosen : this.state.squares[i]})
            }
        }
    }

    renderSquare(i){
        return <Square key = {i} value = {i} onClick = {() => this.handleClick(i)}/>;
    }

    renderRow(n){
        let row = []

        for (let index = 0; index < 8; index++) {
            if (this.props.reversed){
                row.push((7 - n)*8 + (7 - index))
            }
            else{
                row.push(n*8 + index)
            }
        }
        let rowItems = row.map((i) => this.renderSquare(i))
        if (this.props.reversed) {
            rowItems.unshift(<div key={"num"+String(7-n)+"l"} id={"num"+String(7-n)+"l"} className="num-square">{8 - n}</div>)
            rowItems.push(<div key={"num"+String(7-n)+"r"} id={"num"+String(7-n)+"r"} className="num-square">{8 - n}</div>)
        }
        else{
            rowItems.unshift(<div id={"num"+String(n)+"l"} className="num-square">{n+1}</div>)
            rowItems.push(<div id={"num"+String(n)+"r"} className="num-square">{n+1}</div>)
        }
        
        return(
            <div key={"row_"+n} className="board-row">{rowItems}</div>
        )
    }

    renderAlpha(pos){
        let row = ['A','B','C','D','E','F','G','H']
        if (!this.props.reversed) {
            row = row.reverse()
        }
        row.unshift('')
        const alpha = row.map((a) => <div key = {"alpha_"+pos+"_"+a} id = {"alpha_"+pos+"_"+a} className = "alpha-square">{a}</div>)
        return(
            <div key={"alpha-"+pos} id = {"alpha-"+pos} className="alpha-row">{alpha}</div>
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
        const pieces_w = [...pawn_w, ...bishop_w, king_w, ...knight_w, queen_w, ...rook_w]
        const pawn_b = [0,1,2,3,4,5,6,7].map((i) => <Piece id_val = {"pawn_b_"+i} class_val = "piece pawn_b"></Piece>)
        const bishop_b = [0,1].map((i) => <Piece id_val = {"bishop_b_"+i} class_val = "piece bishop_b"></Piece>)
        const king_b = <Piece id_val = "king_b" class_val = "piece king_b"></Piece>
        const knight_b = [0,1].map((i) => <Piece id_val = {"knight_b_"+i} class_val = "piece knight_b"></Piece>)
        const queen_b = <Piece id_val = "queen_b" class_val = "piece queen_b"></Piece>
        const rook_b = [0,1].map((i) => <Piece id_val = {"rook_b_"+i} class_val = "piece rook_b"></Piece>)
        const pieces_b = [...pawn_b, ...bishop_b, king_b, ...knight_b, queen_b, ...rook_b]
        return [...pieces_w, ...pieces_b]
    }

    loadPieces(){
        // Puts pieces to their classical positions in chess
        let squares = Array(64).fill(null)
        const pawn_w_id = [0,1,2,3,4,5,6,7].map((i) => "pawn_w_"+i)
        const pawn_b_id = [0,1,2,3,4,5,6,7].map((i) => "pawn_b_"+i)
        for (let i = 0; i < 8; i++){
            this.placePiece(pawn_w_id[i], 8 + i)
            squares[8 + i] = "pawn_w_" + i
            this.placePiece(pawn_b_id[i], 63 - (8 + i))
            squares[63 - (8 + i)] = "pawn_b_" + i
            
        }
        
        const bishop_w_id = [0,1].map((i) => "bishop_w_"+i)
        const bishop_b_id = [0,1].map((i) => "bishop_b_"+i)
        for (let i = 0; i < 2; i++){
            this.placePiece(bishop_w_id[i], 2 + i*3)
            squares[2 + i*3] = "bishop_w_" + i
            this.placePiece(bishop_b_id[i], 63 - (2 + i*3))
            squares[63 - (2 + i*3)] = "bishop_b_" + i
        }

        this.placePiece("king_w", 3)
        squares[3] = "king_w"
        this.placePiece("king_b", 63 - 4)
        squares[63 - 4] = "king_b"

        const knight_w_id = [0,1].map((i) => "knight_w_"+i)
        const knight_b_id = [0,1].map((i) => "knight_b_"+i)
        for (let i = 0; i < 2; i++){
            this.placePiece(knight_w_id[i], 1 + 5*i)
            squares[1 + i*5] = "knight_w_" + i;
            this.placePiece(knight_b_id[i], 63 - (1 + 5*i))
            squares[63 - (1 + 5*i)] = "knight_b_" + i;
        } 

        this.placePiece("queen_w", 4)
        squares[4] = "queen_w"
        this.placePiece("queen_b", 63-3)
        squares[63-3] = "queen_b"

        const rook_w_id = [0,1].map((i) => "rook_w_"+i)
        const rook_b_id = [0,1].map((i) => "rook_b_"+i)
        for (let i = 0; i < 2; i++){
            this.placePiece(rook_w_id[i], 7*i)
            squares[i*7] = "rook_w_" + i;
            this.placePiece(rook_b_id[i], 63 - 7*i)
            squares[63 -  i*7] = "rook_b_" + i;
        }

        this.setState({squares: squares});
    }

    setPieces(new_squares) {
        this.setState({squares : new_squares})
        for(let i = 0; i < 64; i++) {
            if (new_squares[i]) {
                this.placePiece(new_squares[i], i)
            }
        }
    }

    componentDidMount() {
        if (this.props.squares) {
            this.setPieces(this.props.squares)
        }
        else {
            this.loadPieces()
        }
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