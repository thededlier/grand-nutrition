import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from "@material-ui/core";
import axios from 'axios';

export default class Dashboard extends Component {
    state = {
            jsonOb: {},
            profile: {}
        }
//   "https://jsonplaceholder.typicode.com/users""http://localhost:8000/app_user/1/"

    componentDidMount(){
        axios.get("http://localhost:8000/app_user/1/")
        .then(res => {
            this.setState({jsonOb: res.data});
        })
        .catch(error => this.setState({ }));
        axios.get("http://localhost:8000/app_user/1/user_profile")
        .then(res => {
            this.setState({profile: res.data});
        })
        .catch(error => this.setState({ }));
    }

    render() {
        const { jsonOb } = this.state;
        const { profile } = this.state;
        console.log(jsonOb)
        return (
            <Card>
                <CardContent>
                    Hello {jsonOb.name} {this.props.isOpen}
                </CardContent>
                <ul>
                    { <li> User Name : {jsonOb.username} </li> }
                </ul>
                <ul>
                    { <li> Date of Birth : {profile.dob} </li> }
                </ul>
                <ul>
                    { <li> Gender : {profile.gender === 0 ? "Male":(profile.gender === 1 ? "Female":"Other")} </li> }
                </ul>
                <ul>
                    { <li> Height : {profile.height} </li> }
                </ul>
                <ul>
                    { <li> Weight : {profile.weight} </li> }
                </ul>
                <ul>
                    { <li> Activity Level : {profile.activityLevel === 0 ? "Sendantry":(profile.gender === 1 ? "Lightly Active":(profile.gender === 2 ? "Moderately Active":"Very Active"))} </li> }
                </ul>
                <ul>
                    { <li> Users Goal : {profile.gender === 0 ? "Increase":(profile.gender === 1 ? "Maintain":"Lose")} Weight </li> }
                </ul>

            </Card>

        );
    }
}
