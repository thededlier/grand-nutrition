import React from 'react';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export default class UserFoodHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: 347, foodHistory: [] };
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/food_history/${this.state.userId}/`)
      .then(res => {
        let history = [];
        let foodItems = res.data['food_items'];
        res.data['history'].forEach((hist) => {
          let food = foodItems.find((el) => { return el['id'] === hist['food_id']});
          if (food) {
            history.push(food);
          }
        });
        this.setState({foodHistory: history});
        console.log(this.state.foodHistory);
      }).catch(error => console.log(error));
  }

  render() {
    const foodItems = this.state.foodHistory.map((item, key) =>
        <ListItem><li key={item.id}>{item.name}</li></ListItem>
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
