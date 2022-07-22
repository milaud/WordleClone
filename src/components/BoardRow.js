import React from 'react'

class BoardRow extends React.Component {
    tiles = []

    findAllIndexes(wordToGuess) {
        var indexMap = {}
        // add each letter to a map, with each value being a list containing each index the letter occurs
        for (let index = 0; index < wordToGuess.length; index++) {
            //console.log(`${index}: ${indexMap}`)
            let letter = wordToGuess[index]
            if (indexMap.hasOwnProperty(letter)) {
                indexMap[letter].push(index)
            } else {
                indexMap[letter] = [index]
            }
        }
        return indexMap
    }
    
    compareWords(wordToGuess, wordToAnalyze) {
        let indexMap = this.findAllIndexes(wordToGuess)
        var styles = []
        for (let index = 0; index < wordToAnalyze.length; index++) {
            let letter = wordToAnalyze[index]
            if (indexMap.hasOwnProperty(letter)) {
                // guess letter is in golden word
                if (indexMap[letter].includes(index)) {
                    // check which index it matches
                    for (let j = 0; j < indexMap[letter].length; j++) {
                        // check if index is correct
                        let subIndex = indexMap[letter][j]
                        if (subIndex === index) {
                            styles.push(1)
                        }
                    }
                } else {
                    styles.push(0)
                }
            } else {
                styles.push(-1)
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
                } else {
                    // green
                    document.getElementById(tile).style = "background-color: green"
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

