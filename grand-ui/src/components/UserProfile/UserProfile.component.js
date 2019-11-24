import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";


const styles = () => ({
    paper: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
    },
    fixedHeight: {
        height: 240,
    }
});

class UserProfile extends React.Component {


    render() {
    const {classes, appUser} = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return(
            <React.Fragment>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    {appUser.appuserprofile['dob'] && (<ul>
                        <li> User Name : {appUser.name} </li>
                        <li> Date of Birth : {appUser.appuserprofile['dob']} </li>
                    </ul>)}
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
                {appUser.appuserprofile['dob'] && (<ul>
                    <li> Gender : {appUser.appuserprofile['gender'] === 0 ? "Male":(appUser.gender === 1 ? "Female":"Other")} </li>
                    <li> Height : {appUser.appuserprofile['height']} </li>
                    <li> Weight : {appUser.appuserprofile['weight']} </li>
                     <li> Activity Level : {appUser.appuserprofile['activityLevel'] === 0 ? "Sendantry":(appUser.appuserprofile['gender'] === 1 ? "Lightly Active":(appUser.appuserprofile['gender'] === 2 ? "Moderately Active":"Very Active"))} </li>
                    <li> Users Goal : {appUser.appuserprofile['gender'] === 0 ? "Increase":(appUser.appuserprofile['gender'] === 1 ? "Maintain":"Lose")} Weight </li>
                </ul>)}
            </Paper>
            </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(UserProfile);