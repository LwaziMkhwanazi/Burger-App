import React, { Component } from 'react'
import Order from '../../component/Orders/Order/Order'
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
 class Orders extends Component {

  state ={
    orders:[],
    loading:true
  }
  componentDidMount(){
    axios.get('/orders.json').then( response =>{
        const fetchedOrders = [];
        for(let key in response.data){
          fetchedOrders.push({
            ...response.data[key],
            id:key 
          })
        }
        this.setState({orders:fetchedOrders})
    }).catch(error => {
      this.setState({loading:false})
    })
  }
  render() {

    return (
      <div>
        {this.state.orders.map( order =>{
          return <Order
           key = {order.id}
            price = {order.totalPrice}
              ingredients = {order.ingredients}
            />
        })}
      </div>
    )
  }
}
export default  withErrorHandler(Orders,axios);