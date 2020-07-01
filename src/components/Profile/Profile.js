import React, {Component} from 'react';
import './Profile.css';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import tempProfile from '../../temp-profile-pic.jpeg';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

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

class Profile extends Component {
    constructor(){
        super();
        this.state ={
            userPosts: [],
            user: {},
        }
        this.getUserPosts = this.getUserPosts.bind(this);
    }

    componentDidMount(){
        this.props.getUser()
        this.getUserPosts()
    }

    getUserPosts(){
        axios.get(`/api/sprout/user-posts/${this.props.match.params.user_id}`)
        .then(res => {
            console.log('res from getuser posts', res.data)
            this.setState({
                userPosts: res.data.posts,
                user: res.data.user[0],
            })
            console.log('set userposts in profile component to state')
        })
        .catch(err => {
            console.log(err)
        })
    }

   

    render(){
        console.log('params in url', this.props.match.params.user_id)
         return(
        <div className='profile-container'>
           <div className='profile-header'>
                <img 
                alt={this.state.user.username} 
                className='profile-img' 
                src={this.state.user.profile_pic === null ? tempProfile : this.state.user.profile_pic}
                />

                {/* tis will be profile pic soon when edit profile fxn added */}
                <div className='profile-header-info'>
                    <div className='profile-header-user-info'>
                    {this.state.user.first_name} {this.state.user.last_name}
                        <div className='profile-header-bio-info'>
                            {/* {this.props.user.bio} bio here */}
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

export default connect(mapStateToProps, {getUser})(Profile);