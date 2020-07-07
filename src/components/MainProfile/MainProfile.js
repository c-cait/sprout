import React, {Component, useState} from 'react';
import './MainProfile.css';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import tempProfile from '../../temp-profile-pic.png';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import PlantPopUp from '../PlantPopUp/PlantPopUp';
import {GrEdit} from 'react-icons/gr';
import {MdAddCircleOutline} from 'react-icons/md';


const useStyles = makeStyles({
  root: {
    maxWidth: 450,
    marginTop: 50,
    marginRight: 0
  },
  media: {
    height: 240,
  },
});

function MediaCard(props){
    const classes = useStyles();

    const [popUp, setPopUp] = useState(false)

    const handleOpen = () => {
        setPopUp(true)
    }
    
    const handleClose = () =>{
        setPopUp(false)
    }

    return (
        <div>
            {popUp === true ? <PlantPopUp handleClose={handleClose} post={props.post} getAllPosts={props.getUserPosts}/> : ''}
            <Card className={classes.root} onClick={() => {handleOpen(); console.log('lcikced')}}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={props.post.post_img}
                />
            </CardActionArea>
            </Card>
        </div>
    );
}

class MainProfile extends Component {
    constructor(){
        super();
        this.state ={
            userPosts: [],
            user: {},
            editMode: false,
            profile_pic: ''
        }
        this.getUserPosts = this.getUserPosts.bind(this);
    }

    componentDidMount(){
        this.props.getUser()
        this.getUserPosts()
    }

    getUserPosts(){
        axios.get(`/api/sprout/user-posts/${this.props.user.user_id}`)
        .then(res => {
            console.log('res from getuser posts', res.data)
            this.setState({
                userPosts: res.data.posts,
                user: res.data.user[0]
            })
            console.log('set userposts in profile component to state')
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleEditOpen(){
        this.setState({
            editMode: true
        })
        console.log('edit toggled')
    }

    handleEditClose(){
        this.setState({
            editMode: false
        })
    }

    handleAddBio(){
        const {bio} = this.state.user
        const {user_id} = this.state.user
        axios.put('/api/sprout/bio', {bio, user_id})
        .then(res => {
            this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    bio: res.data
                }
            }))
            console.log('updated bio')
        })
        .catch(err => {
            console.log(err)
        })
    }
  

    render(){
         return(
        <div className='profile-container'>
           <div className='profile-header'>
                <img 
                alt={this.state.user.username} 
                className='profile-img pointer' 
                src={this.state.user.profile_pic === null ? tempProfile : this.state.user.profile_pic}
                onClick={() => {this.toggleEdit()}}
                />
                {/* tis will be profile pic soon when edit profile fxn added */}
                <div className='profile-header-info'>
                    <div className='profile-header-user-info'>
                    {this.state.user.first_name} {this.state.user.last_name}

                        <div className='profile-header-bio-info'>
                            {this.state.user.bio === null ? '': (this.state.editMode === true ? '' : this.state.user.bio)}

                            {this.state.editMode === true ?
                            <input placeholder='profile bio goes here' className='bio-input' value={this.state.user.bio}
                            onChange={(e) => {
                                let newVal = e.target.value
                                this.setState(prevState => ({
                                user: {
                                    ...prevState.user,
                                    bio: newVal
                                }
                            }))}}
                            ></input> : ''}
                        </div>
                    
                    </div>
                </div>
                        {this.state.editMode === true ? <MdAddCircleOutline className='profile-edit' onClick={() => {this.handleEditClose(); this.handleAddBio()}}/> : 
                        <GrEdit className='profile-edit' onClick={() => this.handleEditOpen()}/> }
           </div>

           <div>
                {this.state.userPosts.map(elem => (
                    <div key={elem.post_id}><MediaCard post={elem} getUserPosts={this.getUserPosts}/></div>
                ))}
            </div>
        </div>
        )
    }
   
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(MainProfile);