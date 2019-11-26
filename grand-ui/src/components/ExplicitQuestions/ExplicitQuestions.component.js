import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from "@material-ui/core";
import axios from 'axios';
import JSON from 'json5';


const inputParsers = {
  gender(input) {
    input = input.toUpperCase();
    if (input === 'MALE'){
        return 0;
    } else if (input === 'FEMALE') {
        return 1;
    } else {
        return 2;
    }
  },
  activity(input) {
    input = input.toUpperCase();
    if (input === 'NONE'){
        return 0;
    } else if (input === 'LIGHT') {
        return 1;
    } else if (input === 'MEDIUM') {
        return 2;
    } else if (input === 'HIGH') {
        return 3;
    } else {
        return -1;
    }
  },
  goal(input) {
    input = input.toUpperCase();
    if (input === 'GAIN'){
        return 0;
    } else if (input === 'MAINTAIN') {
        return 1;
    } else if (input === 'LOSE') {
        return 2;
    } else {
        return -1;
    }
  },
};

export default class ExplicitQuestions extends Component {

    componentDidMount(){
    }

    constructor() {
    super();

//    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

//    handleChange(event) {
//        this.setState({dateValue: event.target.dataValue});
//    }

    handleSubmit(event) {
        event.preventDefault();
//        alert('A name was submitted: ' + this.state.dataValue);
            event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        for (let name of data.keys()) {
          const input = form.elements[name];
          const parserName = input.dataset.parse;

          if (parserName) {
            const parser = inputParsers[parserName];
            const parsedValue = parser(data.get(name));
            data.set(name, parsedValue);
          }

        }

        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        console.log(json);
        axios.post('http://localhost:8000/app_user/2/user_profile', json)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
        });
     }

    render() {
        return (
       <Card>
        <CardContent>
        <h2>User Profile Details</h2>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="dob">Enter Date Of Birth: </label>
            <input id="dob" name="dob" type="date" />
            <br></br>
            <label htmlFor="height">Enter your Height: </label>
            <input id="height" name="height" type="text" />
            <br></br>
            <label htmlFor="weight">Enter your Weight: </label>
            <input id="weight" name="weight" type="text" />
            <br></br>
            <label htmlFor="gender">Enter your Gender: </label>
            <input id="gender" name="gender" type="text" data-parse="gender"/>
            <br></br>
            <label htmlFor="activityLevel">Enter your Activity Level (None, Light, Medium or High): </label>
            <input id="activityLevel" name="activityLevel" type="text" data-parse="activity"/>
            <br></br>
            <label htmlFor="userGoal">Would you like to Lose, Maintain or Gain Weight?: </label>
            <input id="usersGoal" name="userGoal" type="text" data-parse="goal"/>
            <br></br>
            <button>Send data!</button>
        </form>
        </CardContent>
        </Card>
        );
    }

}