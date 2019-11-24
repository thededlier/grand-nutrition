import React from 'react';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FoodItemCard from "../FoodItemCard/FoodItemCard.component";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    list: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        padding: 10,
    },
});

class FoodRecommendationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { userId: props.appUserId, recommendationList: [] };
    }

    componentDidUpdate(prevProps) {
        if(this.props.appUserId !== prevProps.appUserId) {
            console.log('updated', prevProps, this.props);
            axios.get(`http://localhost:8000/user_recommendation/${this.props.appUserId}`)
                .then(res => {
                    this.setState({recommendationList: res.data})
                    }).
                    catch(error => console.log(error));
        }
    }

    render() {
        let max = 57;
        let randomImageArrayList = Array.from({length: this.state.recommendationList.length}, () => Math.floor(Math.random() * max));
        const {classes} = this.props;
        console.log(randomImageArrayList);
        console.log(this.state.recommendationList);
        const recommendations = this.state.recommendationList.map((item, key) =>
            <ListItem key={key}>
                <FoodItemCard foodDetails={item} imageId={randomImageArrayList[key]}/>
            </ListItem>
        );
        return (
            <List className={classes.list}>
                {recommendations}
            </List>
        )
    }
}

export default withStyles(styles)(FoodRecommendationList);
