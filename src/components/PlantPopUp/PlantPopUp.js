import React, {useState} from 'react';
import './PlantPopUp.css';
import {GrClose} from 'react-icons/gr';
import {GrEdit} from 'react-icons/gr';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

function PlantPopUp(props) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [water, setWater] = useState('')
    const [sunlight, setSunlight] = useState('')

    return (
        <div className='outer'>
            <GrClose className='close-icon' onClick={() => {props.handleClose()}}/>
            {props.user.user_id === props.post.user_id ? <GrEdit className='edit-icon' onClick={() => setEditMode(true)}/>  : ''}
            <div className='plant-pop-up-container'>
                {editMode === false ? 
                <div>{props.post.title}</div> : 
                <input value={props.post.title} onChange={(e) => setTitle(e.target.value)}></input> }
                
                <div><img className='pop-up-img' src={props.post.post_img} /></div>
                
                {editMode === false ? 
                <div>{props.post.description}</div> : 
                <input value={props.post.description} onChange={(e) => setDescription(e.target.value)}></input> } 
                
                {editMode === false ? 
                <div>{props.post.water}</div> : 
                <input value={props.post.water} onChange={(e) => setWater(e.target.value)}></input> }
                
                {editMode === false ? 
                <div>{props.post.sunlight}</div> : 
                <input value={props.post.sunlight} onChange={(e) => setSunlight(e.target.value)}></input> }
                
                <button onClick={() => setEditMode(false)}>Submit Changes</button>
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(PlantPopUp);