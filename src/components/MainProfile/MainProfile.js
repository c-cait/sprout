import React, {Component} from 'react';
import './MainProfile.css';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import tempProfile from '../../temp-profile-pic.jpeg';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
});

function MediaCard(props){
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={props.post.post_img}
            />
        </CardActionArea>
        </Card>
    );
}

class MainProfile extends Component {
    constructor(){
        super();
        this.state ={
            userPosts: [],
            user: {},
            editProfile: false,
            bio: '',
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

    toggleEdit(){
        this.setState({
            editProfile: !this.state.editProfile
        })
        console.log('edit toggled')
    }
  

    render(){
        console.log('params in url', this.props.user.user_id)
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
                            {this.state.user.bio === null ? '': this.state.user.bio}
                            {this.state.editProfile === true ?
                            <input placeholder='profile bio goes here' className='bio-input'></input> : ''}
                        </div>
                    </div>
                </div>
           </div>

           <div>
                    {this.state.userPosts.map(elem => (
                        <div key={elem.post_id}><MediaCard post={elem}/></div>
                    ))}
            </div>
        </div>
        )
    }
   
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(MainProfile);