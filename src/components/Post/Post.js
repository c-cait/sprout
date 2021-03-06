import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import tempProfile from '../../temp-profile-pic.png';
import PlantPopUp from '../PlantPopUp/PlantPopUp';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
    marginLeft: 287,
    marginTop: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'rgb(23, 82, 66)',
  },
}));


function Post(props) {
  const [popUp, setPopUp] = useState(false)

  const handleOpen = () => {
    setPopUp(true)
  }
  
  const handleClose = () =>{
    setPopUp(false)
  }
  

  console.log('user_id on post from home page', props.post.user_id)
    const classes = useStyles();
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Date(props.post.posting_date_unix * 1000)
    return(
      <div>
        {popUp === true ? <PlantPopUp handleClose={handleClose} post={props.post} getAllPosts={props.getAllPosts}/> : ''}
          <Card className={classes.root}>
          <CardHeader
          avatar={
            <Link to={`/profile/${props.post.user_id}`}>
            <Avatar aria-label="recipe" className={classes.avatar} img={tempProfile}>
            </Avatar></Link>
          }
          title={props.post.title}
          subheader={date.toLocaleDateString("en-US", options)}
          />
          <CardMedia
          style={{cursor: 'pointer'}}
            className={classes.media}
            image={props.post.post_img}
            onClick={() => handleOpen()}
          />
          <CardContent>
              <Typography variant="body2" color="textSecondary" >
                  {props.post.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" >
              {props.post.description}
              </Typography>
        </CardContent>
        <CardActions>
              <IconButton aria-label="add to favorites">
              <FavoriteIcon />
              </IconButton>
          </CardActions>
          </Card>
      </div>
    )
}

export default Post;