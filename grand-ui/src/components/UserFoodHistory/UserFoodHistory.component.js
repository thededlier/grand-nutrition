import React from 'react';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export default class UserFoodHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: props.appUserId, foodHistory: [] };
  }

  componentDidUpdate(prevProps) {
    if(this.props.appUserId !== prevProps.appUserId) {
        axios.get(`http://localhost:8000/food_history/${this.props.appUserId}/`)
            .then(res => {
                let history = [];
                let foodItems = res.data['food_items'];
                res.data['history'].forEach((hist) => {
                    let food = foodItems.find((el) => {
                        return el['id'] === hist['food_id']
                    });
                    if (food) {
                        console.log('food', food);
                        history.push(food);
                    }
                });
                this.setState({foodHistory: history});
            }).catch(error => console.log(error));
    }
  }

  render() {
    const foodItems = this.state.foodHistory.map((item, key) =>
        <ListItem key={key}>
            <div>{item.name}</div>
            &nbsp;&nbsp;&nbsp;
            <span/>
            <div>{item.energy_100g*0.294} &nbsp; Kcal</div>
        </ListItem>
    );
    return (
      <div>
        <List>
          {foodItems}
        </List>
      </div>
    )
  }
}
