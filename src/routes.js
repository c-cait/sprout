import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import MainProfile from './components/MainProfile/MainProfile';
import Post from './components/Post/Post';
import NewPost from './components/NewPost/NewPost';
import FileUpload from './fileupload';


export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/home' component={Home}/>
        <Route path='/profile/:user_id' component={Profile}/>
        <Route path='/main/profile' component={MainProfile}/>
        <Route path='/post/:postid' component={Post}/>
        <Route path='/new' component={NewPost}/>
        <Route path='/fileupload' component={FileUpload}/>
    </Switch>
)