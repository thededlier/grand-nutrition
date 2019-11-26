import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";
import AvatarPic from "../Avatar/Avatar.component";


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


    getActivityLevel(level) {
        if(level === 0)
            return 'Sedantry';
        else if( level === 1)
            return 'Lightly     Active';
        else if(level === 2)
            return 'Moderately Active';
        else if(level ===3)
            return 'Very Active';
        else
            return '';
    }

    getUserGoal(goal) {
        if(goal === 0)
            return 'Increase';
        else if( goal === 1)
            return 'Maintain';
        else if(goal === 2)
            return 'Loose';
        else
            return '';
    }

    getDoB() {
        let date = this.props.appUser.appuserprofile['dob'];
        let date1 = new Date(date);
        var ageDifMs = Date.now() - date1.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    render() {
    const {classes, appUser} = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


        return(
            <React.Fragment>

            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Grid item xs={2}>
                        {appUser.appuserprofile['dob'] &&<AvatarPic/>}
                    </Grid>
                    <Grid item xs={10}>
                        {appUser.appuserprofile['dob'] && (<ul>
                            <li> Name : {appUser.name} </li>
                            <li> Age : {this.getDoB()} </li>
                        </ul>)}
                    </Grid>

                </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
                {appUser.appuserprofile['dob'] && (<ul>
                    <li> Gender : {appUser.appuserprofile['gender'] === 0 ? "Male":(appUser.gender === 1 ? "Female":"Other")} </li>
                    <li> Height : {appUser.appuserprofile['height']} </li>
                    <li> Weight : {appUser.appuserprofile['weight']} </li>
                     <li> Activity Level : {this.getActivityLevel(appUser.appuserprofile['activityLevel'])}</li>
                    <li> Users Goal : {this.getUserGoal(appUser.appuserprofile['usersGoal'])} Weight </li>
                </ul>)}
            </Paper>
            </Grid>
            </React.Fragment>
        );
    }
}



export default withStyles(styles)(UserProfile);