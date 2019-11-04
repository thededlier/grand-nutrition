import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from "@material-ui/core";

export default class Dashboard extends Component {
    render() {
        return (
            <Card>
                <CardContent>
                    Hello {this.props.isOpen}
                </CardContent>
            </Card>
        );
    }
}
