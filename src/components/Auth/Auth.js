import React from 'react';
import './Auth.css';
import {GiLindenLeaf} from 'react-icons/gi';

function Auth() {

    return(
    <div>
        <div className="login-container">
            <div className='login-section'>
                <div className='login-title'>
                    Sprout<GiLindenLeaf className='logo-leaf-icon-login'/>
                </div>
                <form className='login-form'>
                    <input type='text' className='login-input' placeholder='username'></input>
                    <input type='password' className='login-input' placeholder='password'></input>
                    <button className='login-btn'
                    >Login</button>
                </form>
                <div className='sign-up-div'>
                    Don't have an account? 
                        <a href='#' className='sign-up-btn'>Sign Up</a>
                </div>
            </div>
        </div>

        <ul className='slideshow'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    )
}

export default Auth;