import React ,{useState}from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import Navbar from './Navbar'
import {useMutation} from '@apollo/react-hooks'
import { MDBContainer, MDBRow, MDBCol, MDBInput,MDBBtn ,MDBCard} from 'mdbreact';
const updateProjectMutation=gql`
    mutation($id:String!,$title:String!,$body:String,$start:String,$end:String,$isPaid:Boolean,$type:String,$titleType:String){
        updateProject(id:$id,input:{title:$title,body:$body,start:$start,end:$end,isPaid:$isPaid,type:$type,titleType:$titleType}){
          _id
          body
          title
          active
          isPaid
          start
          end
        }
      }
`;
function UpdateProject(props) {
    const val=props.location.state
    const [projectState,setProjectState]=useState({
        title:val.title,
        body:val.body?val.body:'',
        start:'',
        end:'',
        isPaid:val.isPaid?val.isPaid:'',
        type:val.type?val.type:'',
        titleType:val.titleType?val.titleType:''
    })
    // const{loading,error,data}=useQuery(allProjectsQuery,{
    //     variables:{
    //         page:1,
    //         limit:10
    //     },
    // });
    const[errorM,setErrorM]=useState('');
    const [alertMsg,setAlertMsg]=useState(false)
    const [updateFunction,{data,error,loading}]=useMutation(updateProjectMutation,{
        onCompleted(cd){
            console.log("Project Updated")
            setAlertMsg(true)
        },onError(e){
            setErrorM(e.message)
        }
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(projectState);
        updateFunction({
            variables:{
                id:val._id,
                title:projectState.title,
                body:projectState.body,
                start:projectState.start.length<=1?val.start:projectState.start,
                end:projectState.end.length<=1?val.end:projectState.end,
                isPaid:projectState.isPaid=='true'?true:false,
                type:projectState.type,
                titleType:projectState.titleType
                
            }
        })

    console.log("project data"+JSON.stringify(data)+"project error"+error)
    }
    
    return (
        
        <div>
            {/* {props.location.state._id} */}
            
            <Navbar/>
            
            <MDBContainer style={{marginTop:'3rem'}}>
            {/* <MDBCard> */}
                {alertMsg&&
                (
                    <>
                    {window.scrollTo(0,0)}
                    <div class="alert alert-success" role="alert">
                    <string>Project Updated</string>
                    </div>
                    </>
                )}
            <MDBRow className="d-flex justify-content-center">
                
                <MDBCol md="8" lg="8" size="10" style={{boxShadow:'0px 5px 4px rgb(0,0,0.12)'}}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <p  className="h5  text-center mb-4  mt-2" style={{color:'Black'}}>Update Project</p>
                    <div className="grey-text">
                    <MDBInput icon="angle-right" label="Enter Title" value={projectState.title} onChange={(e)=>setProjectState({...projectState,title:e.target.value})} group type="text"  validate error="wrong"
                        success="right" />
                    <MDBInput icon="angle-right" label="Enter Body" value={projectState.body} onChange={(e)=>setProjectState({...projectState,body:e.target.value})}  group type="text" validate error="wrong"
                        success="right" />
                    <MDBInput icon="angle-right" label="Start Date" value={projectState.start} onChange={(e)=>setProjectState({...projectState,start:e.target.value})}  group type="date" validate error="wrong"
                        success="right" />
                    <MDBInput icon="angle-right" label="End Date" value={projectState.end} onChange={(e)=>setProjectState({...projectState,end:e.target.value})} group type="date" validate />
                    <MDBInput icon="angle-right" label="Paid(true/false)" value={projectState.isPaid?"True":"False"} onChange={(e)=>setProjectState({...projectState,isPaid:e.target.value})}  group type="text" validate />
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

UpdateProject.propTypes = {

}

export default UpdateProject

