import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { connect } from "react-redux";
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { MDBBtn,MDBContainer,MDBRow,MDBCol} from 'mdbreact';
import Loader from './Loader';
import Check from './check.svg';
import Cancel from './cancel.svg';
import { Link } from 'react-router-dom';

// the verify email mutation.

const verifyEmailMutation = gql`
mutation($token:String!){
    verifyUserEmail(token:$token){            
        _id,
        email,
        username
    } 
}
`

 
// the send verification code
const sendVerificationCode=gql`
    mutation($token:String){
        sendEmailVerificationCode(input:$token)
    }

`
function ConfirmEmail(props) {
    let history = useHistory();
    



    // the token comes in the form of string which is taken from the parameter.
    const { token } = useParams();
    const [name,setName]=useState('')
    



    //state used for errors
    const [errors, setErrors] = useState('')
    



   //verify mutation hook initiated here
    const [verifyFunction,{loading,error}]=useMutation(verifyEmailMutation,{
        onCompleted(cd) {
            setName(cd.verifyUserEmail.username)
            console.log("Confirm email data"+JSON.stringify(cd))
            console.log("data in confirm"+cd.verifyUserEmail)
            // if(props.auth.user.role.toLowerCase()==="student"){
            //     history.push("/dashboard")
            // }else if(props.auth.user.role.toLowerCase()=="admin"){
            //     history.push("/admin-dashboard")
            // }
        },
        onError(err) {
            // console.log(err.message)
            const ab = err.message;
            const AB = ab.split(":");
            const info=AB[1]
            console.log(AB[1]);
            setErrors(info.toString().toUpperCase())

        }
    });



    // the code verification starts as the component mounts

    const [sendCode]=useMutation(sendVerificationCode);
    const verifyUser=()=>{
        verifyFunction({
            variables:{
                token:token
            }
        })
    }

// the verification will start as soon as the component is mounted.
    
    
    useEffect(() => {
        verifyUser()
        console.log('ran')
    }, [])

// the function for sending the mutation.
    const sendCodeFunc=()=>{
        sendCode({
            variables:{
                token
            }
        })
    }
    if (loading) {
        return (
            <Loader/>
        )
    }
     else {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size='12'>
                        <div className='text-center mt-3'>
                        <div className=''>
                                    
                                    <img src={errors?Cancel:Check} height='150' width='150'></img> 
                                    <h3 className='h3-responsive p-3 mt-2'>{errors ? errors : `congratulations ${name}`}</h3>
                                    <h5 className='h5 responsive'>{errors?'Please generate a new token':'your email has been verified'}</h5>
                                    <button type="submit" className="btn btn-info mt-4 w-50 text-center rounded"><Link style={{color:'white'}} to='/login'> Log In</Link></button>
                         </div>

                                {/* <h4 className='h4-responsive mt-3 mb-2'><strong>Resend the link</strong></h4> */}
                                
                           {/* {!completed&&( <button type="submit" className="btn btn-info mt-2 w-50 text-center " disabled={loading} onClick={sendCodeFunc}>
                                {loading && (<Loader />)}
                                {!loading&& <span>Send</span>}
                             
                             
                             
                        </button>)} */}
                        
                           
                        </div>

                        </MDBCol>
                    </MDBRow>

                    
             </MDBContainer>

         
                


                {/* {
                error&&<div>
                    {errors.message}
                    
                    <MDBBtn onClick={()=>sendCodeFunc()}>Send Verification Link Again</MDBBtn>
                    </div>
            } */}
            
            </div>
        )
    }
}

ConfirmEmail.propTypes = {
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, {})(ConfirmEmail)

