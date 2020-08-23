import React from 'react'
import PropTypes from 'prop-types'
import {useQuery, useMutation} from '@apollo/react-hooks'
import {Link} from 'react-router-dom'
import {MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter ,MDBContainer,MDBSelect,MDBFormInline,MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol,MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
import gql from 'graphql-tag'
import { useState } from 'react';
import Navbar from './Navbar'
import Spinner from '../layout/Spinner'
const allProjectsQuery=gql`
    query ($title:String,$page:Int,$limit:Int,$orderBy:String){
        searchProject(title:$title,page:$page,limit:$limit,orderBy:$orderBy){
            totalPages,
            totalDocs,
            hasPrevPage,
            hasNextPage,
            docs{
            _id,
            title,
            body,
            start,
            end,
            isPaid,
            type,
            titleType
            active,
            updatedAt
            }
        }
    }
`;
const deleteProject=gql`
    mutation($id:String){
        deleteProject(input:$id)
    }
`
const limit=12
function DisplayProjects(props) {
    const [pageCount,setPageCount]=useState(1);
    const [deleteID,setDeleteID]=useState('');
    const [toggle,setToggle]=useState(false);
    // const [limit,setLimit]=useState(12)
    const [orderBy,setOrderBy]=useState("title");
    const [deleteTitle,setDeleteTitle]=useState('');
    const [title,setTitle]=useState("")
    const [option,setOption]=useState('None')
    const handleToggle=(data)=>{
        setDeleteID(data._id);
        setDeleteTitle(data.title)
        setToggle(!toggle);
        
    }
    const {loading,data,error}=useQuery(allProjectsQuery,{
        variables:{
            title:title,
            page:pageCount,
            limit:limit,
            orderBy:orderBy
        }
    },{ errorPolicy: 'all' })
    const [deleteFunction]=useMutation(deleteProject,{
        onCompleted(cd){
            setToggle(!toggle)
            
        },
        onError(e){

        },
        refetchQueries:['allProjectsQuery']
    })
    const handleDelete=(data)=>{
        setOption('delete')
        deleteFunction({
            variables:{
                id:data
            }
        })
        
    }
    
    // if(loading){
    //     return <Spinner/>
    // }
    // const filterData=data?data.searchProject.docs.sort(function(a,b){
    //     if(a.title.toLowerCase()<b.title.toLowerCase())return -1;
    //     if(a.title.toLowerCase()>b.title.toLowerCase())return 1;
    // }):null;
    // const filterData=data?data.searchProject.docs.sort(function(a,b){
    //     console.log("date"+new Date(parseInt(a.updatedAt)))
    //     return new Date(parseInt(b.updatedAt))-new Date(parseInt(a.updatedAt));
    // }):null;
    const filterData=()=>{
        if(!data){
            return null
        }
        switch (option) {
            case 'None':
                return data.searchProject.docs
               
            case 'Title':
                return data.searchProject.docs.sort(function(a,b){
                    if(a.title.toLowerCase()<b.title.toLowerCase())return -1;
                    if(a.title.toLowerCase()>b.title.toLowerCase())return 1;
                })
                
            case 'LastUpdated':
                return data.searchProject.docs.sort(function(a,b){
                return new Date(parseInt(b.updatedAt))-new Date(parseInt(a.updatedAt))
                })
            case 'delete':
                return data.searchProject.docs.filter((val)=>{
                    return val._id!==deleteID
                })
            
        }
    }
    if(error){
        return <h3>{error.message}</h3>
    }
    return (
        <>

            <Navbar/>
            
            {/* {error&&(
                <div>
                    {error.message}
                </div>
            )} */}
            <MDBContainer className="mt-5">
        <MDBRow className="d-flex justify-content-between pl-3 pr-3">
        <div>
            <form className="form-inline  md-form form-sm active-pink active-pink-2 mt-5 ">
            <i className="fas fa-search" aria-hidden="true"></i>
            <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                aria-label="Search" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </form>
        </div>
        <div className="d-flex justify-content-end">
        <select className="custom-select custom-select-sm mt-5 mr-5" onChange={(e)=>setOrderBy(e.target.value)}>
        {/* <option selected disabled>Sory By</option> */}
        <option  value="title">Title</option>
        <option value="updatedAt">Last Updated</option>
        <option  value="end">End Date</option>
        <option value="start">Start Date</option>
        </select>
        
        </div>
       
       
        </MDBRow>
        {/* <MDBRow className="pl-2 pr-3">
        <form className="form-inline form-sm">
        
        <div className="form-group mx-sm-3 mb-2">
            <label for="inputPassword2" className="sr-only">Password</label>
            <input type="text" className="form-control-sm"  placeholder="Set Limit"/>
        </div>
        <button type="submit" className="btn-sm btn-primary mb-2" onClick={(e)=>setOption(e.target.value)}>Set</button>
        </form>
        </MDBRow> */}
        
        {loading&&
            <>
            <Spinner/>
            </>
        }
            {data&&loading!=true&&
        <>
        
        
        {/* {console.log("filtered data here"+JSON.stringify(filterData))} */}
        {/* <MDBCol md="12">
        <form className="form-inline d-flex justify-content-start md-form form-sm active-pink active-pink-2 mt-2">
            <div>
        <i className="fas fa-search" aria-hidden="true"></i>
        <input className="form-control form-control-sm ml-2 " type="text" placeholder="Search"
            aria-label="Search"/>
        </div>
        
        </form>
        </MDBCol> */}
        

        
      
        
        
        {/* <MDBRow><h4>Projects Lists</h4></MDBRow> */}
        <MDBTable className="table-responsive-lg" hover>
        <MDBTableHead  style={{backgroundColor:'black'}}>
        <tr  style={{color:'white'}}>
          <th scope="col">Index</th>  
          <th scope="col">Title</th>
          <th scope="col">Start</th>
          <th scope="col">End</th>
          <th scope="col">Last Updated</th>
          <th scope="col">Active</th>
          <th scope="col">Update Project</th>
          <th scope="col">Delete Project</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
          {data&&filterData().map((val,index)=>(
            <>
            <tr  key={index}>
            <th scope="row">{(pageCount-1)*limit+index+1}</th>
            {/* <td>{index+1}</td> */}
            <td>{val.title?val.title:'Undefined'}</td>
            <td style={{color:'blue'}}>{val.start?new Date(parseInt(val.start)).toString().substring(4,16):"Start Date"}</td>
            <td style={{color:'blue'}}>{val.end?new Date(parseInt(val.end)).toString().substring(4,16):"End Date"}</td>
            <td>{val.updatedAt?new Date(parseInt(val.updatedAt)).toString().substring(4,16):"Null"}</td>
            <td>{val.active==true?"True":"False"}</td>
            <td>
                <Link to={{
                    pathname:`/admin-dashboard/display-projects/update-project/${val.title}`,
                    state:val
                }}>
                <MDBBtn color="green" style={{borderRadius:'10px'}} className="p-2 btn-sm bgdark">Update</MDBBtn>
                </Link>
            </td>
            <td>
            <MDBBtn color="red" style={{borderRadius:'10px'}} className="p-2 btn-sm" onClick={()=>handleToggle(val)}>Delete</MDBBtn>
            </td>
            </tr>
            </>
          ))}
        
        
      </MDBTableBody>
    </MDBTable>
    
    <MDBContainer>
                   <MDBRow className="d-flex justify-content-center mt-3">
                        <MDBBtn className="p-1 bg-red" style={{backgroundColor:'rgb(236, 64, 122)'}} disabled={data&&!data.searchProject.hasPrevPage} onClick={()=>{
                            setPageCount(pageCount-1);
                            }}>Prev </MDBBtn>
                        <MDBBtn className="p-1 bg-red" disabled={data&&!data.searchProject.hasNextPage} onClick={()=>{
                            setPageCount(pageCount+1);
                            }}>Next</MDBBtn>
                   </MDBRow>
                   <MDBRow className="d-flex justify-content-center">
                      <small><strong>{`PageNo. ${pageCount}`}</strong></small> 
                   </MDBRow>
        </MDBContainer>
        </>
        }
        </MDBContainer>
        <MDBContainer className="">
        {/* //Modal Pop Up for deleting a Project */}
        <MDBModal className="" isOpen={toggle} toggle={()=>setToggle(!toggle)} centered size="md">
            <MDBModalHeader toggle={()=>setToggle(!toggle)}>{`Delete `} <strong style={{color:'red'}}>{deleteTitle}</strong></MDBModalHeader>
            <MDBModalBody>
            Are You Sure you want to delete this project ?
            <br/>
            <div style={{color:"red"}}>{`Title : ${deleteTitle}`}</div>
            </MDBModalBody>
            <MDBModalFooter>
            <MDBBtn color="green" onClick={()=>setToggle(!toggle)}>Close</MDBBtn>
            <MDBBtn color="red" onClick={()=>handleDelete(deleteID)}>Delete</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
        </MDBContainer>
        </>
    )
}

DisplayProjects.propTypes = {

}

export default DisplayProjects

