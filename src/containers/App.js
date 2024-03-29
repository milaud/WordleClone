import BoardContainer from '../components/BoardContainer';
import KeyboardContainer from '../components/KeyboardContainer';
import Message from '../components/Message'
import { words } from '../components/Words'
import { commonWords } from '../components/CommonWords'
import React from 'react';

class App extends React.Component {
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  wordList = words.map(word => {
    return word.toUpperCase()
  })

  commonWordList = commonWords.map(word => {
    return word.toUpperCase()
  })

  constructor(props) {
    super(props)
    let word = this.getWord()
    //console.log(word)
    this.state = {
      roundOver: false,
      roundWon: false,
      currentGuess: "",
      currentRow: 0,
      currentGuesses: [],
      wordToGuess: word,
      message: "",
      previousGameInfo: [],
      showDefinition: false,
      score: 0
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

  componentDidMount() {
    this.fetchAPI(this.state.wordToGuess)
  }

  parseResponse(response) {
    const word = response[0].word
    const meanings = response[0].meanings
    const wiki_url = response[0].sourceUrls.length > 0 ? response[0].sourceUrls[0] : ''
    const definition_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    return { word: word, meanings: meanings, wiki_url: wiki_url, definition_url: definition_url }
  }

  getDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error))
  }

  fetchAPI(word) {
    // fetch API
    this.getDefinition(word)
      .then(data => {
        // console.log(data)
        return this.parseResponse(data)
      })
      .then(parsedData => {
        this.setState({
          wordAPIResponse: parsedData
        })
      }).catch(error => console.log(error))
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

      if (previousWords.length == commonWords.length) {
        console.log("Max number of words reached, resetting")
        this.setState({
          previousGameInfo: []
        })
      }

      do {
        randomIndex = Math.floor(Math.random() * this.commonWordList.length);
        randomWord = this.commonWordList[randomIndex];

        if (this.wordList.includes(randomWord) && !previousWords.includes(randomWord)) {
          foundUniqueWord = true
        }

      } while (!foundUniqueWord)
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
      let prevScore = this.state.score
      this.setState(prevState => ({
        roundOver: true,
        roundWon: true,
        message: "Congrats!",
        showDefinition: true,
        score: prevScore + 1
      }))
    } else if (this.state.currentRow === 5 && this.state.currentGuesses[-1] !== this.state.wordToGuess) {
      this.setState(prevState => ({
        roundOver: true,
        message: this.state.wordToGuess,
        showDefinition: true
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
  }

  startNewGame() {
    let newWord = this.selectNewWord()
    let previousGameInfo = {
      word: this.state.wordToGuess,
      currentGuesses: this.state.currentGuesses,
      roundWon: this.state.roundWon
    }
    //console.log(newWord)

    this.fetchAPI(newWord)

    this.setState({
      roundOver: false,
      roundWon: false,
      wordToGuess: newWord,
      message: "",
      currentGuess: "",
      currentRow: 0,
      currentGuesses: [],
      previousGameInfo: [...this.state.previousGameInfo, previousGameInfo],
      showDefinition: false,
    })

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
          <label className="score">Score: {this.state.score}</label>
          <a href=''>(Not) Wordle</a>
          <button className="newGameButton" onClick={this.startNewGame.bind(this)}>New Word</button>
        </div>
        <div className='game' tabIndex={1} onKeyDown={this.handleKeyBoard}>
          <Message
            message={this.state.message}
            word={this.state.wordToGuess}
            showDefinition={this.state.showDefinition}
            wordAPIResponse={this.state.wordAPIResponse}
          />
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