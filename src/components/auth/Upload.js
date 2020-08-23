import React, { useState } from 'react';
import gql from 'graphql-tag';
import { MDBRow, MDBContainer, MDBCol,MDBBtn} from 'mdbreact';
import { useMutation } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import {ApolloClient} from '@apollo/client';    

const send_file = gql`

mutation uploadVerificationDocument($file:Upload!){
    uploadVerificationDocument(file:$file){
        filename
       mimetype
      encoding
    }
}
`
//  // getting the cache
const apolloCache = new InMemoryCache()



const uploadLink = createUploadLink({
    uri:'https://vieuth-backend.herokuapp.com/graphql',
})


const client = new ApolloClient({
    cache: apolloCache,
    link:uploadLink
})




export default function Upload() {
    
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Choose File')
    

    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    
    
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


    if (loading) {
        return `uploading`
    }
    


    return (  
           <ApolloProvider client={client}>
            <div>
            <MDBContainer fluid>
                
                <h3 className='text-center p-3 mt-4'>Veiuth Verification Platform</h3>
                <p className="note note-danger">
                         
                </p>
                <div className='d-flex  justify-content-center align-items-center' style={{ height: '100vh' }}>
                      
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



                        <div className='col-md-10'>

                        <form onSubmit={onSubmit}>
                        <div className="input-group mb-3 mt-3">
                         <div className="custom-file">
                          <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={onChange}/>
                           <label className="custom-file-label" htmlFor="inputGroupFile01">{fileName}</label>
                         </div>
                        </div>
                        <MDBBtn gradient="blue" type='submit' size='md' className='w-responsive'>Upload</MDBBtn>
                        </form>
                            
                        </div>
                    </div>
               </div>
                </MDBContainer>
                </div>
            </ApolloProvider>
            
            
    )
}