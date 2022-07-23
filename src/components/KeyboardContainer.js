import React from 'react'


class KeyboardContainer extends React.Component {
    // constructor(props) {
    //     super(props)

    //     /*
    //     document.addEventListener("keyup", (event) => {
    //       let key = event.key.toUpperCase()
    //       console.log(key)
    //       this.props.onLetterChange(key)
    //     })
    //     */
    // }    
    
    render() {
      //console.log("currentState: " + this.state.currentGuess)
      return (
        <div className="keyboard">
          <div>
            <button className="keyboardButton"onClick={this.buttonPressed}>Q</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>W</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>E</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>R</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>T</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>Y</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>U</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>I</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>O</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>P</button>
          </div>
          <div>
            <button className="keyboardButton"onClick={this.buttonPressed}>A</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>S</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>D</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>F</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>G</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>H</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>J</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>K</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>L</button>
          </div>
          <div>
            <button className="keyboardButton"onClick={this.buttonPressed}>⏎</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>Z</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>X</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>C</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>V</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>B</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>N</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>M</button>
            <button className="keyboardButton"onClick={this.buttonPressed}>⌫</button>
          </div>
        </div>
      )
    }

    /*
    // TODO: How to handle keypress/ or keydown since keypress == dep

    //document.addEventListener("keydown", (event) => console.log(event.key))

    keyPressed(event) {
      this.buttonPressed(event);
    }
    */

    /*
      when letter buttonm is pressed update state to append value to current guess
      whenever state is updated, render the tiles of the current row
      if enter is pressed run checks and see if it can be submitted
    */
    
    buttonPressed = (event) => {
      var key = event.target.outerText
      this.props.onLetterChange(key)
    }
}

export default KeyboardContainer;
