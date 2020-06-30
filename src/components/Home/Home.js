import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css'
import {getUser} from '../../redux/reducer';
import axios from 'axios';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            image: ''
        }
    }

   encode(data){
        var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
        return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
    }

    componentDidMount(){
        this.props.getUser()
        axios.get('http://localhost:3001/test')
        .then(res => {
            console.log('res', this.encode(res.data.Body.data))

            this.setState({image: this.encode(res.data.Body.data)})
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    render(){
        const {image} = this.state
        return(
            <div>
                <div className='home-container'>
                Welcome, {this.props.user.username}
            </div>
             <img src={`data:image/png;base64,${image}`}/>
            </div>
            
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(Home);