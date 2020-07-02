import React from 'react';
import './PlantPopUp.css';

function PlantPopUp(props) {

    return (
        <div className='plant-pop-up-container'>
            pop up {props.post.title}
            <button onClick={() => props.handleClose()}>

            </button>
        </div>
    )
}

export default PlantPopUp;