import React from 'react';
import WordDefinitionModal from './WordDefinitionModal';


class Message extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        console.log("showDef: ", this.props.showDefinition)
        // console.log("wordAPIResponse: ", this.props.wordAPIResponse)
    }

    showModal = e => {        
        this.setState({
            show: !this.state.show,
        });        
    };

    /*
    parseResponse(response) {
        // checked if empty response when fetching api
        // console.log("response", response)

        const word = response[0].word
        const meanings = response[0].meanings
        const wiki_url = response[0].sourceUrls.length > 0 ? response[0].sourceUrls[0] : ''
        const definition_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        return {word: word, meanings: meanings, wiki_url: wiki_url, definition_url: definition_url}
    }

    getDefinition(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        // const url = `https://api.dictionaryapi.dev/api/v2/entries/en/spain`
        return fetch(url)
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => console.log(error))
      }
      */
  
    componentDidMount() {
        console.log("message mount")
        /*
        // fetch API
        this.getDefinition(this.props.word)
            .then(data => {
                // console.log(data)
                return this.parseResponse(data)
            })
            .then(parsedData => {
                console.log("setting dictionary api response to state")
                this.setState({
                    wordAPIResponse: parsedData
                })
            }).catch(error => console.log(error))
            */
    }

    resetModal = e => {
        this.setState({
            show: false
        }); 
    }

    render() {
        let showDefinitionButton;
        let wordDefinitionModal;
        if (this.props.showDefinition) {
            showDefinitionButton = <button onClick={this.showModal}>See definition</button>
            wordDefinitionModal = <WordDefinitionModal word={this.props.word} show={this.state.show} definition={this.props.wordAPIResponse} resetModal={this.resetModal} />
        }
        return(
            <div className='messages'>
                <h3>{this.props.message}</h3>
                {showDefinitionButton}
                {wordDefinitionModal}
            </div>
        )
    }
}

export default Message;