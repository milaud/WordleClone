import React from 'react'

class BoardRow extends React.Component {
    tiles = []

    constructor(props) {
        super(props)
        /*
        for (let i = 0; i < 6; i++) {
            //this.tiles.push(<Tile key={i} letter={this.props.active ? this.props.state.state.currentGuess[i]: ''} />)
            this.tiles.push(<Tile key={i} index={i} letter={this.props.state.state.currentGuess[i]} />)
        }
        */
       /*
        for (const key in props.state.state) {
            console.log(key)
        }
        */
    }
    

    /*
    render() {
        console.log(this.props.state.state.currentGuess)
        return (
            <div className={"row row" + this.props.row}>
                {this.tiles.map((tile) => {
                    return tile
                })}
          </div>
        )
    }
    */

    compareWords(wordToGuess, wordToAnalyze) {
        var stylesToSet = []

        if (wordToGuess.length != wordToAnalyze.length) {
            console.log(`Word lengths don't match: ${wordToGuess}, ${wordToAnalyze}`)
        }

        for (let index = 0; index < wordToAnalyze.length; index++) {
            //const goldenLetter = wordToGuess[index];
            const guessLetter = wordToAnalyze[index]

            // check guess letter
            let indexOfLetter = wordToGuess.indexOf(guessLetter)
            stylesToSet.push(indexOfLetter)
            
            /*
            // if guess letter is not in goldenWord, make that tile red
            if (indexOfLetter === -1) {
                // make that tile grey
                stylesToSet.push(-1)
            } else if (indexOfLetter === 0) {
                // 0-4 gives the index of 
                // if guess letter is in the goldenWord and in the right spot, make that tile green
                // make that tile green
                stylesToSet.push(0)
            } else {
                // if guess letter is in the goldenWord but in incorrect spot, make that tile yellow
                // make that tile yellow
                stylesToSet.push(1)
            }
            */
        }
        return stylesToSet
    }
    updateStyles() {
        //let currentGuess = this.props.state.state.currentGuess
        let wordToGuess = this.props.state.state.wordToGuess
        let currentRow =  this.props.state.state.currentRow
        if (currentRow > 0) {
            let rowToUpdate = currentRow - 1
            let wordToAnalyze = this.props.state.state.previousGuesses[rowToUpdate]
            console.log("wordToAnalyze: " + wordToAnalyze)
            let stylesToSet = this.compareWords(wordToGuess, wordToAnalyze)
            console.log("stylesToSet: " + stylesToSet)

            for (let index = 0; index < stylesToSet.length; index++) {
                // index also corresponds with tile: row0tile0..row4tile4

                /*
                    Edge case to handle:
                    if there is 1 letter in the goldenWord but 2 of that letter in the guess,
                    there should only be 1 letter highlighted yellow/green
                */
                const tileStyleIndex = stylesToSet[index];
                const tile = `row${rowToUpdate}tile${index}`
                if (tileStyleIndex == -1) {
                    // grey
                    document.getElementById(tile).style = "background-color: grey"
                } else if (index == tileStyleIndex) {
                    // yellow
                    document.getElementById(tile).style = "background-color: green"
                } else {
                    // green
                    document.getElementById(tile).style = "background-color: yellow"
                }
                
            }
        }


    }


    componentDidUpdate() {
        this.updateStyles()
    }

    render() {
        var isActive = `${this.props.row == this.props.state.state.currentRow? "active" : ""}`
        //var rowClassName = `row row${this.props.row} ${isActive}}`
        let currentRow = this.props.state.state.currentRow // currentRow === numberOfPreviousGuesses
        
        /*
        // ternary operations below...yuck
        if (isActive) {
            // you can guess the current row
        } else {
            // it is a previously guess row or a future row
            if (this.props.row < currentRow) {
                // write previous guess
            } else {
                // write nothing;
            }
        }
        */


        // <div className={"row row" + this.props.row + " "}>
        // grab tile by id: row0tile1

        return (
            <div className="row">
                <span id={`row${this.props.row}tile0`} className="tile">{isActive ? this.props.state.state.currentGuess[0] : (this.props.row < currentRow) ? this.props.state.state.previousGuesses[this.props.row][0] : ''}</span>
                <span id={`row${this.props.row}tile1`} className="tile">{isActive ? this.props.state.state.currentGuess[1] : (this.props.row < currentRow) ? this.props.state.state.previousGuesses[this.props.row][1] : ''}</span>
                <span id={`row${this.props.row}tile2`} className="tile">{isActive ? this.props.state.state.currentGuess[2] : (this.props.row < currentRow) ? this.props.state.state.previousGuesses[this.props.row][2] : ''}</span>
                <span id={`row${this.props.row}tile3`} className="tile">{isActive ? this.props.state.state.currentGuess[3] : (this.props.row < currentRow) ? this.props.state.state.previousGuesses[this.props.row][3] : ''}</span>
                <span id={`row${this.props.row}tile4`} className="tile">{isActive ? this.props.state.state.currentGuess[4] : (this.props.row < currentRow) ? this.props.state.state.previousGuesses[this.props.row][4] : ''}</span>
            </div>
        )
    }
}

export default BoardRow;


/*

<span className="tile tile1">{this.props.active ? this.props.state.state.currentGuess[0]: ''}</span>
<span className="tile tile2">{this.props.active ? this.props.state.state.currentGuess[1]: ''}</span>
<span className="tile tile3">{this.props.active ? this.props.state.state.currentGuess[2]: ''}</span>
<span className="tile tile4">{this.props.active ? this.props.state.state.currentGuess[3]: ''}</span>
<span className="tile tile5">{this.props.active ? this.props.state.state.currentGuess[4]: ''}</span>
*/