import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NameInput from "./NameInput.component";
import DateOfBirthInput from "./DateOfBirthInput.component";
import GenderInput from "./GenderInput.component";
import HeightInput from "./HeightInput.component";
import WeightInput from "./WeightInput.component";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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
}));

function getSteps() {
    return ['Date of Birth', 'Gender', 'Height', 'Weight'];
}

function getStepContent(step) {
    switch (step) {
        // case 0:
        //     return (<NameInput/>);
        case 0:
            return (<DateOfBirthInput/>);
        case 1:
            return (<GenderInput/>);
        case 2:
            return (<HeightInput/>);
        case 3:
            return (<WeightInput/>);
        default:
            return 'Unknown step';
    }
}

export default function Questionnaire() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleContinue = () => {
    };

    return (

        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            <Typography>{getStepContent(index)}</Typography>
                                            <div className={classes.actionsContainer}>
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}
                                                        className={classes.button}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleNext}
                                                        className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} className={classes.resetContainer}>
                                    <Typography>Thank you, we would like to know more about you</Typography>
                                    <Button onClick={handleReset} className={classes.button}>
                                        Reset
                                    </Button>
                                    <Link to="profiling">
                                        <Button onClick={handleContinue} className={classes.button}>
                                            Continue
                                        </Button>
                                    </Link>

                                </Paper>
                            )}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
}