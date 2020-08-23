import React from 'react'
import PropTypes from 'prop-types'
import ErrorImage from './404page.png'
import { MDBContainer, MDBRow, MDBCol,MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
function Unavaliable(props) {
    return (
        <MDBContainer>
            <MDBRow  className="d-flex justify-content-center mt-4">
                <h2 style={{fontWeight:'800'}}>This Page is Unavailable</h2>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
                <img className="img-fluid" src={ErrorImage} width="500px" height="500px"/>
            </MDBRow>
            
            
        </MDBContainer>
    )
}

Unavaliable.propTypes = {

}

export default Unavaliable

