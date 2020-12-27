import React, { Component } from 'react';
import './Board.css';
import Cell from './Cell'

class Board extends Component {
    static defaultProps = {
        totalRows: 5,                                                                                   // Number of Rows; Can be passed in as a prop
        totalColumns: 5,                                                                                // Number of Columns; can be passed in as a prop
        litChance: 0.5                                                                                  // Chance that a cell is lit; can be passed in as a prop
    }

    constructor(props) {
        super(props);
        this.state = {
            isWinner: false,                                                                            // Keeps track if player won the game
            Board: this.createBoard()                                                                   // Keeps track of the board state
        }
        this.toggleState = this.toggleState.bind(this);
    } 


    /* Initialize the board */
    createBoard() {
        const board = [];
        for(let i = 0; i < this.props.totalRows; i++) {
            const row = [];
            for(let j = 0; j < this.props.totalColumns; j++) {
                const isLit = (Math.random() < this.props.litChance);
                row.push(isLit);
            }
            board.push(row);
        }
        return board;
    }

    /* Used to toggle the states of all neighbouring cells incuding the invoking cell; Passed as prop to the child component */
    toggleState(coordinates) {
        const [ row, column ] = coordinates.split("-").map(el => parseInt(el));
        const board = this.state.Board;

        board[row][column] = !board[row][column];                                                       // Toggle current cell
        if(row - 1 >= 0) board[row -1][column] = !board[row -1][column];                                // Toggle top neighbour
        if(column -1 >= 0) board[row][column -1] = !board[row][column -1];                              // Toggle left neighbour
        if(row + 1 < this.props.totalRows) board[row + 1][column] = !board[row + 1][column];            // Toggle bottom neighbour
        if(column + 1 < this.props.totalColumns) board[row][column + 1] = !board[row][column + 1];      // Toggle right neighbour
        
        const winnerOrNot = board.every(row => row.every(column => !column));

        this.setState({ Board: board, isWinner: winnerOrNot });                                                                // Update board in STATE
    }

    /* Render the board accoring to state of cells in STATE */
    renderBoard() {
        const renderedBoard = [];
        for(let i = 0; i < this.props.totalRows; i++) {
            const renderedRow = [];
            for(let j = 0; j < this.props.totalColumns; j++) {
                const coordinates = `${i}-${j}`
                renderedRow.push(<td key={j}><Cell key={coordinates} isLit={this.state.Board[i][j]} click={this.toggleState} text={coordinates}/></td>);
            }
            renderedBoard.push(<tr key={i}>{renderedRow}</tr>);
        }
        return renderedBoard;
    }

    render() {
        if(this.state.isWinner) {
            return <div className="winner">
                <span className="neon-orange">You</span>
                <span className="neon-blue">Win!</span>    
            </div>
        }
        return <div>
            <span className="neon-orange">Lights</span>
            <span className="neon-blue">Out!</span>
            <table className="Board">
                <tbody>
                    {this.renderBoard()}
                </tbody>
            </table>
        </div>
    }
}

export default Board;
