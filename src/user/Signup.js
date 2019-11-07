import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import './Styles/signUp.css'

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            recaptcha: false,
            login: true
            
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
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signup(user).then(data => {
                if (data.error) this.setState({ error: data.error });
                else
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        open: true,
                        login: false

                    });
            });
        } else {
            this.setState({
                error: "What day is today? Please write a correct answer!"
            });
        }
    };

    signupForm = (name, email, password, recaptcha) => (

        <form className="form">

        <div className="input-group">   
                
         <i className="fas fa-user"></i>
           <input type="text" placeholder="Name" value={name} onChange={this.handleChange('name')} required></input>
             <span className="bar"></span>       
                
              </div>

          <div className="input-group">   
                
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" value={email} onChange={this.handleChange('email')} required></input>
                <span className="bar"></span>       
                
                </div>

                <div className="input-group">   
                
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" value={password} onChange={this.handleChange('password')} required></input>
                <span className="bar"></span>       
                
                </div>


                <div className="input-group">
                <i class="far fa-question-circle mt-2"></i>
                        
                <input placeholder={recaptcha ? "Thanks. You got it!" : "What day is today?"}
                       onChange={this.recaptchaHandler}
                       type="text"/>
                <span className="bar"></span>  
       </div>

                <div className="input-group">   
                
                <button onClick={this.clickSubmit}>
                    
                    <i className="fab fa-telegram-plane"></i>

                    </button>      
                
                </div>


               
                
                
                
                
                </form>      

    )


    render() {
        const { name, email, password, error, open, recaptcha,login } = this.state;
        return (

 <div id="wrapper">
      
                                    
             <div className="form-container">

                       
             <h2 className="heading-secondary ml-5">Sign Up</h2>
               


             <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>



                                            {this.signupForm(name,email, password,recaptcha) }





                <div className="switch-login" style={{ display: open ? "" : "none" }}>

                <a href="/signin">New account is successfully created. Please{" "}

                <span>Login</span>

                </a>

                </div>



                <div className="switch-login" style={{ display: login ? "" : "none" }}>

                <a href="/signin">Already have an account? <span>Login</span></a>

                </div>


                

                        
                


                                </div>



</div>
           
        );
    }
}

export default Signup;
