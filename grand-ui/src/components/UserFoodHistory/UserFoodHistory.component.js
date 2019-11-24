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
        console.log('updated', prevProps, this.props);
        axios.get(`http://localhost:8000/food_history/${this.props.appUserId}/`)
            .then(res => {
                let history = [];
                let foodItems = res.data['food_items'];
                res.data['history'].forEach((hist) => {
                    let food = foodItems.find((el) => {
                        return el['id'] === hist['food_id']
                    });
                    if (food) {
                        history.push(food);
                    }
                });
                this.setState({foodHistory: history});
            }).catch(error => console.log(error));
    }
  }

  render() {
    const foodItems = this.state.foodHistory.map((item, key) =>
        <ListItem key={key}>{item.name}</ListItem>
    );
    return (
      <div>
        <h4>Food History</h4>
        <List>
          {foodItems}
        </List>
      </div>
    )
  }
}
