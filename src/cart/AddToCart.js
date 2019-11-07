import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import cart from "./cart-helper";

class AddToCart extends Component {
    state = {
        redirect: false
      }

    addToCart = () => {
        cart.addItem(this.props.item, () => {
          this.setState({redirect:true})
        })
      }

  render() {
    if (this.state.redirect) {
        return (<Redirect to={'/cart'}/>)
      }
    return (<span>



{

    this.props.item.quantity >=0 ?


    <button className="btn btn-success btn-raised" onClick={this.addToCart}>Add To Cart</button> :

    <button className="btn btn-danger btn-raised" disabled={true}></button> 



}   
    </span>
     
    )
  }
}
export default AddToCart;