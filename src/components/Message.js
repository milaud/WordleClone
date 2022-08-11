import React from 'react';
import WordDefinitionModal from './WordDefinitionModal';


class Message extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            wordAPIResponse: {}
        }
    }

    showModal = e => {        
        this.setState({
            show: !this.state.show,
        });        
    };

    parseResponse(response) {
        // checked if empty response when fetching api
        // console.log("response", response)

        const word = response[0].word
        const meanings = response[0].meanings
        const url = response[0].sourceUrls.length > 0 ? response[0].sourceUrls[0] : ''
        return {word: word, meanings: meanings, url: url}
    }

    getDefinition(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        // const url = `https://api.dictionaryapi.dev/api/v2/entries/en/spain`
        return fetch(url)
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => console.log(error))
      }
  
    componentDidMount() {
        // fetch API
        this.getDefinition(this.props.word)
            .then(data => {
                // console.log(data)
                return this.parseResponse(data)
            })
            .then(parsedData => {
                console.log("setting state")
                this.setState({
                    wordAPIResponse: parsedData
                })
            }).catch(error => console.log(error))
    }

    componentWillUnmount() {
        console.log("unmounting")
        this.setState({
            show: false,
            wordAPIResponse: {}
        });
    }

    render() {
        let showDefinitionButton;  
        let wordDefinitionModal;      
        if (this.props.showDefinition) {
            showDefinitionButton = <button onClick={this.showModal}>See definition</button>
            wordDefinitionModal = <WordDefinitionModal word={this.props.word} show={this.state.show} definition={this.state.wordAPIResponse} />
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