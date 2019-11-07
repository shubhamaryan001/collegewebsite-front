import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Button,Modal} from "react-bootstrap";
import {isAuthenticated, signout} from "../auth";
import {remove} from './apiUser'


class DeleteUser extends Component {

    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
        };
      }


      state ={

        redirect: false
      };

      deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // signout user
                signout(() => console.log("User is deleted"));
                // redirect
                this.setState({ redirect: true });
            }
        });
    };

    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
    

  render() {

    if (this.state.redirect) {
        return <Redirect to="/" />;
    }

    return (
      
        <>
        <Button className="btn btn-raised btn-danger" variant="danger" onClick={this.handleShow}>
          Delete
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your Account ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button onClick={this.deleteAccount} variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>









        // <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger"> 

        //     Delete
        // </button>

    );
  }
}



export default DeleteUser;