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
    height: 140,
  },
});

function MediaCard(){
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            Share
            </Button>
            <Button size="small" color="primary">
            Learn More
            </Button>
        </CardActions>
        </Card>
    );
}

class MainProfile extends Component {
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

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.match.params.user_id !== this.props.match.params.user_id) {
    //         this.getUserPosts()
    //     }
    //   }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevProps.user_id !== prevState.user_id && prevProps.user !== prevState.user) {
    //         this.getUserPosts()
    //     }
    // }

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

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log('next porps user_id', nextProps.match.params.user_id)
    //     console.log('preve state', prevState)
    //     if (nextProps.match.params.user_id !== prevState.user_id){
    //         return { user_id: nextProps.match.params.user_id }
    //    }
    //    return null;
    //  }

  

    render(){
        console.log('params in url', this.props.user.user_id)
         return(
        <div className='profile-container'>
           <div className='profile-header'>
                {this.state.user.first_name}
                <img className='profile-img' src={this.state.user.profile_pic === null ? tempProfile : this.state.user.profile_pic}/>
                {/* tis will be profile pic soon when edit profile fxn added */}
                <div className='profile-header-info'>
                    <div className='profile-header-user-info'>

                        <div className='profile-header-bio-info'>
                            {/* {this.props.user.bio} bio here */}
                        </div>
                    </div>
                </div>
           </div>

           <div>
                    {this.state.userPosts.map(elem => (
                        <div><MediaCard/></div>
                    ))}
            </div>
        </div>
        )
    }
   
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(MainProfile);