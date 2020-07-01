import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css'
import {getUser} from '../../redux/reducer';
import Post from '../Post/Post'
import axios from 'axios';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
    }

    getAllPosts() {
        axios.get('/api/sprout/posts')
        .then(res => {
            this.setState({
                posts: res.data
            })
            console.log('posts', this.state.posts)
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.props.getUser()
        this.getAllPosts()
    }

    render(){
        return(
            <div className='home-container'>
                <div>
                    Welcome, {this.props.user.username}
                </div>
                <div className='home-posts-container'>
                    {this.state.posts.map(elem => (
                        <Post key={elem.post_id} post={elem}/>
                     ))}
                </div>
            
            </div>
            
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(Home);