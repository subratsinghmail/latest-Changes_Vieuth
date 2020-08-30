import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from 'graphql-tag';
import { MDBRow,MDBContainer,MDBInput, MDBModalFooter} from "mdbreact";




const mutation=gql`
mutation sendEmailVerificationCode($email:String!){
  
  sendEmailVerificationCode(input:$email)
}
`

function RecoverPassword() {
   
 

  render() {
    <div>
      
    </div>
  }
}

export default RecoverPassword;