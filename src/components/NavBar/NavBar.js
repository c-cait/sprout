import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import {GiLindenLeaf} from 'react-icons/gi';

function NavBar() {

    return(
        <div className='nav-container'>

            
            <div className='nav-icon-container'>
                <GiLindenLeaf className='sprout-nav-icon'/>
            </div> 
            
            <div className='nav-btns'>
                <Link to='/home'>
                    <IconButton aria-label="home">
                        <HomeRoundedIcon />
                    </IconButton>
                </Link>

                <Link to='/profile'>
                    <IconButton aria-label="profile">
                        <PersonIcon />
                    </IconButton>
                </Link>
                
                <Link to='/new'>
                    <IconButton aria-label="new post">
                        <PostAddRoundedIcon />
                    </IconButton>
                </Link>
            </div>
        
        </div>
    )
}

export default NavBar;