import React from 'react'
import './css/board.css'

class Square extends React.Component {

    constructor(props){
        super(props)
        this.state = {piece: null}
    }

    put_pawn_0(){
        const piece = document.getElementById("pawn_w_0")
        const row = Math.floor(this.props.value / 8);
        const col = this.props.value % 8;
        const y = (row + 1) * 40;
        const x = (col + 1) * 40;
        piece.style.top = String(y) + "px"
        piece.style.left = String(x) + "px"
    }

    alpha_on() {
        const alpha_top_bar = document.getElementById("alpha-top")
        const alpha_bot_bar = document.getElementById("alpha-bot")
        const row = Math.floor(this.props.value / 8);
        const col = this.props.value % 8;
        const alpha_top = alpha_top_bar.children[col + 1]
        alpha_top.setAttribute("class","alpha-square alpha-active")
        const alpha_bot = alpha_bot_bar.children[col + 1]
        alpha_bot.setAttribute("class","alpha-square alpha-active")

        const num_left = document.getElementById("num"+String(row)+"l")
        const num_right = document.getElementById("num"+String(row)+"r")
        num_left.setAttribute("class","num-square alpha-active")
        num_right.setAttribute("class","num-square alpha-active")
    }

    alpha_off() {
        const alpha_top_bar = document.getElementById("alpha-top")
        const alpha_bot_bar = document.getElementById("alpha-bot")
        const row = Math.floor(this.props.value / 8);
        const col = this.props.value % 8;
        const alpha_top = alpha_top_bar.children[col + 1]
        alpha_top.setAttribute("class","alpha-square")
        const alpha_bot = alpha_bot_bar.children[col + 1]
        alpha_bot.setAttribute("class","alpha-square")

        const num_left = document.getElementById("num"+String(row)+"l")
        const num_right = document.getElementById("num"+String(row)+"r")
        num_left.setAttribute("class","num-square")
        num_right.setAttribute("class","num-square")
    }

    render() {
        const row = Math.floor(this.props.value / 8);
        const col = this.props.value % 8;
        const isBlack = Boolean((row+col) % 2)
        let className = "square"
        if (isBlack){
            className = "square blacksquare"
        }

        return (
            <button
            id = {"square_" + this.props.value}
            onMouseOver={() => this.alpha_on()}
            onMouseOut={() => this.alpha_off()}
            onClick = {() => this.put_pawn_0()}
            className={className} >
            
            </button>
        );
    }
  }

  export default Square;