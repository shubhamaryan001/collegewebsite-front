import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import PropTypes from "prop-types";
import DefaultProduct from "../Asssests/avatar.jpg";
import { Card, Image } from "react-bootstrap";
import cart from "./cart-helper";
import { Link } from "react-router-dom";
import "./style/cart.css";

class CartItems extends Component {
  state = {
    cartItems: []
  };

  componentDidMount = () => {
    this.setState({ cartItems: cart.getCart() });
  };

  handleChange = index => event => {
    let cartItems = this.state.cartItems;
    if (event.target.value === 0) {
      cartItems[index].quantity = 1;
    } else {
      cartItems[index].quantity = event.target.value;
    }
    this.setState({ cartItems: cartItems });
    cart.updateCart(index, event.target.value);
  };

  getTotal() {
    return this.state.cartItems.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
  }

  removeItem = index => event => {
    let cartItems = cart.removeItem(index);
    if (cartItems.length === 0) {
    }
    this.setState({ cartItems: cartItems });
  };

  openCheckout = () => {
    this.props.setCheckout(true);
  };

  render() {
    return (
      <div className="allcontainer cart-box">
        <div className="row ">
          <div className="col-md-8 col-sm-12">
            <Card className="cart-card-1">
              <hr />
              <Card.Title className="cart-title text-center">
                Shopping Cart
              </Card.Title>
              <hr />

              {this.state.cartItems.length > 0 ? (
                <span>
                  {this.state.cartItems.map((item, i) => {
                    return (
                      <span key={i}>
                        {" "}
                        <div className="row">
                          <div className="col-4 text-center">
                            <img
                              src={
                                "http://localhost:8080/api/product/photo/" +
                                item.product._id
                              }
                              onError={i =>
                                (i.target.src = `${DefaultProduct}`)
                              }
                              alt={item.product.name}
                              class="img-thumbnail"
                              style={{ height: "140px" }}
                            />
                          </div>

                          <div className="col-md-8 col-sm-12">
                            <Card className="cart-card-2">
                              <div className="">
                                <Card.Body>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <Link
                                            className="text-center"
                                            to={"/product/" + item.product._id}
                                          >
                                            <h2>
                                              Product: {item.product.name}
                                            </h2>
                                          </Link>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {" "}
                                          <h4 className="text-right">
                                            Price:{" "}
                                            <i class="fas fa-rupee-sign" />
                                            {item.product.price}
                                          </h4>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {" "}
                                          <h3 className="text-right">
                                            Total Price:{" "}
                                            <i class="fas fa-rupee-sign" />
                                            {item.product.price * item.quantity}
                                          </h3>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </Card.Body>

                                <div>
                                  <input

                                  className="form-control"
                                    value={item.quantity}
                                    onChange={this.handleChange(i)}
                                    type="number"
                                    inputProps={{
                                      min: 1
                                      
                                    }}
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                    margin="normal"
                                  />
                                  <button
                                    className="btn btn-danger btn-raised"
                                    onClick={this.removeItem(i)}
                                  >
                                    x Remove
                                  </button>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </div>
                        <hr />
                      </span>
                    );
                  })}



                  <div className="text-center">


                  <span className="cart-button mr-2"><h3>Total: <i class="fas fa-rupee-sign" />{this.getTotal()}</h3></span>

                  </div>


                  <div className="cart-button" style={{ float: "right" }} >
                  
                    {!this.props.checkout &&
                      (isAuthenticated() ? (
                        <Link className="btn btn-success btn-raised mr-2" to="/confirmation" >
                          Checkout
                        </Link>
                      ) : (
                        <Link className="btn btn-success btn-raised" to="/signin">
                          <p>Sign in to checkout</p>
                        </Link>
                      ))}

                    <Link to="/">
                      <button className="btn btn-success btn-raised">Continue Shopping</button>
                    </Link>
                  </div>
                </span>
              ) : (
                <h3>No items added to your cart.</h3>
              )}
            </Card>
          </div>

          <div className="col-md-8" />



        </div>
      </div>
    );
  }
}

export default CartItems;
