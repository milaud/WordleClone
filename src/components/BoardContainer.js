import React from 'react'
import BoardRow from './BoardRow'


const BoardContainer = (props) => {

    return (
        <div className='board'>
            <BoardRow state={props} row={0}/>
            <BoardRow state={props} row={1}/>
            <BoardRow state={props} row={2}/>
            <BoardRow state={props} row={3}/>
            <BoardRow state={props} row={4}/>
            <BoardRow state={props} row={5}/>
        </div>
    )
}

export default BoardContainer;