import React from 'react'
import Square from './Square'
import Piece from './Piece'
import {squaresToFEN, indexToAlpha, pieceToSymb} from './ChessNotation'
import './css/board.css'
import Modal from 'react-modal'

const Chess = require('chess.js')
Modal.setAppElement('#root');

const EMPTY_BOARD = "8/8/8/8/8/8/8/8 w - - 0 1"
const DEF_BOARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const pawn_w_id = [0,1,2,3,4,5,6,7].map((i) => "pawn_w_"+i)
const pawn_b_id = [0,1,2,3,4,5,6,7].map((i) => "pawn_b_"+i)
const bishop_w_id = [0,1].map((i) => "bishop_w_"+i)
const bishop_b_id = [0,1].map((i) => "bishop_b_"+i)
const knight_w_id = [0,1].map((i) => "knight_w_"+i)
const knight_b_id = [0,1].map((i) => "knight_b_"+i)
const rook_w_id = [0,1].map((i) => "rook_w_"+i)
const rook_b_id = [0,1].map((i) => "rook_b_"+i)
const king_w_id = "king_w"
const king_b_id = "king_b"
const queen_w_id = "queen_w"
const queen_b_id = "queen_b"
let piece_ids = [...pawn_b_id, ...pawn_w_id, ...bishop_b_id, ...bishop_w_id,
    ...knight_b_id, ...knight_w_id, ...rook_w_id, ...rook_b_id,
    king_b_id, king_w_id, queen_b_id, queen_w_id]


class Board extends React.Component {

    constructor(props){
        super(props)
        let fen = DEF_BOARD
        if (this.props.squares) {
            fen = squaresToFEN(this.props.squares)
        }
        this.state = {squares: Array(64).fill(null), chosen: null,
            fen : fen, chess: new Chess(), reversed : this.props.reversed,
            modal: null, pieces: this.renderPieces()}
    }

    promote(piece_type){
        let pieces = this.state.pieces.slice()
        let squares = this.state.squares.slice()
        let new_key = ""
        let pawn = ""
        let new_piece = null
        const turn = this.state.chess.turn()

        for(let i = 0; i < 12; i++){
            if(!document.getElementById(piece_type + '_' + i)){
                new_key = piece_type + '_' + i
                new_piece = <Piece key = {new_key} id_val = {new_key} class_val = {"piece " + piece_type}></Piece>;
                pieces.push(new_piece)
                piece_ids.push(new_key)
                break;
            }
        }
        
        if (turn === 'w'){
            for(let i = 48; i < 56; i++){
                if(squares[i] && squares[i].indexOf("pawn_w") !== -1){
                    const pawn_id = squares[i]
                    pawn = pieces.find((p) => (p.key === pawn_id))
                    pieces.splice(pieces.indexOf(pawn), 1)
                    piece_ids.splice(piece_ids.indexOf(pawn_id), 1)
                    squares[i] = null
                    squares[i + 8] = new_key
                    this.state.chess.move({from:indexToAlpha(i), to:indexToAlpha(i+8), promotion: pieceToSymb(new_key).toLowerCase()})
                    break;
                }
            }
        }
        else if(turn === 'b'){
            for(let i = 8; i < 16; i++){
                if(squares[i] && squares[i].indexOf("pawn_b") !== -1){
                    const pawn_id = squares[i]
                    pawn = pieces.find((p) => (p.key === pawn_id))
                    pieces.splice(pieces.indexOf(pawn), 1)
                    piece_ids.splice(piece_ids.indexOf(pawn_id), 1)
                    squares[i] = null
                    squares[i - 8] = new_key
                    this.state.chess.move({from:indexToAlpha(i), to:indexToAlpha(i-8), promotion: pieceToSymb(new_key).toLowerCase()})
                    break;
                }
            }
        }
        this.setState({pieces: pieces, squares : squares, modal : null})
        this.reverse()
    }

    reverse(){
        const old = this.state.reversed
        this.setState({reversed : !old})
    }

    placePiece(piece_id, i){
        // Places the piece. Does not check anything! Does not change the state!
        const piece = document.getElementById(piece_id)
        if (i === -1){
            piece.style.top =  "40px"
            piece.style.left = "400px"
            return
        }

        const row = Math.floor(i / 8)
        const col = i % 8
        let y = (row + 1) * 40;
        let x = (col + 1) * 40;
        if (this.state.reversed) {
            y = 360 - y
            x = 360 - x
        }
        piece.style.top = String(y) + "px"
        piece.style.left = String(x) + "px"
    }

    movePiece(piece_id, to){
        // Moves the piece. Checks if the move is legit.
        let squares = this.state.squares.slice()
        const from = squares.indexOf(piece_id)
        const turn = this.state.chess.turn()
        if(piece_id.indexOf("pawn") !== -1){
            if (turn === 'w' && to >= 56){
                this.setState({modal: "promotion_w"})
                return;
            }
            else if(turn === 'b' && to <= 7){
                this.setState({modal: "promotion_b"})
                return;
            }
        }
        const move = this.state.chess.move({from: indexToAlpha(from), to: indexToAlpha(to)})
        if(move){
            squares[from] = null
            squares[to] = piece_id
            this.setState({squares: squares})
            this.reverse()
        }
        else{
            alert("You cannot do this move")
        }
        if(this.state.chess.in_threefold_repetition()){
            alert("Threefold repetition!")
        }

        else if(this.state.chess.game_over()){
            if(this.state.chess.in_checkmate()){
                this.setState({modal:"checkmate"})
            }
            else if(this.state.chess.in_draw()){
                this.setState({modal:"draw"})
            }
            else if(this.state.chess.in_stalemate()){
                this.setState({modal:"stalemate"})
            }
            else if(this.state.chess.in_threefold_repetition()){
                this.setState({modal:"threefold_repetition"})
            }
            else{
                alert("Game over!")
            }
        }

        else if(this.state.chess.in_check()){
            this.setState({modal:"check"})
        }
    }

    handleClick(i){
        if (this.state.chosen) {
            const prev_i = this.state.squares.indexOf(this.state.chosen)
            const square = document.getElementById("square_"+prev_i)
            square.className = square.className.replace(" active-square","")
            this.movePiece(this.state.chosen, i)
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
            if (this.state.reversed){
                row.push((7 - n)*8 + (7 - index))
            }
            else{
                row.push(n*8 + index)
            }
        }
        let rowItems = row.map((i) => this.renderSquare(i))
        if (this.state.reversed) {
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
        if (!this.state.reversed) {
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
        const pawn_w = [0,1,2,3,4,5,6,7].map((i) => <Piece key = {"pawn_w_"+i} id_val = {"pawn_w_"+i} class_val = "piece pawn_w"></Piece>)
        const bishop_w = [0,1].map((i) => <Piece key = {"bishop_w_"+i} id_val = {"bishop_w_"+i} class_val = "piece bishop_w"></Piece>)
        const king_w = <Piece key = "king_w" id_val = "king_w" class_val = "piece king_w"></Piece>
        const knight_w = [0,1].map((i) => <Piece key = {"knight_w_"+i} id_val = {"knight_w_"+i} class_val = "piece knight_w"></Piece>)
        const queen_w = <Piece key = "queen_w" id_val = "queen_w" class_val = "piece queen_w"></Piece>
        const rook_w = [0,1].map((i) => <Piece key = {"rook_w_"+i} id_val = {"rook_w_"+i} class_val = "piece rook_w"></Piece>)
        const pieces_w = [...pawn_w, ...bishop_w, king_w, ...knight_w, queen_w, ...rook_w]
        const pawn_b = [0,1,2,3,4,5,6,7].map((i) => <Piece key = {"pawn_b_"+i} id_val = {"pawn_b_"+i} class_val = "piece pawn_b"></Piece>)
        const bishop_b = [0,1].map((i) => <Piece key = {"bishop_b_"+i} id_val = {"bishop_b_"+i} class_val = "piece bishop_b"></Piece>)
        const king_b = <Piece key = "king_b" id_val = "king_b" class_val = "piece king_b"></Piece>
        const knight_b = [0,1].map((i) => <Piece key = {"knight_b_"+i} id_val = {"knight_b_"+i} class_val = "piece knight_b"></Piece>)
        const queen_b = <Piece key = "queen_b" id_val = "queen_b" class_val = "piece queen_b"></Piece>
        const rook_b = [0,1].map((i) => <Piece key = {"rook_b_"+i} id_val = {"rook_b_"+i} class_val = "piece rook_b"></Piece>)
        const pieces_b = [...pawn_b, ...bishop_b, king_b, ...knight_b, queen_b, ...rook_b]
        return [...pieces_w, ...pieces_b]
    }

    loadPieces(){
        // Puts pieces to their classical positions in chess
        let squares = Array(64).fill(null)
        
        for (let i = 0; i < 8; i++){
            this.placePiece(pawn_w_id[i], 8 + i)
            squares[8 + i] = "pawn_w_" + i
            this.placePiece(pawn_b_id[i], 63 - (8 + i))
            squares[63 - (8 + i)] = "pawn_b_" + i
            
        }
        
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

        for (let i = 0; i < 2; i++){
            this.placePiece(rook_w_id[i], 7*i)
            squares[i*7] = "rook_w_" + i;
            this.placePiece(rook_b_id[i], 63 - 7*i)
            squares[63 -  i*7] = "rook_b_" + i;
        }

        this.setState({squares: squares, fen : DEF_BOARD})
    }

    updatePieces(){
        let dead_pieces = piece_ids.slice()
        for(let i = 0; i < 64; i++) {
            if (this.state.squares[i]) {
                this.placePiece(this.state.squares[i], i)
                const index = dead_pieces.indexOf(this.state.squares[i])
                dead_pieces.splice(index, 1)
            }
        }
        dead_pieces.forEach(piece_id => {
            this.placePiece(piece_id, -1)
        });
    }

    setPieces(new_squares) {
        this.setState({squares : new_squares})
        const fen = squaresToFEN(new_squares)
        this.setState({fen : fen})
    }

    componentDidMount() {
        if (this.props.squares) {
            this.setPieces(this.props.squares)
        }
        else {
            this.loadPieces()
        }
        this.state.chess.load(this.state.fen)
    }

    componentDidUpdate(){
        this.updatePieces()
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
                {this.state.pieces}
                <Modal key="checkmate_modal" isOpen={this.state.modal === "checkmate"} className="Modal" overlayClassName="Overlay">
                    <h2>Checkmate!</h2>
                    <div className="button-holder">
                        <button className = "menu-button" onClick={() => this.setState({modal:null})}>Close</button>
                    </div>
                </Modal>
                <Modal key="stalemate_modal" isOpen={this.state.modal === "stalemate"} className="Modal" overlayClassName="Overlay">
                    <h2>Stalemate!</h2>
                    <div className="button-holder">
                        <button className = "menu-button" onClick={() => this.setState({modal:null})}>Close</button>
                    </div>
                </Modal>
                <Modal key="draw_modal" isOpen={this.state.modal === "draw"} className="Modal" overlayClassName="Overlay">
                    <h2>Draw!</h2>
                    <div className="button-holder">
                        <button className = "menu-button" onClick={() => this.setState({modal:null})}>Close</button>
                    </div>
                </Modal>
                <Modal key="threefold_repetition_modal" isOpen={this.state.modal === "threefold_repetition"} className="Modal" overlayClassName="Overlay">
                    <h2>Threefold Repetition!</h2>
                    <div className="button-holder">
                        <button className = "menu-button" onClick={() => this.setState({modal:null})}>Close</button>
                    </div>
                </Modal>
                <Modal key="check_modal" isOpen={this.state.modal === "check"} className="Modal" overlayClassName="Overlay">
                    <h2>Check!</h2>
                    <div className="button-holder">
                        <button className = "menu-button" onClick={() => this.setState({modal:null})}>Close</button>
                    </div>
                </Modal>
                <Modal key="promotion_modal_w" isOpen={this.state.modal === "promotion_w"} className="Modal" overlayClassName="Overlay">
                    <h2>Choose a promotion:</h2>
                    <div className="button-holder">
                        <Piece key="promotion_bishop" class_val="piece bishop_w promoted" onClick={() => this.promote("bishop_w")}></Piece>
                        <Piece key="promotion_knight" class_val="piece knight_w promoted" onClick={() => this.promote("knight_w")}></Piece>
                        <Piece key="promotion_queen" class_val="piece queen_w promoted" onClick={() => this.promote("queen_w")}></Piece>
                        <Piece key="promotion_rook" class_val="piece rook_w promoted" onClick={() => this.promote("rook_w")}></Piece>
                    </div>
                </Modal>
                <Modal key="promotion_modal_b" isOpen={this.state.modal === "promotion_b"} className="Modal" overlayClassName="Overlay">
                    <h2>Choose a promotion:</h2>
                    <div className="button-holder">
                        <Piece key="promotion_bishop" class_val="piece bishop_b promoted" onClick={() => this.promote("bishop_b")}></Piece>
                        <Piece key="promotion_knight" class_val="piece knight_b promoted" onClick={() => this.promote("knight_b")}></Piece>
                        <Piece key="promotion_queen" class_val="piece queen_b promoted" onClick={() => this.promote("queen_b")}></Piece>
                        <Piece key="promotion_rook" class_val="piece rook_b promoted" onClick={() => this.promote("rook_b")}></Piece>
                    </div>
                </Modal>
            </div>
        )
    }
  }

  export default Board;