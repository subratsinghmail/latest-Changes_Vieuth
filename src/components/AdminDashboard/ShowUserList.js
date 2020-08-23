import React,{useState,useEffect} from 'react'
import {useQuery,useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { MDBContainer,MDBFormInline,MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol,MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
import Navbar from './Navbar';
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import UserCard from '../SeperateComponents/userCardComponent'
const showUserQuery=gql`
    query ($page:Int,$limit:Int){
        allUsers(page:$page,limit:$limit){
            totalPages,
            totalDocs,
            page,
            hasPrevPage,
            hasNextPage,
            docs{
                _id,
                role,
                email,
                verified,
                profile{
                  _id,
                  fullName,
                  fName,
                  lName 
                }
              }
        }
    }`;
    // const pageNumbers=[]
    // for(let i=0;i<3;i++){
    //     pageNumbers.push(i+1);
    // }
function ShowUserList(props) {
    const [pageCount,setPageCount]=useState(1);
    const [query,setQuery]=useState('')
    const [cardView,setCardView]=useState(false);
    const [tableView,setTableView]=useState(true);
    // const [arr,newArr]=useState(()=>{
    //     const rows=[];
    //     for(let i=0;i<3;i++){
    //         rows.push(i+1);
    //     }
    //     return rows;
    // })
    // const [skip,setSkip]=useState(false);
    const {error,loading,data}=useQuery(showUserQuery,{
        variables:{
            page:pageCount,
            limit:12
        }
        
        
    })
    const filterData=data?data.allUsers.docs:null;
    const showData=query&&data?filterData.filter((c)=>{
        if(c.fName){
            return c.fName.toString().toLowerCase().includes(query.toString().trim().toLowerCase())
        }else{
         return c.email.toString().toLowerCase().includes(query.toString().trim().toLowerCase())
        }
        
    }):filterData
    return (
        <>
        <Navbar/>
        <div className="mt-5">
        {/* {data&&console.log(data.allUsers)} */}
        <MDBContainer >
        <MDBRow>
        <MDBCol md="6">
        <MDBFormInline className="md-form ">
            <MDBIcon icon="search" />
            
            <input className="form-control a form-control-sm ml-3 w-75" value={query} onChange={(e)=>setQuery(e.target.value)} type="text" placeholder="Search Users" aria-label="Search" />
        </MDBFormInline>
        
        </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center mt-3 mb-3">
                        <MDBBtn className="p-1 bg-red" style={{backgroundColor:'rgb(236, 64, 122)'}} disabled={cardView} onClick={()=>{
                            setCardView(!cardView)
                            setTableView(!tableView)
                            }}
                        >Card View </MDBBtn>
                        <MDBBtn className="p-1 bg-red" disabled={tableView} onClick={()=>{
                            setCardView(!cardView)
                            setTableView(!tableView)
                            }}>TableView</MDBBtn>
        </MDBRow>
        {loading?<Spinner/>:
        <>
        {data&&cardView&&
        <>
        {showData.map((val,index)=>(
            <UserCard userData={val} key={index}/>
        ))}
        
        <MDBContainer>
                   <MDBRow className="d-flex justify-content-center mt-3">
                        <MDBBtn className="p-1 bg-red" style={{backgroundColor:'rgb(236, 64, 122)'}} disabled={data&&!data.allUsers.hasPrevPage} onClick={()=>{
                            setPageCount(pageCount-1);
                            }}>Prev </MDBBtn>
                        <MDBBtn className="p-1 bg-red" disabled={data&&!data.allUsers.hasNextPage} onClick={()=>{
                            setPageCount(pageCount+1);
                            }}>Next</MDBBtn>
                   </MDBRow>
                   <MDBRow className="d-flex justify-content-center">
                      <small><strong>{`PageNo. ${pageCount}`}</strong></small> 
                      {/* <nav aria-label="Page navigation example">
                        <ul className="pagination pg-red">
                            <li className="page-item disabled">
                            <a className="page-link" tabindex="-1">Previous</a>
                            </li>
                            {console.log("inside render"+pageNumbers)}
                            {
                                
                                arr.map((val,key)=>(
                                    <li key={key} className="page-item" >
                                        <a className="page-link">{val}</a>
                                    </li>
                                ))
                            }
                            <li className="page-item"><a className="page-link">1</a></li>
                            <li className="page-item active">
                            <a className="page-link">2 <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="page-item"><a className="page-link">3</a></li>
                            <li className="page-item">
                            <a className="page-link" onClick={()=>{
                                newArr(arr.push(5))
                                }}>Next</a>
                            </li>
                        </ul>
                        </nav> */}
                   </MDBRow>
        </MDBContainer>
        </>}
        {data&&tableView&&
        <>
        <MDBContainer>
        <MDBTable className="table-responsive-lg" hover>
      <MDBTableHead  style={{backgroundColor:'#EC407A'}}>
        <tr >
          <th scope="col">Index</th>  
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Verified</th>
          <th scope="col">Role</th>
          <th scope="col">View Profile</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
          {showData.map((val,index)=>(
            <>
            <tr  key={index}>
            <th scope="row">{index+1}</th>
            {/* <td>{index+1}</td> */}
            <td>{val.profile?val.profile.fName:'Undefined'}</td>
            <td style={{color:'blue'}}>{val.email}</td>
            <td>{val.verified?"True":"False"}</td>
            <td>{val.role}</td>
            <td><Link to={{
                            pathname:'/admin-dashboard/show-users/user-profile',
                            state:val
                        }}><MDBBtn className="p-1 btn-sm">View Profile</MDBBtn>
                        </Link></td>
            </tr>
            </>
          ))}
        
        
      </MDBTableBody>
    </MDBTable>
    </MDBContainer>
    <MDBContainer>
                   <MDBRow className="d-flex justify-content-center mt-3">
                        <MDBBtn className="p-1 bg-red" style={{backgroundColor:'rgb(236, 64, 122)'}} disabled={data&&!data.allUsers.hasPrevPage} onClick={()=>{
                            setPageCount(pageCount-1);
                            }}>Prev </MDBBtn>
                        <MDBBtn className="p-1 bg-red" disabled={data&&!data.allUsers.hasNextPage} onClick={()=>{
                            setPageCount(pageCount+1);
                            }}>Next</MDBBtn>
                   </MDBRow>
                   <MDBRow className="d-flex justify-content-center">
                      <small><strong>{`PageNo. ${pageCount}`}</strong></small> 
                      {/* <nav aria-label="Page navigation example">
                        <ul className="pagination pg-red">
                            <li className="page-item disabled">
                            <a className="page-link" tabindex="-1">Previous</a>
                            </li>
                            {console.log("inside render"+pageNumbers)}
                            {
                                
                                arr.map((val,key)=>(
                                    <li key={key} className="page-item" >
                                        <a className="page-link">{val}</a>
                                    </li>
                                ))
                            }
                            <li className="page-item"><a className="page-link">1</a></li>
                            <li className="page-item active">
                            <a className="page-link">2 <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="page-item"><a className="page-link">3</a></li>
                            <li className="page-item">
                            <a className="page-link" onClick={()=>{
                                newArr(arr.push(5))
                                }}>Next</a>
                            </li>
                        </ul>
                        </nav> */}
                   </MDBRow>
        </MDBContainer>
        </>
        }
        
        </>
        }
         
        </MDBContainer>
        </div>
            
        </>
    )
}

ShowUserList.propTypes = {

}

export default ShowUserList

