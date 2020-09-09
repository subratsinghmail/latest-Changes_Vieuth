import React,{useState, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { getCurrentProfile } from '../../actions/profile';
import { useMutation } from '@apollo/react-hooks';
import {
	MDBRow,
	MDBContainer,
	MDBInput,
	MDBCol,
	MDBBtn,
} from 'mdbreact';
import Spinner from '../layout/Spinner';

import './login.css'
import { useFormik } from 'formik';
import Loader from './Loader';
//  react toastify here -- import { ToastContainer, toast } from 'react-toastify';



const loginMutation = gql`
mutation login($email:String!, $password:String!){
  login(input:{
    email:$email,
    password:$password
  })
  {
    _id,
	verified,
	enabled,
	role,
	profile{
		_id,
		fullName,
	  fName,
	  lName,
	  dob,
	  profilePicUrl,
	  gender,
	  college,
	  university,
	  branch,
	  degree,
	  contact{
		email,
		mobile,
		
	  },
	  website,
	  bio,
	  address{
		street,
		city,
		state,
		country
	  },
	  social{
		twitter,
		linkedIn,
		facebook,
		github
	  }
	  }
  
    
  }
}
`;

function LoginNew(props) {
   
    const formik = useFormik({
		initialValues: {
		  email: '',
		  password:'',
		},
		onSubmit: (values,{resetForm}) => {
		  
			loginFunction({
				variables: {
					email: values.email,
					password:values.password,
				}
			});
			resetForm({values:''})



		},
		validate: values => {
		  let errors = {}
		  if (!values.email) {
			errors.email='Required'
		   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email='Invalid Email Format'
		  } 
		  if (!values.password) {
			errors.password= 'Required'
		  }
	
		  return errors;
		}
	  })
	
	
	


	const [show, setShow] = useState({
    password: false,
    status:'Show'
  })

	const handlePassword = (e) => {
    if (show.password == false) {
      setShow({
        password: true,
        status:'Hide'
      })
    } else {
      setShow({
        password: false,
        status:'Show'
        })
    }

    
   }
	
	
	// if the user has already been logged in	. redirect to the dashboard.
	useEffect(() => {
		if (localStorage.user) {
			// Set auth token header auth
			const user = JSON.parse(localStorage.user);
		     console.log(user);
			// Set user and isAuthenticated
			props.loginUser(user,props.history)
		  }

	}, [])
	
	// for checking if there are any errors
	const [error, setError] = useState(false);

	//for the messages of the error
	const [errorMsg,setErrorMsg]=useState('')
	

	 // the login mutation, has been initialised here.
	
	const [loginFunction,{loading}] = useMutation(
		loginMutation,
		{
			onCompleted(cd) {
				setError(false)
				console.log('data here' + JSON.stringify(cd));
				const token = cd.login._id;
				const userData = {
                    token,
                    role:cd.login.role,
					verified: cd.login.verified,
					enabled:cd.login.enabled,
					fullName:cd.login.profile.fullName,
                      fName:cd.login.profile.fName,
                      lName:cd.login.profile.lName,
                      dob:cd.login.profile.db,
                      profilePicUrl:cd.login.profile.profilePicUrl,
                      gender:cd.login.profile.gender,
                      college:cd.login.profile.college,
                      university:cd.login.profile.university,
                      branch:cd.login.profile.branch,
                      degree:cd.login.profile.degree,
                      
                        email:cd.login.profile.contact.email,
                        mobile:cd.login.profile.contact.mobile,
                        
                      
                      website:cd.login.profile.website,
                      bio:cd.login.profile.bio,
                      
                        street:cd.login.profile.address?cd.login.profile.address.street:null,
                        city:cd.login.profile.address?cd.login.profile.address.city:null,
                        state:cd.login.profile.address?cd.login.profile.address.state:null,
                        country:cd.login.profile.address?cd.login.profile.address.country:null,
                      
                      
                        twitter:cd.login.profile.social.twitter,
                        linkedIn:cd.login.profile.social.linkedin,
                        facebook:cd.login.profile.social.facebook,
                        github:cd.login.profile.social.github
                      
            
                
				}
				
				
                  
				props.loginUser(userData, props.history);
			},
			onError(err){
				const AB = err.message.split(":");
				// setErrors(AB[1])
				console.log(AB[0])
				setErrorMsg(AB[0])
			
				setError(true)
			
			   	
			}
		}
	);

	
	

	return (
		
		<div style={{ padding: '3%' }} className="mt-2">
			<MDBContainer className="contWidth" fluid>
				<MDBRow center>
					<MDBCol
						md="6"
						style={{ margin: '0', padding: '0' }}
						className="img"
					>
						<img
							src="email.svg"
							style={{
								width: '100%',
								height: '100%',
								borderTopLeftRadius: '12px',
								borderBottomLeftRadius: '12px',
							}}
						/>
					</MDBCol>
					<MDBCol style={{ padding: '2%' }}>
						<form onSubmit={formik.handleSubmit}>
							<h5 style={{ fontWeight: '600' }}>Login</h5>
							<p>Welcome back! Please login to your account.</p>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<MDBBtn
									outline
									color="primary"
									style={{ borderRadius: '15px' }}
								>
									<i
										className="fab fa-facebook-f p-2 "
										style={{ fontSize: '20px' }}
									></i>
									<div className="btnText">Facebook</div>
								</MDBBtn>

								<MDBBtn
									outline
									color="danger"
									style={{ borderRadius: '15px' }}
								>
									<i
										className="fab fa-google p-2"
										style={{ fontSize: '20px' }}
									></i>
									<div className="btnText">Google</div>
								</MDBBtn>
								<MDBBtn
									outline
									color="info"
									style={{ borderRadius: '15px' }}
								>
									<i
										className="fab fa-linkedin-in p-2"
										style={{ fontSize: '20px' }}
									></i>
									<div className="btnText">LinkedIn</div>
								</MDBBtn>
							</div>
							<p
								style={{
									textAlign: 'center',
									marginTop: '2%',
									marginBottom: '0',
								}}
							>
								or
							</p> 
							{error&&
							
							(<p className="note note-danger text-center">
								{errorMsg}
                         </p>)
							
							}
							
							<MDBInput
								label="Type your email"
								
								name="email"
								icon="envelope"
								group
								outline
								type="email"
								validate
								error="wrong"
								success="right"
								value={formik.values.email}
								onChange={
									formik.handleChange
								}
								onBlur={formik.handleBlur}
								/>
								
							<div className="red-text text-center">
							{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}
								
							</div>
							<MDBInput
								label="Type your password"
								
								name="password"
								icon="key"
								group
								outline
								type={(show.password)?'text':'password'}
								validate
								className="mb-0"
								value={formik.values.password}
								onChange={
									formik.handleChange
								}
								onBlur={formik.handleBlur}
							/>
							<div className="red-text text-center">
							{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div>:null}
								
							</div>
                              <div className=' text-center mb-3 custom-control custom-switch'>
								<input
								type='checkbox'
								className='custom-control-input'
								id='customSwitches'
								readOnly
								checked={show.password}
								onChange={(e)=>{handlePassword(e)}}
								/>
								<label className='custom-control-label' htmlFor='customSwitches'>
								{show.status} Password
								</label>
							</div>


							

							<p className="text-right h6 mb-4 blue-text">
								<Link to="/password/recover">Forgot Password?</Link>
							</p>
							<div className="text-center">
								<button
									className="btn blue-gradient   p-2 w-responsive rounded"
									type="submit"
									disabled={loading||!(formik.dirty && formik.isValid )}
								 >
									{loading && (<Loader />)}
									{!loading&&(<span>Sign In</span>)}
								</button>
							</div>
							{/* <MDBModalFooter className="mx-5 pt-3 mb-1"></MDBModalFooter> */}
							<p className="text-center mt-4">
								<strong>Not a member?</strong>
								
								<strong className="blue-text ml-2">
									<Link to="/register">Sign up</Link>
								</strong>
							</p>
						</form>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</div>
	);
}

LoginNew.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

  };
  const mapStateToProps = state => ({
    auth: state.auth,
    profile:state.profile
    
  });
  export default connect(
    mapStateToProps,
    { loginUser,getCurrentProfile }
  )(withRouter(LoginNew));
  



