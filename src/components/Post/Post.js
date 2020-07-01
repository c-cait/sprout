import React from 'react';
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
import { red } from '@material-ui/core/colors';
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
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
    backgroundColor: red[500],
  },
}));

function Post(props) {
    // const [expanded, setExpanded] = React.useState(false);
    // //use for the indiviudal post view
    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };

  console.log('user_id on post from home page', props.post.user_id)
    const classes = useStyles();
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Date(props.post.posting_date_unix * 1000)
    return(
        <Card className={classes.root}>
        <CardHeader
        avatar={
          <Link to={`/profile/${props.post.user_id}`}><Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar></Link>
        }
        title={props.post.title}
        subheader={date.toLocaleDateString("en-US", options)}
        />
      <CardMedia
        className={classes.media}
        image={props.post.post_img}
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
        
    )
}

export default Post;