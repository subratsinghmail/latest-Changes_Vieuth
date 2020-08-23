import React from 'react'
import PropTypes from 'prop-types'
import ErrorImage from './download.png'
import { MDBContainer, MDBRow, MDBCol,MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
function NotAuthorised(props) {
    return (
        <MDBContainer>
            <MDBRow  className="d-flex justify-content-center mt-5">
                <h2 style={{fontWeight:'800'}}>You're Not Authorised To Access This Page</h2>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center mt-5">
                <img className="img-fluid" src={ErrorImage} width="200px" height="200px"/>
            </MDBRow>
            
            
        </MDBContainer>
    )
}

NotAuthorised.propTypes = {

}

export default NotAuthorised