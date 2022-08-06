import React from 'react'
import BoardContainer from '../Board/BoardContainer';
import KeyboardContainer from '../Keyboard/KeyboardContainer';
import Message from '../Message'

class GameBoard extends React.Component {

    constructor(props) {
        super(props)

        // word to guess is in props
        this.state = {
            currentGuess: "", // passed up from board
            currentGuesses: [],
            currentRow: 0, // passed up from board
            message: "", // passed up from board
        }
    }

    doesGuessMatchWord() {
        // check if guess matches word
        let currentGuess = this.state.currentGuess
        let wordToGuess = this.state.wordToGuess

        if (currentGuess === wordToGuess) {
            return true
        }
        return false
    }
    
    submitGuess() {
        if (!this.isfRowIsFilled()) {
            this.updateMessage("Not enough letters")
            return
        } 

        if (!this.props.isValidGuess(this.state.currentGuess)) {
            this.updateMessage("Not a valid word")
            return
        }
        
        if (this.doesGuessMatchWord()) {
            this.setState(prevState => ({
            roundOver: true,
            roundWon: true,
            message: "Congrats!"
            }))
        } else if (this.state.currentRow === 5 && this.state.currentGuesses[-1] !== this.state.wordToGuess) {
            this.setState(prevState => ({
            roundOver: true,
            message: this.state.wordToGuess
            }))
        }

        this.writeRow()
    }

    onLetterChange = (key) => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //console.log(key)
        if (!this.state.roundOver && this.state.currentRow < 6) {
            this.updateMessage("")
            // key pressed is a letter
            if (alphabet.indexOf(key) !== -1) {
                this.writeToTile(key)
            } else if (key === "⌫" || key === "BACKSPACE" || key === "DELETE") {
                this.eraseLatestTile()
            } else if (key === "⏎" || key === "ENTER") {
                this.submitGuess()
            }
        }
    }

    handleKeyBoard = (event) => {
        let key = event.key.toUpperCase()
        this.onLetterChange(key)
    }

    updateMessage(message) {
        this.setState(() => ({
            message: message
        }))
    }

    eraseLatestTile() {
        // remove from latest written tile
        if (this.state.currentGuess.toUpperCase().length > 0) {
            this.setState(prevState => ({
            currentGuess: prevState.currentGuess.slice(0, prevState.currentGuess.length - 1)
            }))
        }
    }

    writeRow() {
        this.setState(prevState => ({
            currentGuess: "",
            currentRow: prevState.currentRow + 1,
            currentGuesses: [...this.state.currentGuesses, prevState.currentGuess]
        }))
    }

    writeToTile(key) {
        // add it to first available tile
        if (this.state.currentGuess.toUpperCase().length < 5) {
            this.setState(prevState => ({
            currentGuess: prevState.currentGuess + key
            }))
        }
    }

    // this can stay here
    isfRowIsFilled() {
        return this.state.currentGuess.length === 5 ? true : false
    }

    render() {
        console.log("gameboard.js state:")
        console.log(this.state)
        console.log("\n\n")
        return (
            <div className='game' tabIndex={1} onKeyDown={this.handleKeyBoard}>
                {/* <BoardContainer state={props.state}/> */}
                < Message message={this.state.message} />
                <BoardContainer 
                    currentGuess={this.state.currentGuess}
                    currentGuesses={this.state.currentGuesses}
                    currentRow={this.state.currentRow}
                    wordToGuess={this.props.wordToGuess}
                />
                <KeyboardContainer 
                    currentGuess={this.state.currentGuess} 
                    onLetterChange={this.onLetterChange}
                />
            </div>
        )
    }
}

export default GameBoard;