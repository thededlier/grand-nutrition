import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    card: {
        maxWidth: 345,
    },
}));



export default function Profiling() {
    const classes = useStyles();
    const [value1, setValue1] = React.useState('female');
    const [value2, setValue2] = React.useState('female');
    const [dialogState, setDialogState] = React.useState(false);
    const handleChange1 = event => {
        setValue1(event.target.value);
    };
    const handleChange2 = event => {
        setValue2(event.target.value);
    };

    const togglePopUp = () => {
        setDialogState(true);
    };

    const handleClose = () => {
        setDialogState(false);
    };
    return(
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Card>
                                <FormControl component="fieldset1" className={classes.formControl}>
                                <FormLabel component="legend1">What Describes you the best?</FormLabel>
                                <RadioGroup aria-label="implicit" name="implicit" value={value1} onChange={handleChange1}>
                                    <FormControlLabel value="option1" control={<Radio />} label="You regularly have to tell Netflix you are still watching." />
                                    <FormControlLabel value="option2" control={<Radio />} label="You casually stroll through your neighbourhood a few times a week." />
                                    <FormControlLabel value="option3" control={<Radio />} label="If we called the gym on a week night looking for you, they’d find you." />
                                    <FormControlLabel value="option4" control={<Radio />} label="You work in construction during the day and you’re on the company softball team." />
                                </RadioGroup>
                                </FormControl>
                                <br/>
                                <FormControl component="fieldset2" className={classes.formControl} style={{paddingLeft: 25}}>
                                    <FormLabel component="legend2">What is your goal?</FormLabel>
                                    <RadioGroup aria-label="implicit2" name="implicit2" value={value2} onChange={handleChange2}>
                                        <FormControlLabel value="option5" control={<Radio />} label="Increase weight" />
                                        <FormControlLabel value="option6" control={<Radio />} label="Decrease weight" />
                                        <FormControlLabel value="option7" control={<Radio />} label="Maintain weight" />
                                    </RadioGroup>
                                </FormControl>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={togglePopUp}>
                                        Continue
                                    </Button>
                                </CardActions>
                            </Card>
                            <Dialog
                                open={dialogState}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Motion Activity Permission Required"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please enable Motion & Fitness permissions in order for Grand-Nutrition to track your steps
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Disable Step Tracking
                                    </Button>
                                    <Link to='/know-your-taste'>
                                    <Button onClick={handleClose} color="primary" autoFocus>
                                        Enable Permissions
                                    </Button>
                                    </Link>
                                </DialogActions>
                            </Dialog>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
}
