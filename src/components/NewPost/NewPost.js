import React, {Component} from 'react';
import './NewPost.css'

class NewPost extends Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div className='newpost-container'>
                <div className='newpost-title'>
                    New Post 
                </div>
                <div className='newpost-card-container'>
                    <div className='newpost-card'>
                        <div>
                            <div>Title</div> <input type='text' placeholder='post title'/>
                        </div>
                        <div>
                            <div>Image </div><input type='file'/>
                        </div>
                        <div>
                            <div>Description</div> <textarea/>
                        </div>
                        <div>
                            <div>Water</div> <input type='text' placeholder='amount of water'/>
                        </div>
                        <div>
                            <div>Sunlight </div><input type='text' placeholder='amount of sunlight exposure'/>
                        </div>  
                    </div>
                </div>
                
            </div>
        )
    }
   
    
}

export default NewPost;