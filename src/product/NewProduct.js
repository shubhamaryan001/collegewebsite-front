import React, { Component } from 'react'
import { isAuthenticated } from "../auth/index";
import { create } from "./api-product";
import { Redirect } from "react-router-dom";


class NewProduct extends Component {

  constructor() {
    super();
    this.state = {
          name: '',
          description: '', 
          photo: "",         
          category: '',
          quantity: '',
          price: '',
          error: '',          
          user: {},
          fileSize: 0,
          loading: false,
          redirectToProfile: false
    };
}



componentDidMount() {
  this.productData = new FormData();
  this.setState({ user: isAuthenticated().user });
}


isValid = () => {
  const { name,description,category,quantity,price, fileSize } = this.state;
  if (fileSize > 100000) {
      this.setState({
          error: "File size should be less than 100kb",
          loading: false
      });
      return false;
  }
  if (name.length === 0 || description.length === 0 || category.length === 0 || quantity.length === 0 || price.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
  }
  return true;
};


handleChange = name => event => {
  this.setState({ error: "" });
  const value =
      name === "photo" ? event.target.files[0] : event.target.value;

  const fileSize = name === "photo" ? event.target.files[0].size : 0;
  this.productData.set(name, value);
  this.setState({ [name]: value, fileSize });
};


clickSubmit = event => {
  event.preventDefault();
  this.setState({ loading: true });

  if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.productData).then(data => {
          if (data.error) this.setState({ error: data.error });
          else {
              this.setState({
                  loading: false,
                  name: '',
                  description: '',        
                  category: '',
                  quantity: '',
                  price: '',
                  user:'',
                  redirectToProfile: true
              });
          }
      });
  }
};




newPostForm = (name, description,quantity,category,price) => (
  <form>
      <div className="form-group">
          <label className="text-muted">Product Photo</label>
          <input
              onChange={this.handleChange("photo")}
              type="file"
              accept="image/*"
              className="form-control"
          />
      </div>
      <div className="form-group">
          <label className="text-muted">Name</label>
          <input
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
              value={name}
          />
      </div>

      <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
              onChange={this.handleChange("description")}
              type="text"
              className="form-control"
              value={description}
          />
      </div>

      <div className="form-group">
          <label className="text-muted">category</label>
          <textarea
              onChange={this.handleChange("category")}
              type="text"
              className="form-control"
              value={category}
          />
      </div>
      <div className="form-group">
          <label className="text-muted">quantity</label>
          <textarea
              onChange={this.handleChange("quantity")}
              type="number"
              className="form-control"
              value={quantity}
          />
      </div>



      <div className="form-group">
          <label className="text-muted">price</label>
          <textarea
              onChange={this.handleChange("price")}
              type="number"
              className="form-control"
              value={price}
          />
      </div>



      <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
      >
          Create Product
      </button>
  </form>
);
  
  render() {


    const {
      name,
       description,
       quantity,
       category,
       price,        
        user,
        error,
        loading,
        redirectToProfile
  } = this.state;

  if (redirectToProfile) {
    return <Redirect to="/"/>;
}

    return (
      <div className="allcontainer">

      <div className="row">
      
      <div className="col-4">
      
      
      
      </div>

      <div className= "card text-center col-4">
      
      <h2 className="mt-5 mb-5">Create a new post</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.newPostForm(name,description,quantity,category,price)}
      
      </div>

      <div className="col-4">
      
      
      
      </div>
      
      
      </div>
               
            </div>
    )
  }
}


export default  NewProduct;