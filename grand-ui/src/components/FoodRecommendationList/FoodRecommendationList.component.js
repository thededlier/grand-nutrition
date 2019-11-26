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

const factor = 4.184;
const dict = {
    //Increase
    0: {
        lowerLimit: 300*factor,
        higherLimit: 2000*factor,
    },
    //Maintain
    1: {
        lowerLimit: 150*factor,
        higherLimit: 300*factor,
    },
    //Loose
    2:{
        lowerLimit: 0*factor,
        higherLimit: 150*factor,
    }
};

class FoodRecommendationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { userId: props.appUser.id, recommendationList: [] };
    }

    componentDidUpdate(prevProps) {
        if(this.props.appUser.id !== prevProps.appUser.id) {
            this.setState({recommendationList: []});
            axios.get(`http://localhost:8000/user_recommendation/${this.props.appUser.id}`)
                .then(res => {
                    let filteredList = this.filterRecommendationList(res.data, this.props.appUser.appuserprofile.usersGoal);
                    this.setState({recommendationList: filteredList})
                    }).
                    catch(error => console.log(error));
        }
    }

    filterRecommendationList(recommendations, goal) {
        console.log(recommendations, goal);
        return recommendations.filter((item) => item['energy_100g']>dict[goal].lowerLimit && item['energy_100g'] < dict[goal].higherLimit ).sort((a,b) => b['energy_100g']-a['energy_100g']);
    }

    render() {
        let max = 445;
        let randomImageArrayList = Array.from({length: this.state.recommendationList.length}, () => Math.floor(Math.random() * max));
        const {classes} = this.props;
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
