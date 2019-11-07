import React, { Component } from "react";
import { list } from "./api-product";
import DefaultProduct from "../Asssests/home.jpg";
import { Link } from "react-router-dom";
import "./style/product.css";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: false,
      page: 1
    };
  }

  loadProducts = page => {
    list(page).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          products: data
        });
      }
    });
  };

  componentDidMount() {
    this.loadProducts(this.state.page);
    this.setState({ loading: false });
  }

  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.loadProducts(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.loadProducts(this.state.page - number);
  };

  renderProducts = products => {
    return (
      <div className="row">
        {products.map((product, i) => {
          const productedId = product.productedBy
            ? `/user/${product.productedBy._id}`
            : "";
          const productedName = product.productedBy
            ? product.productedBy.name
            : " anonymous";

          return (
            <div className="col-xs-12 col-sm-4 col-md-4 mb-5" key={i}>
              <div className="card product-card-1">
                <img
                  className="card-img-animation"
                  src={`http://localhost:8080/api/product/photo/${product._id}`}
                  alt={products.title}
                  onError={i => (i.target.src = `${DefaultProduct}`)}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 100)}
                  </p>
                  <br />
                  <p className="font-italic mark">
                    Product by{" "}
                    <Link to={`${productedId}`}>{productedName} </Link>
                    on {new Date(product.created).toDateString()}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { products, page } = this.state;

    let data;
    if (this.state.loading) {
      data = (
        <img src="https://media.giphy.com/media/WiIuC6fAOoXD2/giphy.gif" />
      );
    } else {
      data = (
        <div className="product-container text-center">
          <h2 className="heading-secondary mb-5">
            {!products.length ? "No more products!" : "Recent products"}
          </h2>

          {this.renderProducts(products)}

          {page > 1 ? (
            <button
              className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
              onClick={() => this.loadLess(1)}
            >
              Previous ({this.state.page - 1})
            </button>
          ) : (
            ""
          )}

          {products.length ? (
            <button
              className="btn btn-raised btn-success mt-5 mb-5"
              onClick={() => this.loadMore(1)}
            >
              Next ({page + 1})
            </button>
          ) : (
            ""
          )}
        </div>
      );
    }
    return <div>{data}</div>;
  }
}

export default Products;
