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
            <button id="Q" className="keyboardButton" onClick={this.buttonPressed}>Q</button>
            <button id="W" className="keyboardButton" onClick={this.buttonPressed}>W</button>
            <button id="E" className="keyboardButton" onClick={this.buttonPressed}>E</button>
            <button id="R" className="keyboardButton" onClick={this.buttonPressed}>R</button>
            <button id="T" className="keyboardButton" onClick={this.buttonPressed}>T</button>
            <button id="Y" className="keyboardButton" onClick={this.buttonPressed}>Y</button>
            <button id="U" className="keyboardButton" onClick={this.buttonPressed}>U</button>
            <button id="I" className="keyboardButton" onClick={this.buttonPressed}>I</button>
            <button id="O" className="keyboardButton" onClick={this.buttonPressed}>O</button>
            <button id="P" className="keyboardButton" onClick={this.buttonPressed}>P</button>
          </div>
          <div>
            <button id="A" className="keyboardButton" onClick={this.buttonPressed}>A</button>
            <button id="S" className="keyboardButton" onClick={this.buttonPressed}>S</button>
            <button id="D" className="keyboardButton" onClick={this.buttonPressed}>D</button>
            <button id="F" className="keyboardButton" onClick={this.buttonPressed}>F</button>
            <button id="G" className="keyboardButton" onClick={this.buttonPressed}>G</button>
            <button id="H" className="keyboardButton" onClick={this.buttonPressed}>H</button>
            <button id="J" className="keyboardButton" onClick={this.buttonPressed}>J</button>
            <button id="K" className="keyboardButton" onClick={this.buttonPressed}>K</button>
            <button id="L" className="keyboardButton" onClick={this.buttonPressed}>L</button>
          </div>
          <div>
            <button id="⏎" className="keyboardButton specialKey" onClick={this.buttonPressed}>⏎</button>
            <button id="Z" className="keyboardButton" onClick={this.buttonPressed}>Z</button>
            <button id="X" className="keyboardButton" onClick={this.buttonPressed}>X</button>
            <button id="C" className="keyboardButton" onClick={this.buttonPressed}>C</button>
            <button id="V" className="keyboardButton" onClick={this.buttonPressed}>V</button>
            <button id="B" className="keyboardButton" onClick={this.buttonPressed}>B</button>
            <button id="N" className="keyboardButton" onClick={this.buttonPressed}>N</button>
            <button id="M" className="keyboardButton" onClick={this.buttonPressed}>M</button>
            <button id="⌫" className="keyboardButton specialKey" onClick={this.buttonPressed}>⌫</button>
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
