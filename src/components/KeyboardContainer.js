import React from 'react'


class KeyboardContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
      return (
        <div className="keyboard-container">
          <div className="keyboard">
            <div>
              <button id="Q" className="keyboardButton"onClick={this.buttonPressed}>Q</button>
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
              <button className="keyboardButton specialKey"onClick={this.buttonPressed}>⏎</button>
              <button className="keyboardButton"onClick={this.buttonPressed}>Z</button>
              <button className="keyboardButton"onClick={this.buttonPressed}>X</button>
              <button className="keyboardButton"onClick={this.buttonPressed}>C</button>
              <button className="keyboardButton"onClick={this.buttonPressed}>V</button>
              <button className="keyboardButton"onClick={this.buttonPressed}>B</button>
              <button className="keyboardButton"onClick={this.buttonPressed}>N</button>
              <button className="keyboardButton"onClick={this.buttonPressed}>M</button>
              <button className="keyboardButton specialKey"onClick={this.buttonPressed}>⌫</button>
            </div>
          </div>
        </div>
      )
    }

    buttonPressed = (event) => {
      var key = event.target.outerText
      this.props.onLetterChange(key)
    }
}

export default KeyboardContainer;
