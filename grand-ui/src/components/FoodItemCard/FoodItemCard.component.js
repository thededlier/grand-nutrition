import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {ListItemText} from "@material-ui/core";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 320
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

export default function FoodItemCard(props) {
    const classes = useStyles();
    let [isLiked, setIsLiked] = React.useState('default');
    let [isDisLiked, setIsDisLiked] = React.useState('default');
    const onClickLiked = () => {
        let val  = (isLiked === 'default') ? 'secondary' : 'default';
        setIsDisLiked('default');
        setIsLiked(val);
    };
    const onClickDisLiked = () => {
        let val  = (isDisLiked === 'default') ? 'secondary' : 'default';
        setIsLiked('default');
        setIsDisLiked(val);
    };
    console.log(props.foodDetails);
    const foodDetails = props.foodDetails;
    return (
        <Card className={classes.card}>
            <CardHeader subheader={foodDetails.name}
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
            />
            <CardMedia
                className={classes.media}
                image={'../images/' + props.imageId + '.jpg'}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    per 100gm
                    <List>
                    <ListItemText> Energy : {foodDetails.energy_100g} calories</ListItemText>
                    <ListItemText> Sugars : {foodDetails.sugars_100g} gm</ListItemText>
                    <ListItemText> Protein : {foodDetails.proteins_100g} gm</ListItemText>
                    <ListItemText> Cholesterol : {foodDetails.cholesterol_100g} gm</ListItemText>
                    </List>
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton color={isLiked} onClick={()=>onClickLiked()} aria-label="add to favorites">
                    <ThumbUpIcon />
                </IconButton>
                <IconButton color={isDisLiked} onClick={()=>onClickDisLiked()} aria-label="add to favorites">
                    <ThumbDownIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}