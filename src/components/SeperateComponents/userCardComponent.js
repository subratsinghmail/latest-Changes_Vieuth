import React from 'react'
import { MDBCard, MDBCardBody, MDBCardText, MDBRow, MDBCol, MDBBtn, MDBCardImage, MDBCardTitle } from 'mdbreact';
import logo from './avatar3.webp'
import {Link} from 'react-router-dom'
export default function userCardComponent(props) {
    return (
        <MDBRow className="w-85 ml-1 mr-1 mt-3" style={{boxShadow:'0 5px 4px rgba(0,0,0,0.12)',borderLeftWidth:'9px',borderLeftColor:'#EC407A',borderLeftStyle:"solid",borderRadius:'10px'}}>
                <MDBCol size="3" className="d-flex justify-content-center ">
                <img src={logo} width="100px" height='100px' className="rounded img-fluid mx-auto d-block p-1" alt=""/>
                </MDBCol>
                <MDBCol size="9" style={{borderLeftWidth:'1px',borderLeftColor:'#EC407A',borderLeftStyle:"dashed"}}>
                    <MDBRow className="pl-2"><strong>{`Name : `}</strong>{props.userData.profile?props.userData.profile.fName:"None"}</MDBRow>
                    <MDBRow className="pl-2"><strong>{`Email : `}</strong>{props.userData&&(<p>{props.userData.email}</p>)}</MDBRow>
                    <MDBRow className="d-flex justify-content-between pl-2">
                        <div><strong>{`Role : `}</strong>{props.userData.role?props.userData.role:"none"}</div>
                        <div className="pr-1"><strong>{`Verified:`}</strong>{props.userData.verified?"True":"False"}</div>
                    </MDBRow>
                    <MDBRow className="d-flex justify-content-end">
                        <Link to={{
                            pathname:'/admin-dashboard/show-users/user-profile',
                            state:props.userData
                        }}>
                        <MDBBtn style={{borderRadius:'15px',borderStyle:'solid'}}className="p-2 btn-pink">{`View Profile `}<i class="fas fa-arrow-right"></i></MDBBtn>
                        </Link>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        
    )
}
