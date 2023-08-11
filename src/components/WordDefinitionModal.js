import React from 'react'

class WordDefinitionModal extends React.Component {
    constructor(props) {
        super(props)
        console.log("show", props.show)
        console.log("definition", props.definition)
    }

    componentWillUnmount() {
      console.log("unmounting word modal")
      this.props.resetModal()
    }
    
    render() {
      if (!this.props.show) {
        return null;
      }

      if (this.props.definition == undefined) {
        
        return (
          <div className="modal" id="modal">
            <h5>{this.props.word}</h5>
            <h5>Unable to fetch from dictionary API</h5>
          </div>
        );
      } else {
        const definitions = this.props.definition.meanings.map((meaning, index) => {
          return (<li key={index}> {meaning.partOfSpeech} - {meaning.definitions[0].definition} </li>)
        })
        
        return (
          <div className="modal" id="modal">
            <h5>{this.props.word}</h5>
            <ul>
              {definitions}
            </ul>
            <div className='links'>
              <a target="_blank" href={this.props.definition.wiki_url}>Wiki »</a>
              <br></br>
              <a target="_blank" href={this.props.definition.definition_url}>More »</a>
            </div>
          </div>
        );
      }
    }
}

export default WordDefinitionModal;