import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css'
import {getUser} from '../../redux/reducer';

class Home extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount(){
        this.props.getUser()
    }

    render(){
        return(
            <div className='home-container'>
                Welcome, {this.props.user.username}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(Home);