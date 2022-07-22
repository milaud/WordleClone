import './App.css';
import BoardContainer from '../components/BoardContainer';
import KeyboardContainer from '../components/KeyboardContainer';
import Message from '../components/Message'
import { words } from '../components/Words'
import React from 'react';

class App extends React.Component {
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  wordList = words.map(word => {
    return word.toUpperCase()
  })

  constructor(props) {
    super(props)
    let word = this.getWord()

    this.state = {

      currentGuess: "",
      currentRow: 0,
      currentGuesses: [],
      wordToGuess: word,
      message: "",
      roundOver: false,
      previousGameInfo: [
        // list that contains all previous words/guesses
        {
          word: "", // word to guess
          currentGuesses: [],
          successful: false // did user guess word correctly
        }
      ]
    }
    //console.log(this.wordList)
  }

  getWord() {
    var randomIndex = Math.floor(Math.random() * this.wordList.length);
    var randomWord = this.wordList[randomIndex];
    return randomWord
  }

  selectNewWord() {
    const previousWords = this.state.previousGameInfo.map(game => {
      return game.word
    })
    console.log(previousWords)

    var foundUniqueWord = false
    var randomIndex;
    var randomWord;

    do {
      randomIndex = Math.floor(Math.random() * this.wordList.length);
      randomWord = this.wordList[randomIndex];

      if (!previousWords.includes(randomWord)) {
        foundUniqueWord = true
      } else {
        console.log(`Found duplicate word ${randomWord} in list`)
      }

    } while(!foundUniqueWord)

    /*
    while (!foundUniqueWord) {
      var randomIndex = Math.floor(Math.random() * this.wordList.length);
      var randomWord = this.wordList[randomIndex];

      if (!previousWords.includes(randomWord)) {
        foundUniqueWord = true
      } else {
        console.log(`Found duplicate word ${randomWord} in list`)
      }
    }
    */
    
    /*
    ToDo: make sure to not include duplicate words
    if (!this.state.previousWords.includes(randomWord)) {
      return randomWord
    }
    */
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
        message: "Congrats!",
        currentGuess: "",
        currentRow: prevState.currentRow + 1,
        currentGuesses: [...this.state.currentGuesses, prevState.currentGuess],
        roundOver: true
      }))
    } else {
      // no need to add message, UI will show incorrect word
      this.setState(prevState => ({
        currentGuess: "",
        currentRow: prevState.currentRow + 1,
        currentGuesses: [...this.state.currentGuesses, prevState.currentGuess],
      }))
    }
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

    this.updateMessage("")

    // key pressed is a letter
    if (this.alphabet.indexOf(key) !== -1) {
      this.writeToTile(key)
    } else if (key === "⌫" || key === "BACKSPACE" || key === "DELETE") {
      this.eraseLatestTile()
    } else if (key === "⏎" || key === "ENTER") {
      this.submitGuess()
    }
  }

  stateNewGame() {
    this.setState(() => ({
      message: "",
      currentGuess: "",
      currentRow: 0,
      currentGuesses: [],
      roundOver: false
    }))
  }

  handleKeyBoard = (event) => {
    let key = event.key.toUpperCase()
    this.onLetterChange(key)
  }

  updateMessage(message) {
    this.setState({
      message: message
    })
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
            {/* <BoardContainer state={this.state}/> */}
            <BoardContainer 
              currentGuess={this.state.currentGuess}
              currentGuesses={this.state.currentGuesses}
              currentRow={this.state.currentRow}
              wordToGuess={this.state.wordToGuess}
            />
            <KeyboardContainer onLetterChange={this.onLetterChange}/>
        </div>
      </div>
    );
  }
}

export default App;

/*
<BoardContainer 
  currentGuess={this.state.currentGuess}
  currentGuesses={this.state.currentGuesses}
  currentRow={this.state.currentRow}
  wordToGuess={this.state.wordToGuess}
/>
*/