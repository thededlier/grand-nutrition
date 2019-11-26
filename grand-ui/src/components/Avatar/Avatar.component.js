import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
}));

export default function AvatarPic() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt="Remy Sharp"  />
        </div>
    );
}