import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 200,
    },
}));

export default function WeightInput() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };
    return (
        <div className={classes.root}>
            <div>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <InputLabel htmlFor="outlined-adornment-amount">Weight</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                        value={values.weight}
                        onChange={handleChange('weight')}
                        endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                    />
                </FormControl>
            </div>
        </div>
    );
}