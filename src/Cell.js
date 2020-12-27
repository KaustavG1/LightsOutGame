import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
    // this.handleClick = this.handleClick.bind(this);

    handleClick = () => {
        this.props.click(this.props.text);
    } 

    render() {
        const chooseClass = this.props.isLit ? 'Lit-Cell' : '';
        return <div className={`Cell + ${chooseClass}`} onClick={this.handleClick}></div>
    }
}

export default Cell;