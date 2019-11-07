import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";
import "./Styles/edit-profile.css";
import { InputGroup } from "react-bootstrap";

class EditProfile extends Component {
  constructor({ match }) {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      seller: false,
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
      about: ""
    };

    this.match = match;
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
          seller: data.seller,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 5000000) {
      this.setState({
        error: "File size should be less than 500kb",
        loading: false
      });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    // email@domain.com
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
        loading: false
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false
      });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true
            });
          });
        }
      });
    }
  };

  signupForm = (name, email, password, about, role) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile Photo</label>
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
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea
          onChange={this.handleChange("about")}
          type="text"
          className="form-control"
          value={about}
        />
      </div>

      {isAuthenticated().user.role === "admin" && (
        <div className="form-group">
          <label className="text-muted">Role</label>
          <textarea
            onChange={this.handleChange("role")}
            type="text"
            className="form-control"
            value={role}
          />
        </div>
      )}

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Update
      </button>
    </form>
  );

  render() {
    const {
      id,
      name,
      email,
      password,
      role,
      redirectToProfile,
      error,
      loading,
      about
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `http://localhost:8080/api/user/photo/${id}`
      : DefaultProfile;

    return (
      <div className="foronlythis edit-profile">
        <div className="row">
          <div className="col-md-8 col-sm-12 text-center">
            <h3 className="">Edit Profile</h3>
            <hr />

            <div class="card edit-card">
              <img
               style={{ height: "250px", width: "auto" }}
                class="card-img-top"
                src={photoUrl}
                onError={i => (i.target.src = `${DefaultProfile}`)}
                alt={name}
              />
              <div class="card-body">
                <h5 class="card-title">Current Profile</h5>

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

                {isAuthenticated().user.role === "admin" &&
                  this.signupForm(name, email, password, about, role)}

                {isAuthenticated().user._id === id &&
                  this.signupForm(name, email, password, about, role)}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-12 text-center" />
      </div>
    );
  }
}

export default EditProfile;
