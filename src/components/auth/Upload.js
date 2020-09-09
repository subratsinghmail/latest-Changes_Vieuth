import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCol } from 'mdbreact';
import Loader from './Loader';

const send_file = gql`

mutation uploadVerificationDocument($file:Upload!){
    uploadVerificationDocument(file:$file){
        filename
       mimetype
      encoding
    }
}
`;





export default function Upload() {
    
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Choose File')
    const [modal,setModal]=useState(false)
    
    // onchange for modal
    const toggle=()=>{
      setModal(!modal)
    }

     
 useEffect(()=>{
   
    toggle()
   
   console.log('came here')

 },[])



    // on change function for for files
    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    
    //on submit
    const onSubmit = e => {
        e.preventDefault()
        console.log(file);
        console.log(fileName);
        submit({
            variables: {
                file:file
            }
        })
    }


    

    const [submit, { loading, error}] = useMutation(send_file, {
        onCompleted(cd) {
            console.log(cd.uploadVerificationDocument.message);
          },
        onError(err) {
              console.log(err.message);
          }  
    
    })  


    // if (loading) {
    //     return `uploading`
    // }
    


    return (  
        
            <div>
            <MDBContainer fluid>
                
                <h3 className='text-center p-3 mt-4'>Veiuth Verification Platform</h3>
                
                <div className='d-flex  justify-content-center align-items-center'>
                      
                    <div className='row d-flex justify-content-center text-center'>
                     <div className='col-md-10'>
                       <div>         
                         <p className="note note-primary">
                           <strong> Student:</strong>Upload your college ID
                         </p>
                          <p className="note note-danger">
                           <strong> Corporate:</strong>Upload your Corporate ID
                         </p>
                        </div>
                    </div> 
                          <MDBContainer>
                          {/* <MDBBtn onClick={toggle}>Modal</MDBBtn> */}
                          <MDBModal isOpen={modal} toggle={toggle} centered>
                            <MDBModalHeader className='text-center' toggle={toggle}>Verification Pending</MDBModalHeader>
                            <MDBModalBody>
                              <p>You need to upload your a scan of your ID card</p>
                            </MDBModalBody>
                            <MDBModalFooter>
                               <MDBBtn color="danger" className='w-responsive' onClick={toggle}>Close</MDBBtn>
                            </MDBModalFooter>
                          </MDBModal>
                        </MDBContainer>



                        <div className='col-md-10 mt-4'>

                        <form onSubmit={onSubmit}>
                        <div className="input-group mb-3 mt-3">
                         <div className="custom-file">
                          <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={onChange}/>
                           <label className="custom-file-label" htmlFor="inputGroupFile01">{fileName}</label>
                         </div>
                        </div>
                        <MDBBtn gradient="blue"  size='md' className='w-responsive' type="submit">
                          {loading&&(<Loader/>)}
                          {!loading&&(<span> Upload</span>)}
                        </MDBBtn>
                        </form>
                            
                        </div>
                    </div>
               </div>
                </MDBContainer>
                </div>
            
            
            
    )
}