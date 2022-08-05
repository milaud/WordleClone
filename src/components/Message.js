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
        // fetch definition API call here
        /*
        var simpleData;
        this.getDefinition(this.props.word)
            .then(data => {
                //parse data
                //console.log(data)
                return this.parseResponse(data)
            })
            .then(parsedData => {
                //console.log(parsedData)
                this.setState({
                    show: !this.state.show,
                    wordAPIResponse: parsedData
                })
                //simpleData = parsedData
            })
        console.log(this.state)
        */
        
        this.setState({
            show: !this.state.show,
        });

        this.getDefinition(this.props.word)
            .then(data => {
                //parse data
                //console.log(data)
                return this.parseResponse(data)
            })
            .then(parsedData => {
                console.log(`parsed data`)
                console.log(parsedData)
                console.log(this.state.wordAPIResponse)
                if (this.state.wordAPIResponse == {}) {
                    console.log("fetching api response")
                    this.setState({
                        show: !this.state.show,
                        wordAPIResponse: parsedData
                    })
                } else {
                    console.log("already fetched api")
                }
                // this.setState({
                //     show: !this.state.show,
                //     wordAPIResponse: parsedData
                // })
            }).catch(error => console.log(error))
        // console.log(this.state)
    };

    parseResponse(response) {
        // checked if empty response when fetching api
        const word = response[0].word
        const meanings = response[0].meanings
        const url = response[0].sourceUrls.length > 0 ? response[0].sourceUrls[0] : ''
        const simpleResponse = {word: word, meanings: meanings, url: url}
        return simpleResponse
    }


    // fetch definition api
    getDefinition(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .catch((error) => console.log(error))

        // if (this.state.wordAPIResponse !== {}) {
        //     console.log("already made API call", this.state.wordAPIResponse)
        //     return
        // }

        return fetch(url)
            .then(response => {
                //this.parseResponse(response.json())
                return response.json()
            })
            .then(data => {
                // check if list or empty object?
                if (data.length === 0) {
                    console.log(`Empty response: ${data}`)
                    return
                }
                //console.log(data)
                return data
            })
            .catch((error) => console.log(error))
      }
  

    render() {
        // console.log(this.state)
        let showDefinitionButton;
        if (this.props.showDefinition) {
            showDefinitionButton = <button onClick={this.showModal}>See definition</button>
        }
        

        return(
            <div className='messages'>
                <h3>{this.props.message}</h3>
                {/* <h3>Word</h3> */}
                {/* <button onClick={this.showModal}>See definition</button> */}
                {showDefinitionButton}
                <WordDefinitionModal word={this.props.word} show={this.state.show} />
            </div>
        )
    }
}

export default Message;