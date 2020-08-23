import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import email from './email.svg';
import send from './send.png';
import gql from 'graphql-tag'
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Redirect,useHistory } from 'react-router-dom';
import Loader from './Loader';
const sendVerificationCode=gql`
    mutation sendEmailVerificationCode($token:String){
        sendEmailVerificationCode(input:$token)
    }
`






function SendEmailVerification(props) {
    
    // alert messages here
    const [alertMsg, setAlertMsg] = useState(false);
    const [Msg, setMsg] = useState('An email will be sent to the following email address')
    const [note, setNote] = useState(' note note-primary')
    const [userEmail,setUserEmail]=useState('')
    const [completed, setCompleted] = useState(false)
    let history = useHistory() // a history variable to redirect it to login.
    
    //asking for a local storage if the user exists and if not send it to login page
    useEffect(() => {
        if (localStorage.getItem('user')) {
            console.log('item is there');
            const info = localStorage.getItem('user')
            const info2 = JSON.parse(info)
            //setUserEmail(info2.email)
            console.log(info2);
            setUserEmail(info2.email)
          
        } else {
            history.push("/login")
       }
   },[])

  
   // send code mutation.
    

    const [sendCode, { loading,error }] = useMutation(sendVerificationCode, {
        
        onCompleted(cd) {
            
            setAlertMsg(true);
            setMsg('An email has been sent to')
            setNote('note note-success')
            setCompleted(true)
        },
        onError(e){
            
            setAlertMsg(false)
            const ab = e.message.split(":")
            setMsg(e.message)
            setNote('note note-danger')
            setCompleted(true)
        }
    });




   // function which calls the mutation.
    
    
    const sendCodeFunc = () => {
       
        sendCode({
            variables:{
                token:userEmail
            }
        })
    
    }



    
 // a test case to check  the hooks
    const testfunc = () => {
        
        console.log('button clicked');
    }
   




    return (
        <div>
        <MDBContainer>
        <MDBRow>
                <MDBCol size='12' className=''>
                    <div className='text-center mt-3'>
                        <div className=''>
                            {/* <h3 className='h3-responsive p-3'> Let's get you verified!</h3> */}
                           
                         </div>
                        <img src={alertMsg?send:email} height='150' width='150' ></img>
                        
                        <p className={note}>
                            <h5 className='h5-responsive p-2'>{Msg}</h5>
                            <h5><strong>{userEmail}</strong></h5>
                        </p>
                        <p> Not your email id?</p>

                        <h4 className='h4-responsive mt-3 mb-2'><strong></strong></h4>
                           {!completed&&( <button type="submit" className="btn btn-info mt-2 w-50 text-center " disabled={loading} onClick={sendCodeFunc}>
                                {loading && (<Loader />)}
                                {!loading&& <span>Send</span>}
                             
                             
                             
                        </button>)}
                        
                           
                        </div>
                        
                </MDBCol>        
         </MDBRow>
            
        
            </MDBContainer>
            </div>
    )
}

SendEmailVerification.propTypes = {

}

export default SendEmailVerification;

