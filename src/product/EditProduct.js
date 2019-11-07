import React, { Component } from "react";
import { singleProduct, update } from "./api-product";
import { isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";
import DefaultProduct from "../Asssests/avatar.jpg";

class EditProduct extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      photoid:"",
      name: "",
      description: "",
      quantity: "",
      category: "",
      price: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false
    };
  }

  init = productId => {
    singleProduct(productId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data.productedBy._id,
          photoid: data._id,
          name: data.name,
          description: data.description,
          category: data.category,
          quantity: data.quantity,
          price: data.price,

          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.productData = new FormData();
    const productId = this.props.match.params.productId;
    this.init(productId);
  }

  isValid = () => {
    const {
      name,
      description,
      category,
      quantity,
      price,
      fileSize
    } = this.state;
    if (fileSize > 5000000) {
      this.setState({
        error: "File size should be less than 500kb",
        loading: false
      });
      return false;
    }
    if (
      name.length === 0 ||
      description.length === 0 ||
      category.length === 0 ||
      quantity.length === 0 ||
      price.length === 0
    ) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.productData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const productId = this.props.match.params.productId;
      const token = isAuthenticated().token;

      update(productId, token, this.productData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            name: "",
            description: "",
            category: "",
            quantity: "",
            price: "",
            redirectToProfile: true
          });
        }
      });
    }
  };

  editProductForm = (name, description, quantity, category, price) => (
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

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Edit Product
      </button>
    </form>
  );

  render() {
    const {
    product,
      id,
      photoid,
      name,
      description,
      quantity,
      category,
      price,
      redirectToProfile,
      error,
      loading
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div className="foronlythis text-center">
        <div className="row">
          <div className="col-4" />

          <div className="col-4">


                    <div className="card editcard">
                    
                    
                    
                    <h2 className="mt-5 mb-5">{name}</h2>

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

                    <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={`http://localhost:8080/api/product/photo/${photoid}`}
                    onError={i => (i.target.src = `${DefaultProduct}`)}
                    alt={name}
                    />

                    {isAuthenticated().user.role === "admin" &&
                    this.editProductForm(
                        name,
                        description,
                        quantity,
                        category,
                        price
                    )}

                    <hr />

                    {isAuthenticated().user._id === id &&
                    this.editProductForm(
                        name,
                        description,
                        quantity,
                        category,
                        price
                    )}
                    
                    </div>
          </div>

          <div className="col-4" />
        </div>
      </div>
    );
  }
}

export default EditProduct;
