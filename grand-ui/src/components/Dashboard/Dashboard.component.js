import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Copyright from "../CopyRight/CopyRight.component";
import UserFoodHistory from "../UserFoodHistory/UserFoodHistory.component";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import UserProfile from "../UserProfile/UserProfile.component";
import FoodRecommendationList from "../FoodRecommendationList/FoodRecommendationList.component";
import Typography from "@material-ui/core/Typography";
import LoadingOverlay from 'react-loading-overlay';

const drawerWidth = 240;

const userMapping = {
    "Brandon":"1",
    "Levi": "2",
    "Johnathan":"3",
    "Kristi":"4",
    "Michael":"5",
    "Patrick":"6",
    "Michelle ":"7"
};

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        padding: 10,
    },
    fixedHeight: {
        height: 240,
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [appUser,setAppUser] = React.useState({ appuserprofile: {} });
    const [appUserId,setAppUserId] = React.useState(0);
    const [spinnerState,setSpinnerState] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (eventKey) => {
        setAnchorEl(null);
        console.log(eventKey)
    };

    const handleOnClick = (id) => {
        setAppUserId(id);
        setSpinnerState(true);
        axios.get(`http://localhost:8000/app_user/${id}/`)
            .then(res => {
                setAppUser(res.data);
                setSpinnerState(false)
            })
            .catch(error => setAppUser({ }));
    }

    return (
        <div>
            <LoadingOverlay
                active={spinnerState}
                spinner
                text='Loading...'
            >
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {Object.keys(userMapping).map((key)=>{
                                return(<Button key={key} color="primary" className={classes.button} onClick={()=>handleOnClick(userMapping[key])}>
                                    {key}
                                </Button>)
                            })}
                        </Paper>
                    </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <UserProfile appUser={appUser}/>
                        <Grid>
                            <Typography variant="h5" component="h3" style={{marginLeft: 22}}>
                                History
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper} >
                                <UserFoodHistory appUserId={appUserId}/>
                            </Paper>
                        </Grid>
                        <Grid>
                            <Typography variant="h5" component="h3" style={{marginLeft: 22}}>
                                You may also like
                            </Typography>
                        </Grid>
                        <Grid item xs={12}  >
                            <Paper className={classes.paper}>
                                <FoodRecommendationList appUserId={appUserId}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Copyright/>
            </main>
            </LoadingOverlay>
        </div>
    );
}
