import React, {Component} from 'react';
import './NewPost.css';
import {IoIosWater} from 'react-icons/io';
import {FiSun} from 'react-icons/fi'

class NewPost extends Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div className='newpost-container'>
                <div className='newpost-title'>
                    New Plant Post 
                </div>
                <div className='newpost-card-container'>
                    <div className='newpost-card'>
                        <div>
                            <div className='newpost-label'>Title</div> <input type='text' placeholder='post title' className='newpost-input'/>
                        </div>
                        <div>
                            <div className='newpost-label'>Upload Image </div><input type='file' />
                        </div>
                        <div>
                            <div className='newpost-label'>Description</div> <textarea className='newpost-input description'/>
                        </div>
                        <div>
                            <div className='newpost-label'>Water<IoIosWater className='newpost-icon'/> </div><input type='text' placeholder='amount of water' className='newpost-input'/>
                        </div>
                        <div>
                            <div className='newpost-label'>Sunlight<FiSun className='newpost-icon sun'/> </div><input type='text' placeholder='amount of sunlight exposure' className='newpost-input'/>
                        </div>  
                        <button className='newpost-post-btn'>
                            Post Plant
                        </button>
                    </div>
                </div>
                
            </div>
        )
    }
   
    
}

export default NewPost;