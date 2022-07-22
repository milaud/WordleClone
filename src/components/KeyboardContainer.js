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
            <button className="button-small pure-button"onClick={this.buttonPressed}>Q</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>W</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>E</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>R</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>T</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>Y</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>U</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>I</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>O</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>P</button>
          </div>
          <div>
            <button className="button-small pure-button"onClick={this.buttonPressed}>A</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>S</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>D</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>F</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>G</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>H</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>J</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>K</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>L</button>
          </div>
          <div>
            <button className="button-small pure-button"onClick={this.buttonPressed}>⏎</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>Z</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>X</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>C</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>V</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>B</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>N</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>M</button>
            <button className="button-small pure-button"onClick={this.buttonPressed}>⌫</button>
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
