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
            fileUrl: '',
            file: '', 
            filename: ''
        }
    }

    handleChange = e => {
        const file = e.target.files[0]
        this.setState({
            fileUrl: URL.createObjectURL(file),
            file,
            filename: file.name
        })
    }

    saveFile = () => {
        const {fileUrl} = this.state
        axios.post('/aws/s3', {fileUrl})
        .then(() => {
            console.log('success saved file')
            this.setState({
                fileUrl: '',
                file: '',
                filename: ''
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    setTitle = (val) => {this.setState({title: val})}

    setPostImg = (e) => {this.setState({})}

    setDescription = (val) => {this.setState({description: val})}
    setWater = (val) => {this.setState({water: val})}
    setSunlight = (val) => {this.setState({sunlight: val})}

 
    componentDidMount(){
        this.props.getUser()
    }

    render(){
        const {title, post_img, description, water, sunlight} = this.state
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
                            <input type='file' onChange={this.handleChange}/>
                            <img src={this.state.fileUrl} />
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

                        <button className='newpost-post-btn' onClick={this.saveFile}>
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