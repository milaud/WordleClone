import React from 'react'

class WordDefinitionModal extends React.Component {
    constructor(props) {
        super(props)
        //console.log("hoi", props.definition)
    }

    componentWillUnmount() {
      console.log("unmounting 2")
      
    }
    
    render() {
      if (!this.props.show) {
        return null;
      }

      const definitions = this.props.definition.meanings.map((meaning, index) => {
        return (<li key={index}> {meaning.partOfSpeech} - {meaning.definitions[0].definition} </li>)
      })
      
      return (
        <div className="modal" id="modal">
          <h5>{this.props.word}</h5>
          <ul>
            {definitions}
          </ul>
          <a target="_blank" href={this.props.definition.url}>More »</a>
        </div>
      );
    }
}

export default WordDefinitionModal;