import React ,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import email from './email.svg';
import send from './send.png';
import gql from 'graphql-tag'
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import Loader from './Loader';
const sendVerificationCode=gql`
    mutation sendEmailVerificationCode($token:String){
        sendEmailVerificationCode(input:$token)
    }
`


// getting the local storage.
const info = localStorage.getItem('user')
console.log("data here");
// storing into an object
const details = JSON.parse(info);

// extracting the email.
  console.log(details.email);
function SendEmailVerification(props) {
    
    // alert messages here
    const [alertMsg, setAlertMsg] = useState(false);
   
   // error component here
    const [error,setError]=useState({
        isError:false,
        msg:''
    });                
  
   // loading state here.
    


    const [sendCode, { loading, called }] = useMutation(sendVerificationCode, {
        
        onCompleted(cd) {
            
            setAlertMsg(true);
            setError({
                isError:false
            })
        },
        onError(e){
            
            console.log(e.message)
        }
    });


   // function which calls the mutation.
    const sendCodeFunc = () => {
        console.log(called)
        sendCode({
            variables:{
                token:details.email
            }
        })
    }
    return (
        <MDBContainer>
        <MDBRow>
                <MDBCol size='12' className=''>
                    <div className='text-center mt-3'>
                        <div className=''>
                            <h3 className='h3-responsive p-3'> Let's get you verified!</h3>
                           
                         </div>
                        <img src={alertMsg?send:email} height='150' width='150' ></img>
                        <h5 className='h5-responsive mt-3 mb-2'>{alertMsg ? 'The email has been sent to':'An email will be sent to the following registered id'}             </h5>
                        <h4 className='h4-responsive mt-3 mb-2'><strong>{details.email}</strong></h4>
                        <form onSubmit={sendCodeFunc}>
                            <button type="submit" className="btn btn-info mt-2 w-50 text-center " disabled={loading}>
                                {loading && (<Loader />)}
                                {!loading&& <span>Send</span>}
                             
                             
                             
                          </button>
                         </form>
                    </div>
                        
                </MDBCol>        
         </MDBRow>
            
        
        </MDBContainer>
    )
}

SendEmailVerification.propTypes = {

}

export default SendEmailVerification

