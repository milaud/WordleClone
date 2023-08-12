import React from 'react'
import BoardRow from './BoardRow'


const BoardContainer = (props) => {

    return (
        <div className='board-container'>
            <div className='board'>
                <BoardRow currentGuess={props.currentGuess} currentGuesses={props.currentGuesses} currentRow={props.currentRow} wordToGuess={props.wordToGuess} row={0} />
                <BoardRow currentGuess={props.currentGuess} currentGuesses={props.currentGuesses} currentRow={props.currentRow} wordToGuess={props.wordToGuess} row={1} />
                <BoardRow currentGuess={props.currentGuess} currentGuesses={props.currentGuesses} currentRow={props.currentRow} wordToGuess={props.wordToGuess} row={2} />
                <BoardRow currentGuess={props.currentGuess} currentGuesses={props.currentGuesses} currentRow={props.currentRow} wordToGuess={props.wordToGuess} row={3} />
                <BoardRow currentGuess={props.currentGuess} currentGuesses={props.currentGuesses} currentRow={props.currentRow} wordToGuess={props.wordToGuess} row={4} />
                <BoardRow currentGuess={props.currentGuess} currentGuesses={props.currentGuesses} currentRow={props.currentRow} wordToGuess={props.wordToGuess} row={5} />
            </div>
        </div>
    )
}

export default BoardContainer;