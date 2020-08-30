import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput,MDBModalFooter } from 'mdbreact';
import gql from 'graphql-tag';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import Loader from "./Loader";
import { Link } from 'react-router-dom';
  

const RESET_MUTATION=gql`
mutation forgotPassword($email:String!){
  forgotPassword(input:$email)
}
`;





const RecoverPass=()=> {
  const formik = useFormik({
    initialValues: {
      email:''
    },
    onSubmit: values => {
      
      reset({
        variables: {
          email:values.email
        }
      })

      

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
 

  //states start here
  const [status, setStatus] = useState("Lets get your account back")
  const [errors,setErrors]=useState(false)
  //states end here

  //useMutation hook
   const [reset, { loading }] = useMutation(
    RESET_MUTATION, {
      onCompleted(cd) {
        
        if (cd.forgotPassword) {
          setStatus('An email with instructions has been sent to' + " " +(<br/>)+ formik.values.email)
          setErrors(false)

        } else {
         
          setStatus('we did not find any account with this id')
          setErrors(true)
        }
        
       },
       onError(err) {
         setStatus(err.message)
         setErrors(true)
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
                <div className={`alert ${errors ? 'alert-danger' : 'alert-success'} text-center  `} role="alert">
                  {status}
                 </div>
                
                  <form onSubmit={formik.handleSubmit}>
                <MDBInput
								label="Email" name="email" id="email" outline
                icon="envelope" group  type="text" validate className="mb-0" value={formik.values.email}onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              
                <div className="red-text text-center p-2 mb-1">
							{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}
								
							</div>
                  <div className='text-center'>
                    <button type="button" type="submit" className={`btn ${errors?'btn-danger':'btn-info'} mt-2`} disabled={loading||!(formik.dirty && formik.isValid)}>
                    {loading&&(<Loader/>)}
                    {!loading&&<span>Send Email</span>}
                    
                    </button>

                    <MDBModalFooter className="mt-4  mb-1">

                    </MDBModalFooter>
                    <button type="button" type="submit" className="btn btn-info mt-2 "> <Link to='/login' style={{textDecoration:'none',color:'white'}}>  Back to login </Link> </button>
                  </div>
                  </form>
                
                </div>
              </div>            
         </MDBCol>
        </MDBRow>

      </MDBContainer>

    </div>
  )
} 



export default RecoverPass;