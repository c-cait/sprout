import React, {useState} from 'react';
import './Auth.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {GiLindenLeaf} from 'react-icons/gi';
import LandingGallery from './LandingGallery';

function Login() {
    const [register, setRegister] = useState(null)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory();

    function registerUser(e){
        if(first_name, last_name, email, username, password){
            e.preventDefault(e)
            axios.post('/api/auth/register', {first_name, last_name, email, username, password})
            .then(res => {
                console.log(res.data)
                history.push('/home')
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            alert('please fill out all the fields')
        }
    }

    function loginUser(e){
        if(username, password){
            e.preventDefault();
            axios.post('/api/auth/login', {username, password})
            .then( res => {
                console.log(res.data)
                history.push('/home')
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
        } else {
            alert('please fill out all the fields')
        }
    }
    

    return(
    <div>
        <div className="login-container">
            <div className='login-section'>
                <div className='login-title'>
                    Sprout<GiLindenLeaf className='logo-leaf-icon-login'/>
                </div>

                <form className='login-form'>

                    {register === 'register' ? 
                        <div className='sign-up-line'>
                            <input onChange={(e) => setFirstName(e.target.value)} value={first_name} type='text' className='sign-up-input' placeholder='first name' maxLength='30' required/>
                            <input onChange={(e) => setLastName(e.target.value)} value={last_name} type='text' className='sign-up-input' placeholder='last name' maxLength='30' required/>
                        </div>
                    :
                    '' }

                    {register === 'register' ? 
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type='text' className='login-input' placeholder='email' maxLength='100' required/>
                    :
                    '' }

                    <input onChange={(e) => setUsername(e.target.value)} value={username} type='text' className='login-input' placeholder='username' maxLength='20' required/>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' className='login-input' placeholder='password'  required/>
                    
                    {register !== 'register' ? 
                    <button onClick={(e) => loginUser(e)} className='login-btn'>Login</button> 
                    :
                    <button onClick={(e) => registerUser(e)} className='login-btn'>Sign Up</button>}

                </form>

                {register !== 'register' ? 
                <div className='sign-up-div'>
                    Don't have an account? &ensp;
                        <button className='login-btn'
                        onClick={() => setRegister('register')}
                        // onClick={() => {history.push('/home')}}
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