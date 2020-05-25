import React from 'react';
import Board from './Board'
import Piece from './Piece'
import './css/board.css'

class InitBoard extends Board {
    movePiece(piece_id, i){
        // Moves the piece. Checks if the move is legit.
        if(this.props.reversed && i >= 32) {
            alert('You cannot place your peaces here')
            return
        }
        else if((!this.props.reversed) && i < 32) {
            alert('You cannot place your peaces here')
            return
        }

        let squares = this.state.squares.slice()
        squares[squares.indexOf(piece_id)] = null
        squares[i] = piece_id
        this.setState({squares: squares})
        this.placePiece(piece_id, i)
    }

    renderPieces(){
        const mask = <div class = 'mask'></div>

        if (this.props.reversed) {
            const pawn_w = [0,1,2,3,4,5,6,7].map((i) => <Piece id_val = {"pawn_w_"+i} class_val = "piece pawn_w"></Piece>)
            const bishop_w = [0,1].map((i) => <Piece id_val = {"bishop_w_"+i} class_val = "piece bishop_w"></Piece>)
            const king_w = <Piece id_val = "king_w" class_val = "piece king_w"></Piece>
            const knight_w = [0,1].map((i) => <Piece id_val = {"knight_w_"+i} class_val = "piece knight_w"></Piece>)
            const queen_w = <Piece id_val = "queen_w" class_val = "piece queen_w"></Piece>
            const rook_w = [0,1].map((i) => <Piece id_val = {"rook_w_"+i} class_val = "piece rook_w"></Piece>)
            const pieces_w = [...pawn_w, ...bishop_w, king_w, ...knight_w, queen_w, ...rook_w]
            return [...pieces_w, mask]
        }
        else{
            const pawn_b = [0,1,2,3,4,5,6,7].map((i) => <Piece id_val = {"pawn_b_"+i} class_val = "piece pawn_b"></Piece>)
            const bishop_b = [0,1].map((i) => <Piece id_val = {"bishop_b_"+i} class_val = "piece bishop_b"></Piece>)
            const king_b = <Piece id_val = "king_b" class_val = "piece king_b"></Piece>
            const knight_b = [0,1].map((i) => <Piece id_val = {"knight_b_"+i} class_val = "piece knight_b"></Piece>)
            const queen_b = <Piece id_val = "queen_b" class_val = "piece queen_b"></Piece>
            const rook_b = [0,1].map((i) => <Piece id_val = {"rook_b_"+i} class_val = "piece rook_b"></Piece>)
            const pieces_b = [...pawn_b, ...bishop_b, king_b, ...knight_b, queen_b, ...rook_b]
            return [...pieces_b, mask]
        }
    }

    loadPieces(){
        // Puts pieces to their classical positions in chess

        let squares = this.state.squares.slice();
        const pawn_w_id = [0,1,2,3,4,5,6,7].map((i) => "pawn_w_"+i)
        const pawn_b_id = [0,1,2,3,4,5,6,7].map((i) => "pawn_b_"+i)
        for (let i = 0; i < 8; i++){
            if (this.props.reversed) {
                this.placePiece(pawn_w_id[i], 8 + i)
                squares[8 + i] = "pawn_w_" + i
            }
            else{
                this.placePiece(pawn_b_id[i], 63 - (8 + i))
                squares[63 - (8 + i)] = "pawn_b_" + i
            }
        }
        
        const bishop_w_id = [0,1].map((i) => "bishop_w_"+i)
        const bishop_b_id = [0,1].map((i) => "bishop_b_"+i)
        for (let i = 0; i < 2; i++){
            if (this.props.reversed){
                this.placePiece(bishop_w_id[i], 2 + i*3)
                squares[2 + i*3] = "bishop_w_" + i
            }
            else{
                this.placePiece(bishop_b_id[i], 63 - (2 + i*3))
                squares[63 - (2 + i*3)] = "bishop_b_" + i
            }
            
        }

        if(this.props.reversed) {
            this.placePiece("king_w", 3)
            squares[3] = "king_w"
        }
        else {
            this.placePiece("king_b", 63 - 4)
            squares[63 - 4] = "king_b"
        }
        

        const knight_w_id = [0,1].map((i) => "knight_w_"+i)
        const knight_b_id = [0,1].map((i) => "knight_b_"+i)
        for (let i = 0; i < 2; i++){
            if (this.props.reversed) {
                this.placePiece(knight_w_id[i], 1 + 5*i)
                squares[1 + i*5] = "knight_w_" + i;
            }
            else{
                this.placePiece(knight_b_id[i], 63 - (1 + 5*i))
                squares[63 - (1 + 5*i)] = "knight_b_" + i;
            }
        } 

        if(this.props.reversed){
            this.placePiece("queen_w", 4)
            squares[4] = "queen_w"
        }
        else{
            this.placePiece("queen_b", 63-3)
            squares[63-3] = "queen_b"
        }
        

        const rook_w_id = [0,1].map((i) => "rook_w_"+i)
        const rook_b_id = [0,1].map((i) => "rook_b_"+i)
        for (let i = 0; i < 2; i++){
            if (this.props.reversed) {
                this.placePiece(rook_w_id[i], 7*i)
                squares[i*7] = "rook_w_" + i;
            }
            else{
                this.placePiece(rook_b_id[i], 63 - 7*i)
                squares[63 -  i*7] = "rook_b_" + i;
            }
        }

        this.setState({squares: squares});
    }
}

export default InitBoard