import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { singleProduct, remove } from "./api-product";
import DefaultProduct from "../Asssests/avatar.jpg";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import AddToCart from "../cart/AddToCart";
import '../core/styles/Home.css'

class SingleProduct extends Component {
  state = {
    product: "",
    redirectToHome: false,
    redirectToSignin: false,
    redirect: false
  };

  componentDidMount = () => {
    const productId = this.props.match.params.productId;
    singleProduct(productId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          product: data
        });
      }
    });
  };


  deleteProduct = () => {
    const productId = this.props.match.params.productId;
    const token = isAuthenticated().token;
    remove(productId, token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            this.setState({ redirectToHome: true });
        }
    });
};

deleteConfirmed = () => {
    let answer = window.confirm(
        "Are you sure you want to delete your product?"
    );
    if (answer) {
        this.deleteProduct();
    }
};
  renderProduct = product => {
    return (

<div className= "row single-product-container">

<div className="col-md-6">
<img
          style={{ height: "500px", width: "auto" }}
          class="card-img-top"
          src={`http://localhost:8080/api/product/photo/${product._id}`}
          alt={product.name}
          onError={i => (i.target.src = `${DefaultProduct}`)}
        />

</div>





<div className="col-md-6">
<div class="card product-card">
        
        <div class="card-body">
        <hr/>
          <h4 class="single-ttile">{product.name}</h4>
          <hr/>
          <p class="card-text">{product.description}</p>
          <h3 class="card-text">
          Category: <span/> {product.category}
          </h3>
          <br />
          <h3 class="card-text">
            <i class="fas fa-store" />
            {product.quantity > 0 ? "In stock" : "Out of Stock"}
          </h3>
         
          <br />
          <h3 class="card-text">
            <i class="fas fa-tags" /> Price: <i class="fas fa-rupee-sign"></i>{product.price}
          </h3>

          <AddToCart item={product} />

          {isAuthenticated().user &&
            isAuthenticated().user._id === product.productedBy._id && (
              <div class="card mt-5">
              <div className="card-body">
                <h5 className="card-title">As Seller</h5>
                <p className="mb-2 text-danger">Edit/Delete as an Owner</p>
                <Link
                  to={`/product/edit/${product._id}`}
                  className="btn btn-raised btn-warning btn-sm mr-5"
                >
                  Update product
                </Link>
                <button
                  onClick={this.deleteConfirmed}
                  className="btn btn-raised btn-danger"
                >
                  Delete product
                </button>
              </div>
            </div>
            )}

          <div>
            {isAuthenticated().user && isAuthenticated().user.role === "admin" && (
              <div class="card mt-5">
                <div className="card-body">
                  <h5 className="card-title">Admin</h5>
                  <p className="mb-2 text-danger">Edit/Delete as an Admin</p>
                  <Link
                    to={`/product/edit/${product._id}`}
                    className="btn btn-raised btn-warning btn-sm mr-5"
                  >
                    Update product
                  </Link>
                  <button
                    onClick={this.deleteConfirmed}
                    className="btn btn-raised btn-danger"
                  >
                    Delete product
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

</div>

</div>

      
    );
  };

  render() {

    const { product, redirectToHome, redirectToSignin } = this.state;
    const producterId = product.productedBy
      ? `/user/${product.productedBy._id}`
      : "";
    const producterName = product.productedBy
      ? product.productedBy.name
      : " Unknown";
    if (redirectToHome) {
      return <Redirect to={`/`} />;
    } else if (redirectToSignin) {
      return <Redirect to={`/signin`} />;
    }

    return (
      <div className="allcontainer text-center">
      
     <div className="row">
          <div className="col-12">
            {!product ? (
              <div className="jumbotron text-center">
                <h2>Loading...</h2>
              </div>
            ) : (
              this.renderProduct(product)
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
