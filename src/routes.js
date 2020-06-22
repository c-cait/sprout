import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Post from './components/Post/Post';
import NewPost from './components/NewPost/NewPost';


export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/home' component={Home}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/post/:postid' component={Post}/>
        <Route path='/new' component={NewPost}/>
    </Switch>
)