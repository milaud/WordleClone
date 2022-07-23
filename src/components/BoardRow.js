import React from 'react'

class BoardRow extends React.Component {
    tiles = []

    findAllIndexes(wordToGuess) {
        let indexMap = {}
        // add each letter to a map, with each value being a list containing each index the letter occurs
        for (let index = 0; index < wordToGuess.length; index++) {
            //console.log(`${index}: ${indexMap}`)
            let letter = wordToGuess[index]
            if (indexMap.hasOwnProperty(letter)) {
                //indexMap[letter].push(index)
                indexMap[letter] += 1
            } else {
                //indexMap[letter] = [index]
                indexMap[letter] = 1
            }
        }
        return indexMap
    }
    
    compareWords(wordToGuess, wordToAnalyze) {
        let indexMap = this.findAllIndexes(wordToGuess)
        //console.log(indexMap)
        let styles = []

        // initially check indexes if there are any matches
        for (let index = 0; index < wordToAnalyze.length; index++) {
            if (wordToAnalyze[index] === wordToGuess[index]) {
                styles[index] = 1
                indexMap[wordToGuess[index]] -= 1
            }
        }

        // go through word again and check the non-matching indexes to see if letter exists in map
        for (let index = 0; index < wordToAnalyze.length; index++) {
            if (styles[index] !== undefined) {
                continue
            }
            let letter = wordToAnalyze[index]
            if (!indexMap.hasOwnProperty(letter) || indexMap[letter] < 1) {
                // guessed letter is not in map
                styles[index] = -1
            } else {
                // guessed letter is in map
                styles[index] = 0
                // update map
                indexMap[letter] -= 1
            }
        }

        // should contain an array with the color for each tile at its index
        // -1 == gray, 0 == yellow, 1 == green
        return styles
    }

    updateStyles() {
        let wordToGuess = this.props.wordToGuess
        let currentRow =  this.props.currentRow
        if (currentRow > 0) {
            let rowToUpdate = currentRow - 1
            let wordToAnalyze = this.props.currentGuesses[rowToUpdate]
            //console.log("wordToAnalyze: " + wordToAnalyze)
            let stylesToSet = this.compareWords(wordToGuess, wordToAnalyze)
            //console.log("stylesToSet: " + stylesToSet)

            for (let index = 0; index < stylesToSet.length; index++) {
                // index also corresponds with tile: row0tile0..row4tile4
                const tileStyleIndex = stylesToSet[index];
                const tile = `row${rowToUpdate}tile${index}`
                if (tileStyleIndex === -1) {
                    // grey
                    document.getElementById(tile).style = "background-color: grey"
                } else if (tileStyleIndex === 0) {
                    // yellow
                    document.getElementById(tile).style = "background-color: yellow"
                } else if (tileStyleIndex === 1) {
                    // green
                    document.getElementById(tile).style = "background-color: green"
                } else {
                    console.log(`Unexpected style at index ${index}: ${tileStyleIndex}`)
                }
                
            }
        } else if (this.props.currentGuesses.length === 0) {
            for (let row = 0; row < 6; row++) {
                for (let index = 0; index < 5; index++) {
                    const tile = `row${row}tile${index}`
                    document.getElementById(tile).style = "background-color: none"
                }
            }
        }
    }

    componentDidUpdate() {
        this.updateStyles()
    }

    getTileLetter(index) {
        let currentRow = this.props.currentRow
        let isActive = `${this.props.row === currentRow? "active" : ""}`

        if (isActive) {
            // you can guess the current row
            return this.props.currentGuess[index]
        } else {
            if (this.props.row < currentRow) {
                return this.props.currentGuesses[this.props.row][index]
            } else {
                return ''
            }
        }
    }

    render() {
        return (
            <div className="row">
                <span id={`row${this.props.row}tile0`} className="tile">{this.getTileLetter(0)}</span>
                <span id={`row${this.props.row}tile1`} className="tile">{this.getTileLetter(1)}</span>
                <span id={`row${this.props.row}tile2`} className="tile">{this.getTileLetter(2)}</span>
                <span id={`row${this.props.row}tile3`} className="tile">{this.getTileLetter(3)}</span>
                <span id={`row${this.props.row}tile4`} className="tile">{this.getTileLetter(4)}</span>
            </div>
        )
    }
}

export default BoardRow;

