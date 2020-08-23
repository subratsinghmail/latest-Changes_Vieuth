import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import gql from 'graphql-tag';
import { MDBRow,MDBContainer,MDBInput, MDBModalFooter} from "mdbreact";
const client= new ApolloClient({
  uri:'https://vieuth-backend.herokuapp.com/graphql',
})

const mutation=gql`
mutation sendEmailVerificationCode($email:String!){
  
  sendEmailVerificationCode(input:$email)
}
`


class RecoverPassword extends Component {
  state = {
    email: "",
    submitted: false
  }

  handleChange = e => {
    this.setState({ email: e.target.value })
  }

  sendPasswordResetEmail = e => {
    e.preventDefault()
    const { email } = this.state

   client.mutate({
     mutation,
     variables:{email:this.state.email}
     
   }).then(res=>{
    this.setState({ email: "", submitted: res.data.sendEmailVerificationCode})
   })
    
  }

  render() {
    const { email, submitted } = this.state;

    return (
      <ApolloProvider client={client}>
      <MDBContainer fluid>
  <MDBRow  center>
        
           <div className="d-flex justify-content-center align-items-center" style={{height:'100vh', width:'50%'}}>
             <div className=" w-responsive">
             {submitted ? (
          <div className="flow-text grey-text text-darken-1">
            <p>
              If that account is in our system, we emailed you a link to reset
              your password.
            </p>
            <Link to="/login" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i>Return to sign in
            </Link>
          </div>
        ) : (
          <div className="flow-text grey-text text-darken-1">
            <p>
              It happens to the best of us. Enter your email and we'll send you
              reset instructions.
            </p>
            <form onSubmit={this.sendPasswordResetEmail}>
              <input
                onChange={this.handleChange}
                value={email}
                placeholder="Email address"
              />
              <button class="btn blue-gradient p-2 w-responsive " type="submit">Reset password</button>
            </form>
            
          </div>
        )
        }
             </div>
             </div>
             </MDBRow>
             </MDBContainer>
       
        }
      
      </ApolloProvider>
    );
  }
}

export default RecoverPassword;