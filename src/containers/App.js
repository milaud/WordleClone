import BoardContainer from '../components/BoardContainer';
import KeyboardContainer from '../components/KeyboardContainer';
import Message from '../components/Message'
import { words } from '../components/Words'
import { commonWords } from '../components/CommonWords'
import React from 'react';

class App extends React.Component {
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  stockMessage = "Welcome to (not) Wordle"

  wordList = words.map(word => {
    return word.toUpperCase()
  })

  commonWordList = commonWords.map(word => {
    return word.toUpperCase()
  })

  constructor(props) {
    super(props)
    let word = this.getWord()

    this.state = {
      roundOver: false,
      roundWon: false,
      currentGuess: "",
      currentRow: 0,
      currentGuesses: [],
      wordToGuess: word,
      message: this.stockMessage,
      previousGameInfo: []
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

  getWord() {
    var foundWord = false;
    var randomWord;
    while (!foundWord) {
      var randomIndex = Math.floor(Math.random() * this.commonWordList.length);
      randomWord = this.commonWordList[randomIndex];
      if (this.wordList.includes(randomWord)) {
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
        randomIndex = Math.floor(Math.random() * this.commonWordList.length);
        randomWord = this.commonWordList[randomIndex];
  
        if (this.wordList.includes(randomWord) && !previousWords.includes(randomWord)) {
          foundUniqueWord = true
        } else {
          //console.log(`Found duplicate word ${randomWord} in list`)
        }
  
      } while(!foundUniqueWord)
    } else {
      randomIndex = Math.floor(Math.random() * this.commonWordList.length);
      randomWord = this.commonWordList[randomIndex];
    }

    return randomWord
  }

  writeToTile(key) {
    // add it to first available tile
    if (this.state.currentGuess.toUpperCase().length < 5) {
      this.setState(prevState => ({
        currentGuess: prevState.currentGuess + key
      }))
    }
  }
  
  isfRowIsFilled() {
    return this.state.currentGuess.length === 5 ? true : false
  }

  isValidGuess() {
    var validWord = this.wordList.includes(this.state.currentGuess.toUpperCase())
    if (!validWord) {
      return false
    }
    return true
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

  writeRow() {
    this.setState(prevState => ({
      currentGuess: "",
      currentRow: prevState.currentRow + 1,
      currentGuesses: [...this.state.currentGuesses, prevState.currentGuess]
    }))
  }

  submitGuess() {
    if (!this.isfRowIsFilled()) {
      this.updateMessage("Not enough letters")
      return
    } 
    if (!this.isValidGuess()) {
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

  eraseLatestTile() {
    // remove from latest written tile
    if (this.state.currentGuess.toUpperCase().length > 0) {
      this.setState(prevState => ({
        currentGuess: prevState.currentGuess.slice(0, prevState.currentGuess.length - 1)
      }))
    }
  }

  onLetterChange = (key) => {
    //console.log(key)

    if (!this.state.roundOver && this.state.currentRow < 6) {
      this.updateMessage(this.stockMessage)

      // key pressed is a letter
      if (this.alphabet.indexOf(key) !== -1) {
        this.writeToTile(key)
      } else if (key === "⌫" || key === "BACKSPACE" || key === "DELETE") {
        this.eraseLatestTile()
      } else if (key === "⏎" || key === "ENTER") {
        this.submitGuess()
      }
    }
  }

  startNewGame() {
    let newWord = this.selectNewWord()
    let previousGameInfo = {
      word: this.state.wordToGuess, 
      currentGuesses: this.state.currentGuesses,
      roundWon: this.state.roundWon
   }

    this.setState(() => ({
      roundOver: false,
      roundWon: false,
      wordToGuess: newWord,
      message: this.stockMessage,
      currentGuess: "",
      currentRow: 0,
      currentGuesses: [],
      previousGameInfo: [...this.state.previousGameInfo, previousGameInfo]
    }))
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


  render() {
    //console.log(this.state)
    return (
      <div className="App" >
        <div className="navbar">
          <button className='menuIcon'>
            <div></div>
            <div></div>
            <div></div>
          </button>
          <a href=''>(Not) Wordle</a>
          <button className="newGameButton" onClick={this.startNewGame.bind(this)}>New Word</button>
        </div>
        <div className='game' tabIndex={1} onKeyDown={this.handleKeyBoard}>
            {/* <BoardContainer state={this.state}/> */}
            < Message message={this.state.message} />
            <BoardContainer 
              currentGuess={this.state.currentGuess}
              currentGuesses={this.state.currentGuesses}
              currentRow={this.state.currentRow}
              wordToGuess={this.state.wordToGuess}
            />
            <KeyboardContainer 
              currentGuess={this.state.currentGuess} 
              onLetterChange={this.onLetterChange}
            />
        </div>
      </div>
    );
  }
}

export default App;