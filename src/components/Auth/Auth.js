import React, {useState} from 'react';
import './Auth.css';
import {GiLindenLeaf} from 'react-icons/gi';
import LandingGallery from './LandingGallery';

function Login() {
    const [register, setRegister] = useState(null)

    return(
    <div>
        <div className="login-container">
            <div className='login-section'>
                <div className='login-title'>
                    Sprout<GiLindenLeaf className='logo-leaf-icon-login'/>
                </div>

                <form className='login-form'>

                    <input type='text' className='login-input' placeholder='username' required></input>
                    <input type='password' className='login-input' placeholder='password' required></input>

                    {register === 'register' ? 
                    <input type='text' className='login-input' placeholder='profile picture' required></input> :
                    '' }
                    
                    {register !== 'register' ? 
                    <button className='login-btn'>Login</button> 
                    :
                    <button className='login-btn'>Sign Up</button>}

                </form>

                {register !== 'register' ? 
                <div className='sign-up-div'>
                    Don't have an account? &ensp;
                        <button className='login-btn'
                        onClick={() => setRegister('register')}
                        >Sign Up</button>
                </div>
                :
                <button onClick={() => setRegister(null)} className='login-btn'>Back to Login</button> }
            </div>
        </div>

        <LandingGallery/>
    </div>
    )
}

export default Login;