import React, { Component } from "react";
import Sumit from "../Asssests/sumit.jpg";
import Vipul from "../Asssests/vipul.jpg";
import Vaibhav from "../Asssests/vai.jpg";
import Shubham from "../Asssests/Shubhma.jpg";


import "../core/styles/Home.css"

class AboutUs extends Component {
  render() {
    return (
      <div className="container aboutContain text-center">

      <h5 className="heading-secondary ">ABOUT US</h5>
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="card">
              <img
                style={{ height: "200px", width: "auto" }}
                class="card-img-top"
                src={`${Sumit}`}
              />
              <div class="card-body icon">
                <h5 class="card-title">Sumit Chawariya</h5>
                <p class="card-text">Group Mate</p>
                <p class="card-text">Desginer</p>
                
                <ul class="list-unstyled list-inline social text-center">
						<li class="list-inline-item"><a href="/"><i class="fab fa-facebook-square "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-twitter "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-instagram "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-google-plus-square "></i></a></li>
						<li class="list-inline-item"><a href="/" target="_blank"><i class="fas fa-envelope "></i></a></li>
					</ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
          <div className="card">
              <img
                style={{ height: "200px", width: "auto" }}
                class="card-img-top"
                src={`${Vipul}`}
              />
              <div class="card-body icon">
                <h5 class="card-title">Sumit Chawariya</h5>
                <p class="card-text">Group Mate</p>
                <p class="card-text">Desginer</p>

                
                <ul class="list-unstyled list-inline social text-center">
						<li class="list-inline-item"><a href="/"><i class="fab fa-facebook-square "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-twitter "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-instagram "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-google-plus-square "></i></a></li>
						<li class="list-inline-item"><a href="/" target="_blank"><i class="fas fa-envelope "></i></a></li>
					</ul>
              </div>
            </div>
            
          </div>

          <div className="col-md-4">
          <div className="card">
              <img
                style={{ height: "200px", width: "auto" }}
                class="card-img-top"
                src={`${Vaibhav}`}
              />
              <div class="card-body icon">
                <h5 class="card-title">Sumit Chawariya</h5>
                <p class="card-text">Group Mate</p>
                <p class="card-text">Desginer</p>

                
                <ul class="list-unstyled list-inline social text-center">
						<li class="list-inline-item"><a href="/"><i class="fab fa-facebook-square "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-twitter "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-instagram "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-google-plus-square "></i></a></li>
						<li class="list-inline-item"><a href="/" target="_blank"><i class="fas fa-envelope "></i></a></li>
					</ul>
              </div>
            </div>
          </div>
        </div>





        <div className="row">
          <div className="col-md-4">
            
          </div>

          <div className="col-md-4">
          <div className="card">
              <img
                style={{ height: "200px", width: "auto" }}
                class="card-img-top"
                src={`${Shubham}`}
              />
              <div class="card-body icon">
                <h5 class="card-title">Sumit Chawariya</h5>
                <p class="card-text">Group LEADER</p>
                <p class="card-text">Full Backend</p>

                
                <ul class="list-unstyled list-inline social text-center">
						<li class="list-inline-item"><a href="/"><i class="fab fa-facebook-square "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-twitter "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-instagram "></i></a></li>
						<li class="list-inline-item"><a href="/"><i class="fab fa-google-plus-square "></i></a></li>
						<li class="list-inline-item"><a href="/" target="_blank"><i class="fas fa-envelope "></i></a></li>
					</ul>
              </div>
            </div>
            
          </div>

          <div className="col-md-4">
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
