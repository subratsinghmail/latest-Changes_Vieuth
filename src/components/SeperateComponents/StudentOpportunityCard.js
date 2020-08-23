
import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBRow, MDBCol, MDBBtn, MDBCardImage, MDBCardTitle, MDBLink } from 'mdbreact';
import logo from '../../vieuth.png'
import {useMutation} from '@apollo/react-hooks'
import {Link} from 'react-router-dom'
export default function StudentOpportunityCard(props) {
    


    const curr=parseInt(new Date().getTime());
    const end=parseInt(props.data.end);
    const diff=(end-curr)/(1000 * 3600 * 24);
    return (
        <MDBCol size="12" sm="6" md="4" lg="3"  className="mt-3">
            <MDBCard style={{ borderRadius: '12px', overflow: "hidden" }} >
                <div className="bg-dark">
                    <MDBCardImage className="mx-auto d-block img-fluid" src={logo} waves alt="Card image cap" height='100px' />
                    {/* <hr style={{color:'black',backgroundColor:'black'}}/> */}
                    <hr />
                </div>
                <MDBCardBody>
                    <div>{console.log("Date here"+diff)}</div>
                    <MDBCardTitle className="d-flex justify-content-between" style={{ fontWeight:'500', fontSize: '1rem', display: 'flex', flex: 'left', marginLeft: '0.2rem' }}>
                        <div className="">{props.data.title}</div>
                        {diff<=15&&(<div className="pr-1" style={{backgroundColor:'red',fontSize:'0.8rem'}}><strong>{`Expiring Soon `}<i className="fa fa-hourglass-end" aria-hidden="true"></i></strong></div>)}
                        </MDBCardTitle>
                    <MDBCardText>
                        <MDBRow  style={{ fontWeight:'400', display: 'flex', flex: 'left', marginLeft:'0.2rem' }}>
                            <small>{props.data.body?props.data.body:"Some"} </small>
                        </MDBRow>
                        <MDBRow className="text-center mt-2">
                            <MDBCol size="6" sm="6" style={{ fontWeight: '700', fontSize: '0.7rem' }}>Apply Before </MDBCol>
                            <MDBCol size="6" sm="6" style={{ fontWeight: '300', fontSize: '0.7rem' }}>{props.data.end?new Date(parseInt(props.data.end)).toString().substring(4,16):"End Date"}</MDBCol>
                        </MDBRow>
                        <MDBRow className="text-center" style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <MDBCol size="5" sm="5" style={{ fontWeight: '500', borderColor: 'black', backgroundColor: 'white', borderWidth: '1px', borderStyle: 'solid', fontSize: '0.8rem',padding:'1px 1px' }}><i className="fas fa-award">{` Rewards`}</i></MDBCol>
                            <MDBCol size="5" sm="5" style={{ fontWeight: '500', borderColor: 'black', backgroundColor: 'white', borderWidth: '1px', borderStyle: 'solid', fontSize: '0.8rem' ,padding:'1px 1px'}}><i className="fa fa-eye" aria-hidden="true">{` 41`}</i></MDBCol>
                        </MDBRow>
                        <MDBRow className=" text-center" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to={{
                                pathname:`/dashboard/projectDetails/${props.data.title}`,
                                state:props.data
                            }}>
                            <MDBBtn  size="12" className="p-2 pl-3 pr-3" style={{ backgroundColor: 'rgb(43, 239, 89)', marginBottom: '1rem', borderStyle: 'solid', borderRadius: '4px', borderWidth: '0', padding: '0rem 0rem', color: 'black' }}>
                                Apply 
                            </MDBBtn>
                            </Link>
                            {/* onClick={()=>props.clickHandler(props.data._id)} */}
                        </MDBRow>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            
    )
}
