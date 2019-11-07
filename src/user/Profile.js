import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DeleteUser from "./DeleteUser";
import DefaultProfile from "../Asssests/avatar.jpg";
import "./Styles/mix.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      error: "",
      redirectToSignin: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  handleCheck = (event, checked) => {
    this.setState({ seller: checked });
  };

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    const photoUrl = user._id
      ? `http://localhost:8080/api/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : `https://www.shareicon.net/data/512x512/2015/09/24/106432_user_512x512.png`;

    return (
<>
      <div className="conatiner text-center profile-header">   
              <h2 className="text-center mt-5">PROFILE</h2>


      </div>
      <div className="allcontainer profile-container">

        <div className="row">
          <div className="col-md-4 text-center">
            <img
              style={{ height: "350px", width: "80%" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
          </div>

          <div className="col-md-4 text-center">
            <h2 className="mt-3">
              <u> About Me</u>
            </h2>
            <hr />
            <p>{user.about}</p>
            <hr />

            <div className="card profile mt-5 mb-5">
              <div className="lead mt-2">
                <h1>Hello {user.name}</h1>
                <p className="font-weight-bold">Email: {user.email}</p>
                <p className="font-weight-bold">Role: {user.role}</p>

                <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="card profile-card">
              {isAuthenticated().user &&
                isAuthenticated().user._id === user._id && (
                  <div>
                    <Link
                      className="btn btn-raised btn-success mr-5 "
                      to={`/user/edit/${user._id}`}
                    >
                      Edit Profile
                    </Link>
                    <DeleteUser userId={user._id} />
                  </div>
                )}

              {isAuthenticated().user &&
                isAuthenticated().user.role === "admin" && (
                  <div>
                    <h5>Admin</h5>
                    <p className="mb-2 text-danger">Edit/Delete as an Admin</p>
                    <div>
                      <Link
                        className="btn btn-raised btn-success mr-5 "
                        to={`/user/edit/${user._id}`}
                      >
                        Edit Profile
                      </Link>
                      <DeleteUser userId={user._id} />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      </>
    );
  }
}

export default Profile;
