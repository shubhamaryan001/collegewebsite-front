import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
      recaptcha: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  recaptchaHandler = e => {
    this.setState({ error: "" });
    let userDay = e.target.value.toLowerCase();
    let dayCount;

    if (userDay === "sunday") {
      dayCount = 0;
    } else if (userDay === "monday") {
      dayCount = 1;
    } else if (userDay === "tuesday") {
      dayCount = 2;
    } else if (userDay === "wednesday") {
      dayCount = 3;
    } else if (userDay === "thursday") {
      dayCount = 4;
    } else if (userDay === "friday") {
      dayCount = 5;
    } else if (userDay === "saturday") {
      dayCount = 6;
    }

    if (dayCount === new Date().getDay()) {
      this.setState({ recaptcha: true });
      return true;
    } else {
      this.setState({
        recaptcha: false
      });
      return false;
    }
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    // console.log(user);
    if (this.state.recaptcha) {
      signin(user).then(data => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          // authenticate
          authenticate(data, () => {
            this.setState({ redirectToReferer: true });
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        error: "What day is today? Please write a correct answer!"
      });
    }
  };

  signinForm = (email, password, recaptcha) => (
    <form className="form">
     
      <div className="input-group">
        <i className="fas fa-envelope" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange("email")}
          required
        />
        <span className="bar" />
      </div>

      <div className="input-group">
        <i className="fas fa-lock mt-2" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange("password")}
          required
        />
        <span className="bar" />
      </div>

      <div className="input-group">
        <i class="far fa-question-circle mt-2" />

        <input
          placeholder={recaptcha ? "Thanks. You got it!" : "What day is today?"}
          onChange={this.recaptchaHandler}
          type="text"
        />
        <span className="bar" />
      </div>

      <br />

    

      <div className="input-group">
        <button onClick={this.clickSubmit}>
          <i className="fab fa-telegram-plane" />
        </button>
      </div>

    </form>
  );

  render() {
    const {
      email,
      password,
      error,
      redirectToReferer,
      loading,
      recaptcha     
    } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div id="wrapper">
        <div className="form-container">
          <h2 className="heading-secondary ml-4">SignIn</h2>

          {loading ? (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      ) : (
        ""
      )}

          {this.signinForm(email, password,recaptcha)}

          <div style={{ display: error ? "" : "none" }}>
        <p className="Error">
          <i className="fas fa-exclamation" />
          <span className="mr-2">{error}</span>
        </p>
      </div>
        </div>
      </div>
    );
  }
}

export default Signin;
