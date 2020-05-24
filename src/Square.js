import React from 'react'
import './css/board.css'

class Square extends React.Component {

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
        const alphas = ['A','B','C','D','E','F','G','H'].reverse()
        const row = Math.floor(this.props.value / 8);
        const col = this.props.value % 8;
        const alpha_top = document.getElementById("alpha_top_"+alphas[col])
        const alpha_bot = document.getElementById("alpha_bot_"+alphas[col])
        alpha_top.setAttribute("class","alpha-square alpha-active")
        alpha_bot.setAttribute("class","alpha-square alpha-active")

        const num_left = document.getElementById("num"+String(row)+"l")
        const num_right = document.getElementById("num"+String(row)+"r")
        num_left.setAttribute("class","num-square alpha-active")
        num_right.setAttribute("class","num-square alpha-active")
    }

    alpha_off() {
        const alphas = ['A','B','C','D','E','F','G','H'].reverse()
        const row = Math.floor(this.props.value / 8);
        const col = this.props.value % 8;
        const alpha_top = document.getElementById("alpha_top_"+alphas[col])
        const alpha_bot = document.getElementById("alpha_bot_"+alphas[col])
        alpha_top.setAttribute("class","alpha-square")
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
            onClick = {this.props.onClick}
            className={className} >
            </button>
        );
    }
  }

  export default Square;