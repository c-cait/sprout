import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import './Home.css'
import {getUser} from '../../redux/reducer';
import Post from '../Post/Post'
import axios from 'axios';

function Home(props) {
    const [posts, setPosts] = useState([])

   useEffect(() => {
        props.getUser()
        getAllPosts()
    })

    const getAllPosts = () => {
        axios.get('/api/sprout/posts')
        .then(res => {
            setPosts(res.data)
            console.log('posts', posts)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div className='home-container'>
            <div>
                Welcome, {props.user.username}
            </div>
            <div className='home-posts-container'>
                {posts.map(elem => (
                    <Post key={elem.post_id} post={elem} getAllPosts={getAllPosts}/>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(Home);
