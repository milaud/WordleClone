import React from 'react'

class Tile extends React.Component {
    constructor(props) {
        super(props)
        /*
        for (const key in props) {
            console.log(key)
        }
        */
    }

    render() {
        //return (<span className={"tile tile" + this.props.index}>{this.props.active ? this.props.letter: ''}</span>)
        return (<span className={"tile tile" + this.props.index}>{this.props.letter}</span>)
    }

}

export default Tile;