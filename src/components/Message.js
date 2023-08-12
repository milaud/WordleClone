import React from 'react';
import WordDefinitionModal from './WordDefinitionModal';

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    showModal = e => {
        this.setState({
            show: !this.state.show,
        });
    };

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
        return (
            <div className='messages'>
                <h3>{this.props.message}</h3>
                {showDefinitionButton}
                {wordDefinitionModal}
            </div>
        )
    }
}

export default Message;