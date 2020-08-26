import React from 'react';
import './LandingGallery.css';
import Grid from '@material-ui/core/Grid';

function LandingGallery() {

    return(
        <Grid item xs={12} md={6}>
            <ul className='slideshow'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </Grid> 
    )
}

export default LandingGallery;