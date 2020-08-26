import React, {useState} from 'react';
import './Auth.css';
import axios from 'axios';
import {GiLindenLeaf} from 'react-icons/gi';
import LandingGallery from './LandingGallery';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/reducer';
import Grid from '@material-ui/core/Grid';


function Login(props) {
    const [register, setRegister] = useState(null)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = (e) => {
        if(first_name && last_name && email && username && password){
            e.preventDefault(e)
            axios.post('/api/auth/register', {first_name, last_name, email, username, password})
            .then(res => {
                props.loginUser(res.data)
                props.history.push('/home')
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            alert('please fill out all the fields')
        }
    }

    const loginUser = (e) => {
        if(username && password){
            e.preventDefault();
            axios.post('/api/auth/login', {username, password})
            .then( res => {
                console.log(res.data)
                props.loginUser(res.data)
                props.history.push('/home')
            })
            .catch(err => {
                console.log(err)
                alert('username or password is incorrect')
            })
        } else {
            alert('please fill out all the fields')
        }
    }


    return(
        <Grid container >
           
               <LandingGallery/> 
            
            <Grid container item xs={12} md={6} display='flex' justify='center' alignItems='center' style={{height: '100vh'}}>
            <div className="login-container">
                <div className='login-section'>
                    <div className='login-title'>
                        Sprout<GiLindenLeaf className='logo-leaf-icon-login'/>
                    </div>

                    <form className='login-form'>

                        {register === 'register' ? 
                            <div className='sign-up-line'>
                                <input onChange={(e) => setFirstName(e.target.value)} value={first_name} type='text' className='sign-up-input login-input' placeholder='first name' maxLength='30' required/>
                                <input onChange={(e) => setLastName(e.target.value)} value={last_name} type='text' className='sign-up-input login-input' placeholder='last name' maxLength='30' required/>
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

            </Grid>
        </Grid>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser})(Login);




