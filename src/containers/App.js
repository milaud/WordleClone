import GameBoard from '../components/GameBoard/GameBoard'
import { words } from '../components/Data/Words'
import { commonWords } from '../components/Data/CommonWords'
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props)
    let word = this.getWord()
    console.log(word)

    /*
    this.state = {
      roundOver: false, // should be here
      roundWon: false, // should be here
      currentGuess: "", // passed up from board
      currentRow: 0, // passed up from board
      currentGuesses: [], // should be  here
      wordToGuess: word, // here, passed down to board
      message: "", // passed up from board
      previousGameInfo: [] // here
    }
    */
    this.state = {
      wordToGuess: word,
      roundOver: false, // should be here
      roundWon: false, // should be here
      currentGuesses: [], // should be  here
      previousGameInfo: [] // here
    }
    /*
    // previousGameInfo holds list that contains all previous words/guesses
      {
        word: "", // word to guess
        currentGuesses: [],
        roundWon: false
      }
    */
  }

  startNewGame() {
    let newWord = this.selectNewWord()
    console.log(newWord)
    /*
    let previousGameInfo = {
      word: this.state.wordToGuess, 
      currentGuesses: this.state.currentGuesses,
      roundWon: this.state.roundWon
    }
    */

    /*
    this.setState(() => ({
      roundOver: false,
      roundWon: false,
      wordToGuess: newWord,
      message: "",
      currentGuess: "",
      currentRow: 0,
      currentGuesses: [],
      previousGameInfo: [...this.state.previousGameInfo, previousGameInfo]
    }))
    */

    this.setState(() => ({
      roundOver: false,
      roundWon: false,
      wordToGuess: newWord,
      message: "", // in gameboard
      currentGuess: "", // in gameboard
      currentRow: 0, // in gameboard
      currentGuesses: [], // in gameboard
    }))
  }

  getWord() {
    var foundWord = false;
    var randomWord;
    while (!foundWord) {
      var randomIndex = Math.floor(Math.random() * commonWords.length);
      randomWord = commonWords[randomIndex];
      if (words.includes(randomWord)) {
        foundWord = true
      }
    }
    return randomWord
  }

  selectNewWord() {
    var foundUniqueWord = false
    var randomIndex;
    var randomWord;
    
    if (this.state.previousGameInfo.length > 0) {
      const previousWords = this.state.previousGameInfo.map(game => {
        return game.word
      })
      //console.log(previousWords)
  
      do {
        randomIndex = Math.floor(Math.random() * commonWords.length);
        randomWord = commonWords[randomIndex];
  
        if (words.includes(randomWord) && !previousWords.includes(randomWord)) {
          foundUniqueWord = true
        } else {
          //console.log(`Found duplicate word ${randomWord} in list`)
        }
  
      } while(!foundUniqueWord)
    } else {
      randomIndex = Math.floor(Math.random() * commonWords.length);
      randomWord = commonWords[randomIndex];
    }

    return randomWord
  }

  isValidGuess(currentGuess) {
    var validWord = words.includes(currentGuess.toUpperCase())
    if (!validWord) {
      return false
    }
    return true
  }

  render() {
    console.log("app.js state:")
    console.log(this.state)
    console.log("\n\n")
    return (
      <div className="App" >
        <div className="navbar">
        <label className="switch">
          <input type="checkbox"></input>
          <span className="slider round"></span>
        </label>
          <a href=''>(Not) Wordle</a>
          <button className="newGameButton" onClick={this.startNewGame.bind(this)}>New Word</button>
        </div>
        <GameBoard 
          wordToGuess={this.state.wordToGuess}
          roundOver={this.state.roundOver}
          roundWon={this.state.roundWon}
          currentGuesses={this.state.currentGuesses}
          isValidGuess={this.isValidGuess}
        />
      </div>
    );
  }
}

export default App;