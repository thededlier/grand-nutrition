import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Copyright from "../CopyRight/CopyRight.component";
import FoodItemCard from "../FoodItemCard/FoodItemCard.component";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import axios from 'axios';


const drawerWidth = 240;

const userMapping = {
    "John Doe":"1",
    "Kevin": "2",
    "LEO":"3",
    "TED":"4"
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
    const [appUser,setAppUser] = React.useState({});
    const [appUserId,setAppUserId] = React.useState(userMapping["John Doe"]);
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
        axios.get(`http://localhost:8000/app_user/${id}/`)
            .then(res => {
                setAppUser(res.data);
            })
            .catch(error => setAppUser({ }));
    }

    return (
        <div>
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
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <ul>
                                     <li> User Name : {appUser.name} </li>
                                    {/* <li> Date of Birth : {appUser.appuserprofile.dob} </li>*/}
                                    {/* <li> Gender : {appUser.gender === 0 ? "Male":(appUser.gender === 1 ? "Female":"Other")} </li>*/}
                                    {/* <li> Height : {appUser.height} </li>*/}
                                    {/* <li> Weight : {appUser.weight} </li>*/}
                                    {/* <li> Activity Level : {appUser.activityLevel === 0 ? "Sendantry":(appUser.gender === 1 ? "Lightly Active":(appUser.gender === 2 ? "Moderately Active":"Very Active"))} </li>*/}
                                    {/*<li> Users Goal : {appUser.gender === 0 ? "Increase":(appUser.gender === 1 ? "Maintain":"Lose")} Weight </li>*/}
                                </ul>
                                </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>

                            </Paper>
                        </Grid>
                        <Grid item xs={12}  >
                            <Paper className={classes.paper}>
                                <List className={classes.list}>
                                    <ListItem>
                                        <FoodItemCard/>
                                    </ListItem>
                                    <ListItem>
                                        <FoodItemCard/>
                                    </ListItem>
                                    <ListItem>
                                        <FoodItemCard/>
                                    </ListItem>
                                    <ListItem>
                                        <FoodItemCard/>
                                    </ListItem>
                                    <ListItem>
                                        <FoodItemCard/>
                                    </ListItem>
                                    <ListItem>
                                        <FoodItemCard/>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Copyright/>
            </main>
        </div>
    );
}