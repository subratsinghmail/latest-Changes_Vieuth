import React,{useState} from 'react'
import PropTypes from 'prop-types'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import {useQuery,useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Navbar from './Navbar'
import { MDBContainer, MDBRow, MDBCol, MDBInput,MDBBtn ,MDBCard} from 'mdbreact';

const createProjectMutation=gql`
mutation ($title:String!,$body:String,$start:String,$end:String,$isPaid:Boolean,$type:String,$titleType:String){
    createProject(input:{title:$title,body:$body,start:$start,end:$end,isPaid:$isPaid,type:$type,titleType:$titleType}){
        _id,
        title,
        body
    }
}
`;
// const allProjectsQuery=gql`
//     query ($page:Int,$limit:Int){
//         allProjects(page:$page,limit:$limit){
//             totalPages,
//             totalDocs,
//             docs{
//             title,
//             body,
//             start,
//             end
//             }
//         }
//     }
// `;

function Projects(props) {
    const [projectState,setProjectState]=useState({
        title:'',
        body:'',
        start:'',
        end:'',
        isPaid:'',
        type:'',
        titleType:''
    })
    // const{loading,error,data}=useQuery(allProjectsQuery,{
    //     variables:{
    //         page:1,
    //         limit:10
    //     },
    // });
    const[errMsg,setErrMsg]=useState('');
    const [alertMsg,setAlertMsg]=useState(false);
    const [projectFunction,{data,error}]=useMutation(createProjectMutation,
        {
            onCompleted(cd){
                setAlertMsg(true);
            },
            onError(e){
                setErrMsg(e.message)
            }
        })
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(projectState);
        projectFunction({
            variables:{
                title:projectState.title,
                body:projectState.body,
                start:projectState.start,
                end:projectState.end,
                isPaid:projectState.isPaid=='true'?true:false,
                type:projectState.type,
                titleType:projectState.titleType
                
            }
        })
        // console.log(data +error)
        // console.log("tokem"+localStorage.getItem('user').user)
    // const d=new Date(parseInt(data.allProjects.docs[0].start)).toString().substring(4,16);
    // console.log("date : "+d)
    //     const user=JSON.parse(localStorage.getItem('user'))
    //     console.log(JSON.stringify(JSON.parse(localStorage.getItem('user')).token) )
    //     setIsSubmitted(true);
    console.log("project data"+data+"project error"+error)
    }
    return (
        
        <div>
            <Navbar/>
            {alertMsg&&
                (
            <MDBContainer className="d-flex justify-content-center">
                <MDBRow className=" text-center mt-2 w-75" >
            
                    <>
                    {window.scrollTo(0,0)}
                    <div className="alert alert-success" role="alert" style={{width:'100%'}}>
                    <strong>Project Created</strong>
                    </div>
                    </>
                </MDBRow>
            </MDBContainer>)
            }
            
            <MDBContainer style={{marginTop:'3rem'}}>
            {/* <MDBCard> */}
            <MDBRow className="d-flex justify-content-center">
                
                <MDBCol md="8" lg="8" size="10" style={{boxShadow:'0px 5px 4px rgb(0,0,0.12)'}}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <p  className="h5  text-center mb-4  mt-2" style={{color:'Black'}}>Create Project</p>
                    <div className="grey-text">
                    <MDBInput icon="angle-right" label="Enter Title" value={projectState.title} onChange={(e)=>setProjectState({...projectState,title:e.target.value})} group type="text"  validate error="wrong"
                        success="right" />
                    <MDBInput icon="angle-right" label="Enter Body" value={projectState.body} onChange={(e)=>setProjectState({...projectState,body:e.target.value})}  group type="text" validate error="wrong"
                        success="right" />
                    <MDBInput icon="angle-right" label="Start Date" value={projectState.start} onChange={(e)=>setProjectState({...projectState,start:e.target.value})}  group type="date" validate error="wrong"
                        success="right" />
                    <MDBInput icon="angle-right" label="End Date" value={projectState.end} onChange={(e)=>setProjectState({...projectState,end:e.target.value})} group type="date" validate />
                    <MDBInput icon="angle-right" label="Paid(true/false)" value={projectState.isPaid} onChange={(e)=>setProjectState({...projectState,isPaid:e.target.value})}  group type="text" validate />
                    <MDBInput  icon="angle-right" label="Project type" value={projectState.type} onChange={(e)=>setProjectState({...projectState,type:e.target.value})} group type="text" validate />
                    <MDBInput icon="angle-right" label="Title Type" value={projectState.titleType} onChange={(e)=>setProjectState({...projectState,titleType:e.target.value})} group type="text" validate />
                    </div>
                    <div className="text-center">
                    <MDBBtn type="submit">Submit</MDBBtn>
                    </div>
                </form>
                </MDBCol>
                
            </MDBRow>
            {/* </MDBCard> */}
        </MDBContainer>
        
        </div>
        
    )
}

Projects.propTypes = {

}

export default Projects

