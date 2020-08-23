import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import gql from 'graphql-tag';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
  

const mutation=gql`
mutation sendEmailVerificationCode($email:String!){
  sendEmailVerificationCode(input:$email)
}
`;





const RecoverPass=()=> {
  const formik = useFormik({
    initialValues: {
      email:''
    },
    onSubmit: values => {
      console.log(values.email);
    },
    validate: values => {
      let errors = {}
      if (!values.email) {
        errors.email='Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email='Invalid Email Format'
      }
      return errors;
    }
  })
 
   const [status,setStatus]=useState('')

   const [reset, { loading }] = useMutation(
    mutation, {
      onCompleted(cd) {
        setStatus('An email with instructions has been sent to'+" "+formik.values.email)
      }
    }
  )

  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol size='12'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='mt-5 w-50'>                
                <h3 className='h3-responsive mb-3 text-center'> Forgot password</h3>
                <div class="alert alert-success" role="alert">
                  
                 </div>
                <div>
                <MDBInput
								label="Email" name="email" id="email"
                icon="envelope" group  type="text" validate className="mb-0" value={formik.values.email}onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                </div>
                <div className="red-text text-center p-2 mb-1">
							{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}
								
							</div>
                  <div className='text-center'>
                <button type="button" class="btn btn-info mt-2 " disabled={!(formik.dirty&&formik.isValid)}> Send</button>
                </div>
                </div>
              </div>            
         </MDBCol>
        </MDBRow>

      </MDBContainer>

    </div>
  )
} 



export default RecoverPass;