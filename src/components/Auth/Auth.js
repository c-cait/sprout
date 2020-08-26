import React, {useState} from 'react';
import './Auth.css';
import axios from 'axios';
import {GiLindenLeaf} from 'react-icons/gi';
import LandingGallery from './LandingGallery';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/reducer';
import { render } from '@testing-library/react';

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


const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser})(Login);

// class Login extends Component {
//     constructor(){
//         super();
//         this.state = {
//             register: null,
//             first_name: '',
//             last_name: '',
//             email: '',
//             username: '',
//             password: ''
//         }
//     }
    // const [register, setRegister] = useState(null)
    // const [user_id, setUser_id] = useState('')
    // const [first_name, setFirstName] = useState('')
    // const [last_name, setLastName] = useState('')
    // const [email, setEmail] = useState('')
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    // let history = useHistory();
    // setRegister = (val) => {this.setState({register: val})}
    // setFirstName = (val) => {this.setState({first_name: val})}
    // setLastName = (val) => {this.setState({last_name: val})}
    // setEmail = (val) => {this.setState({email: val})}
    // setUsername = (val) => {this.setState({username: val})}
    // setPassword = (val) => {this.setState({password: val})}

    // registerUser = (e) => {
    //     const { first_name, last_name, email, username, password } = this.state
    //     if(first_name && last_name && email && username && password){
    //         e.preventDefault(e)
    //         axios.post('/api/auth/register', {first_name, last_name, email, username, password})
    //         .then(res => {
    //             this.props.loginUser(res.data)
    //             this.props.history.push('/home')
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    //     } else {
    //         alert('please fill out all the fields')
    //     }
    // }

    // loginUser = (e) => {
    //     const { username, password } = this.state
    //     if(username && password){
    //         e.preventDefault();
    //         axios.post('/api/auth/login', {username, password})
    //         .then( res => {
    //             console.log(res.data)
    //             this.props.loginUser(res.data)
    //             this.props.history.push('/home')
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             alert('username or password is incorrect')
    //         })
    //     } else {
    //         alert('please fill out all the fields')
    //     }
    // }
    
//     render(){
//         const { register, first_name, last_name, email, username, password } = this.state
//         return(
//         <div>
//             <div className="login-container">
//                 <div className='login-section'>
//                     <div className='login-title'>
//                         Sprout<GiLindenLeaf className='logo-leaf-icon-login'/>
//                     </div>

//                     <form className='login-form'>

//                         {register === 'register' ? 
//                             <div className='sign-up-line'>
//                                 <input onChange={(e) => this.setFirstName(e.target.value)} value={first_name} type='text' className='sign-up-input' placeholder='first name' maxLength='30' required/>
//                                 <input onChange={(e) => this.setLastName(e.target.value)} value={last_name} type='text' className='sign-up-input' placeholder='last name' maxLength='30' required/>
//                             </div>
//                         :
//                         '' }

//                         {register === 'register' ? 
//                             <input onChange={(e) => this.setEmail(e.target.value)} value={email} type='text' className='login-input' placeholder='email' maxLength='100' required/>
//                         :
//                         '' }

//                         <input onChange={(e) => this.setUsername(e.target.value)} value={username} type='text' className='login-input' placeholder='username' maxLength='20' required/>
//                         <input onChange={(e) => this.setPassword(e.target.value)} value={password} type='password' className='login-input' placeholder='password'  required/>
                        
//                         {register !== 'register' ? 
//                         <button onClick={(e) => this.loginUser(e)} className='login-btn'>Login</button> 
//                         :
//                         <button onClick={(e) => this.registerUser(e)} className='login-btn'>Sign Up</button>}

//                     </form>

//                     {register !== 'register' ? 
//                     <div className='sign-up-div'>
//                         Don't have an account? &ensp;
//                             <button className='login-btn'
//                             onClick={() => this.setRegister('register')}
//                             // onClick={() => {history.push('/home')}}
//                             >Sign Up</button>
//                     </div>
//                     :
//                     <button onClick={() => this.setRegister(null)} className='login-btn'>Back to Login</button> }
//                 </div>
//             </div>

//             <LandingGallery/>
//         </div>
//         )
//     }
// }


// const mapStateToProps = state => state

// export default connect(mapStateToProps, {loginUser})(Login);




