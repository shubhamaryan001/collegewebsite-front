import React, { Component } from "react";

import "./style/cart.css";

class Confirmation extends Component {
  render() {
    return (
      <div className="allcontainer text-center">
        <div className="row confirm">
          <div className="col-4 " />

          <div className="col-4 text-center">
          <div className="card confirmation-card">
          <img class="card-img-top" src="https://66.media.tumblr.com/tumblr_lpk13fA5HC1qg39ewo1_500.gif" alt="Card image cap"></img>
          <div>
              <h1 className="text-pop-up-top">Thanks For Purchasing</h1>
            </div>

            <a href="/" className="btn btn-success btn-raised">
              Return Back To Home
            </a>
          
          
          </div>
            
          </div>

          <div className="col-4" />
        </div>
      </div>
    );
  }
}

export default Confirmation;
