import React, {Component} from 'react';
import './NewPost.css';
import {IoIosWater} from 'react-icons/io';
import {FiSun} from 'react-icons/fi';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import axios from 'axios';


class NewPost extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            post_img: '',
            description: '',
            water: '',
            sunlight: '',
            user_id: null,
            image_file: null,
            image_preview: '',
        }
    }

   // Image Preview Handler
   handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }

    
    // Image/File Submit Handler
    handleSubmitFile = () => {
        if (this.state.image_file !== null){
            let formData = new FormData();
            formData.append('upl', this.state.image_file);
            axios.post(
                '/upload',
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },                    
                }
            )
            .then(res => {
                
                if(res.status === 200){
                    this.setState({
                        post_img: res.data
                    })
                console.log(`Success` + res.data);
                }
                else {
                    console.log('failed upload')
                    this.setState({
                        post_img: ''
                    })
                }
                
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    // handleCreatePost = () => {
    //     const {title, post_img, description, water, sunlight, user_id} = this.state
        
    // }

    setTitle = (val) => {this.setState({title: val})}
    setDescription = (val) => {this.setState({description: val})}
    setWater = (val) => {this.setState({water: val})}
    setSunlight = (val) => {this.setState({sunlight: val})}

 
    componentDidMount(){
        this.props.getUser()
        if(this.props.isLoggedIn === true){
            this.setState({
                user_id: this.props.user.user_id
            })
        }
    }

    render(){
        const {image_preview, title, description, water, sunlight} = this.state
        return(
            <div className='newpost-container'>
                <div className='newpost-title'>
                    New Plant Post 
                </div>
                <div className='newpost-card-container'>
                    <div className='newpost-card'>

                        <div>
                            <div className='newpost-label'>Title</div> 
                            <input type='text' placeholder='post title' className='newpost-input' value={title} onChange={(e) => {this.setTitle(e.target.value)}}/>
                        </div>

                        <div>
                            <div className='newpost-label'>Upload Image </div>
                            {image_preview === '' ? '' : <img className='newpost-img-preview' src={image_preview} alt="image preview"/>}
                            <input type='file' onChange={this.handleImagePreview} />
                        </div>

                        <div>
                            <div className='newpost-label'>Description</div> 
                            <textarea className='newpost-input description' value={description} onChange={(e) => {this.setDescription(e.target.value)}}/>
                        </div>

                        <div>
                            <div className='newpost-label'>Water<IoIosWater className='newpost-icon'/> </div>
                            <input type='text' placeholder='amount of water' className='newpost-input' value={water} onChange={(e) => {this.setWater(e.target.value)}}/>
                        </div>

                        <div>
                            <div className='newpost-label'>Sunlight<FiSun className='newpost-icon sun'/> </div>
                            <input type='text' placeholder='amount of sunlight exposure' className='newpost-input' value={sunlight} onChange={(e) => {this.setSunlight(e.target.value)}}/>
                        </div>  

                        <button className='newpost-post-btn' onClick={this.handleSubmitFile}>
                            Post Plant
                        </button>

                    </div>
                </div>
                
            </div>
        )
    }
   
    
}


const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(NewPost);