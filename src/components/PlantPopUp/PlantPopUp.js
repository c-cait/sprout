import React, {useState} from 'react';
import './PlantPopUp.css';
import {GrClose} from 'react-icons/gr';
import {GrEdit} from 'react-icons/gr';
import {FaTrashAlt} from 'react-icons/fa';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import axios from 'axios'

function PlantPopUp(props) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [water, setWater] = useState('')
    const [sunlight, setSunlight] = useState('')

    const submitChanges = () => {
        const {user_id} = props.user
        const {post_id} = props.post
        axios.put('/api/sprout/post', {title, description, water, sunlight, user_id, post_id})
        .then( res => {
            console.log('changes attempted')
        })
        .catch( err => {
            console.log(err)
        })
    }

    const deletePost = () => {
        axios.delete(`/api/sprout/post/${props.post.post_id}`)
        .then(res => {
            console.log('attempted to delte post')
        })
        .catch( err => {
            console.log(err)
        })
    }

    return (
        <div className='outer'>
            <GrClose className='close-icon' onClick={() => {props.handleClose()}}/>
            {props.user.user_id === props.post.user_id ? <GrEdit className='edit-icon' onClick={() => setEditMode(true)}/>  : ''}
            {props.user.user_id === props.post.user_id ? <FaTrashAlt className='trash-icon' onClick={() => deletePost()}/>  : ''}
            <div className='plant-pop-up-container'>
                {editMode === false ? 
                <div className='pop-up-title'>{props.post.title}</div> : 
                <input value={title} placeholder={props.post.title} onChange={(e) => setTitle(e.target.value)}></input> }
                
                <div><img className='pop-up-img' src={props.post.post_img} /></div>
                
                {editMode === false ? 
                <div className='pop-up-description'>{props.post.description}</div> : 
                <input value={description} placeholder={props.post.description} onChange={(e) => setDescription(e.target.value)}></input> } 
                
                {editMode === false ? 
                <div className='pop-up-water-sun'><span className='pop-up-label'>Water:</span> {props.post.water}</div> : 
                <input value={water} placeholder={props.post.water} onChange={(e) => setWater(e.target.value)}></input> }
                
                {editMode === false ? 
                <div className='pop-up-water-sun'> <span className='pop-up-label'>Sunlight:</span> {props.post.sunlight}</div> : 
                <input value={sunlight} placeholder={props.post.sunlight} onChange={(e) => setSunlight(e.target.value)}></input> }
                
                {editMode === false ? '' : <button onClick={() => {setEditMode(false); submitChanges()}}>Submit Changes</button> }
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(PlantPopUp);