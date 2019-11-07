import React, {Component} from 'react';
import {list} from './apiUser';
import './Styles/mix.css'

class Users extends Component{


    constructor() {
        super();
        this.state = {
            users: []
        };
    }
        componentDidMount() {
            list().then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.setState({ users: data });
                }
            });
        }



        renderUsers = (users) =>(

                    <div className="row">


                        {users.map((user, i)=>
                            
                            
                        <div className="col-md-4" key={i}>
                        
                                            <div className="card">
                                            <img
                                style={{ height: "250px", width: "auto" }}
                                className=""
                                src={`http://localhost:8080/api/user/photo/${
                                    user._id
                                }`}
                                onError={i => (i.target.src = "https://www.shareicon.net/data/512x512/2015/09/24/106432_user_512x512.png")}
                                alt={user.name}
                                />



                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <p className="card-text">{user.email}</p>
                                        <a href={`/user/${user._id}`} className="btn btn-primary">View Profile</a>
                                    </div>

                                            </div>

                               
                        </div>
                            
                            
                            )}
                    </div>

        )

    render(){

        const {users} = this.state

        return(


<div className="allcontainer text-center">




<h1 className="user-title mt-5 mb-5">Users</h1>




{this.renderUsers(users)}
    
</div>



        )
    }
}




export default Users;






