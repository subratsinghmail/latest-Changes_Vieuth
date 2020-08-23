import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBRow, MDBCol, MDBBtn, MDBCardImage, MDBCardTitle, MDBLink } from 'mdbreact';
import logo from '../../vieuth.png'
import {useMutation} from '@apollo/react-hooks'
import {Link} from 'react-router-dom'
export default function StudentCardComponent2(props) {
    // const [applyProject,{loading,error,data}]=useMutation(applyProjectMutation,{
    //     onCompleted(cd){
    //         console.log("data here"+cd.applyForProject.project.body)
    //         console.log("Lodaing here"+loading)
    //         console.log("error here"+error)
    //     }
    // })
    // const handleClick=()=>{
    //     console.log(props.data._id)
    //     applyProject({
    //         variables:{
    //             _id:props.data?props.data._id:''
    //         }
    //     })
       
    // }
    return (
        <>
        {/* <MDBCol size="12" sm="6" md="4" lg="3"  className="mt-3"> */}
            <MDBCard className="w-75 " style={{ borderRadius: '12px', overflow: "hidden" }} >
                <div  className="bg-dark">
                    <MDBCardImage className="mx-auto d-block img-fluid" src={logo} waves alt="Card image cap" height='100px' />
                    {/* <hr style={{color:'black',backgroundColor:'black'}}/> */}
                    <hr />
                </div>
                <MDBCardBody>
                    <MDBCardTitle style={{ fontWeight:'500', fontSize: '1rem', display: 'flex', flex: 'left', marginLeft: '0.2rem' }}>{props.data.title}</MDBCardTitle>
                    <MDBCardText>
                        <MDBRow style={{ fontWeight:'400', display: 'flex', flex: 'left', marginLeft:'0.2rem' }}>
                            <small>{props.data.body?props.data.body:"Some"} Company</small>
                        </MDBRow>
                        <MDBRow className="text-center mt-2">
                            <MDBCol size="6" sm="6" style={{ fontWeight: '700', fontSize: '0.7rem' }}>Apply Before </MDBCol>
                            <MDBCol size="6" sm="6" style={{ fontWeight: '300', fontSize: '0.7rem' }}>{props.data.end?new Date(parseInt(props.data.end)).toString().substring(4,16):"End Date"}</MDBCol>
                        </MDBRow>
                        <MDBRow className="text-center" style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <MDBCol size="5" sm="5" style={{ fontWeight: '500', borderColor: 'black', backgroundColor: 'white', borderWidth: '1px', borderStyle: 'solid', fontSize: '0.8rem',padding:'1px 1px' }}><i className="fas fa-award">{` Rewards`}</i></MDBCol>
                            <MDBCol size="5" sm="5" style={{ fontWeight: '500', borderColor: 'black', backgroundColor: 'white', borderWidth: '1px', borderStyle: 'solid', fontSize: '0.8rem' ,padding:'1px 1px'}}><i class="fa fa-eye" aria-hidden="true">{` 41`}</i></MDBCol>
                        </MDBRow>
                        <MDBRow className=" text-center" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Link className="btn btn-primary p-2 pl-3 pr-3" size="12" style={{ backgroundColor: 'rgb(43, 239, 89)', marginBottom: '1rem', borderStyle: 'solid', borderRadius: '4px', borderWidth: '0', padding: '0rem 0rem', color: 'black' }} to={{
                                pathname:`/dashboard/projectDetails/${props.data.title}`,
                                state:props.data
                            }}>

                           
                                Apply 
                            
                            </Link>
                            {/* onClick={()=>props.clickHandler(props.data._id)} */}
                        </MDBRow>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        {/* </MDBCol> */}
        </>
    )
}
