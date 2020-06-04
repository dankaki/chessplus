import React from 'react'
import "./css/pieces.css"

class Piece extends React.Component{

    render(){
        return(
            <button id = {this.props.id_val} className = {this.props.class_val} top = {this.props.top} left = {this.props.left} onClick = {() => this.props.onClick()}></button>
        )
    }
}

export default Piece