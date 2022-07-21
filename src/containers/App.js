import './App.css';
import BoardContainer from '../components/BoardContainer';
import KeyboardContainer from '../components/KeyboardContainer';
import Message from '../components/Message'
import { words } from '../components/Words'
import React from 'react';

class App extends React.Component {
  message = ""
  constructor(props) {
    super(props)
    let word = this.selectNewWord()
    this.state = {
      currentRow: 0,
      currentGuess: "",
      wordToGuess: word,
      previousGuesses: [],
      previousWords: []
    }
    //console.log(this.wordList)
  }

  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  wordList = words.map(word => {
    return word.toUpperCase()
  })

  

  selectNewWord() {
    let randomIndex = Math.floor(Math.random() * this.wordList.length);
    let randomWord = this.wordList[randomIndex];
    /*
    ToDo: make sure to not include duplicate words
    if (!this.state.previousWords.includes(randomWord)) {
      return randomWord
    }
    */
    return randomWord
  }

  isWordFound() {
    let currentGuess = this.state.currentGuess
    let wordToGuess = this.state.wordToGuess

    // check if valid word
      if (!this.wordList.includes(currentGuess.toUpperCase())) {
          this.setState(prevState => ({
            message: "Not a valid word"
          }))
          return false
      } 

    if (currentGuess === wordToGuess) {
      return true
    }
    return false
  }

  isValidWord() {
    if (this.wordList.includes(this.state.currentGuess.toUpperCase())) {
      return true
    }
    return false
  }

  onLetterChange = (event) => {
    var key = event
    //console.log(key)
    const currentGuess = this.state.currentGuess.toUpperCase()
    
    //console.log(currentGuess == this.state.wordToGuess)

    this.setState(prevState => ({
      message: ""
    }))

    if (this.alphabet.indexOf(key) !== -1) {
      // add it to first available spot in div
      if (currentGuess.length < 5) {

        this.setState(prevState => ({
          currentGuess: prevState.currentGuess + key
        }))
      }

    } else if (key === "⌫" || key === "BACKSPACE" || key === "DELETE") {
      // remove from most recent spot in div
      if (currentGuess.length > 0) {
        this.setState(prevState => ({
          currentGuess: prevState.currentGuess.slice(0, prevState.currentGuess.length - 1)
        }))
      }

    } else if (key === "⏎" || key === "ENTER") {
      if (currentGuess.length === 5) {

        // check if valid word
        var validWord = this.isValidWord()
        if (!validWord) {
          this.setState(prevState => ({
            message: "Not a valid word"
          }))
          return
        }

        // check if word matches
        var isWordFound = this.isWordFound()
        if (isWordFound) {
          this.setState(prevState => ({
            message: "Congrats!",
            currentGuess: "",
            currentRow: prevState.currentRow + 1,
            previousGuesses: [...this.state.previousGuesses, prevState.currentGuess]
          }))
        } else {
          // if there is not a match, 
          this.setState(prevState => ({
            currentGuess: "",
            currentRow: prevState.currentRow + 1,
            previousGuesses: [...this.state.previousGuesses, prevState.currentGuess],
            message: ""
          }))
        }
      } else {
        this.setState(prevState => ({
          message: "Not enough letters"
        }))
      }
    }

    if (this.state.currnetRow > 5 || this.state.previousGuesses.length === 6) {
      this.checkIfGameOver()
    }

  }

  checkIfGameOver = () => {
    if (this.state.currentGuess === this.state.wordToGuess) {
        this.setState(prevState => ({
          message:`Wow that was close: ${this.state.wordToGuess}`
        }))
    } else {
      this.setState(prevState => ({
        message:`You lost, the word was ${this.state.wordToGuess}`
      }))
    }
  }

  handleKeyBoard = (event) => {
    let key = event.key.toUpperCase()
    this.onLetterChange(key)
  }


  render() {
    console.log(this.state)
    return (
      <div className="App" tabIndex={0} onKeyDown={this.handleKeyBoard} >
        <div className='messages'>
          {/* <h1>{this.state.wordToGuess}</h1> */}
          < Message message={this.state.message} />
        </div>
        <div className='game'>
            <BoardContainer state={this.state}/>
            <KeyboardContainer state={this.state} onLetterChange={this.onLetterChange}/>
        </div>
      </div>
    );
  }
}

export default App;
