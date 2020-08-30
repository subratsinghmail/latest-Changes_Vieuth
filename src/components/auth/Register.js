import React,{useState,useEffect} from 'react';
import gql from 'graphql-tag'; // for writing graph ql queries.
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // helps to connect the store with the component
import 'bootstrap-css-only/css/bootstrap.min.css'; // mdb css2
import 'mdbreact/dist/css/mdb.css'; // mdb css 1 
import { useMutation } from '@apollo/react-hooks'; // the use mutation hook
import { registerUser } from '../../actions/authActions'; // action imported from auth actions for registering.
import {
	MDBRow,
	MDBContainer,
	MDBInput,
	MDBCol,
} from 'mdbreact'; // mdb importing for the UI
import { Link, withRouter } from 'react-router-dom';
//import { ToastContainer, toast } from 'react-toastify'; // react toastify import
import './Register.css';
import { useFormik } from 'formik'; // importing the the use formik library.
import Recaptcha from 'react-recaptcha';
import Loader from './Loader';
    
const register_mutation = gql`
	mutation registerUser(
		$fName: String!
		
		$email: String!
		$password: String!
		
		
		$role: String!
	) {
		registerUser(
			input: {
				fName: $fName
				
				email: $email
				password: $password
				
				role: $role
			}
		) {
			_id
		}
	}
`;

function Register(props) {
	
   
	//initilisation formik here

	const formik = useFormik({
        initialValues: {
            fName: '',
            email: ' ',
            password: '',
            cnfPassword: '',
            role: '',
            gender:''
        },
		onSubmit: values => {
			if (captchaVerified == true) {
				auth({
					variables: {
						fName: values.fName,
						email: values.email,
						password: values.password,
						gender: values.gender,
						role:values.role
						
						
					}
				})  
			} else {
				alert('Please verify that you are a human.')
			}	
  


            

			
			
        },
        validate: values => {
            let errors = {}
            if (!values.fName) {
                errors.fName='Required'
            }
            if (!values.email) {
                errors.email='Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email='Invalid Email Format'
            }
            if (!values.password) {
                errors.password='Required'
            }
            
            if (values.password !== values.cnfPassword) {
                errors.cnfPassword='Passwords do not match'
            }

            if (values.gender === '0'||values.gender=='') {
                errors.gender='Required'
            }

            if (values.role == '0'||values.role=='') {
                errors.role='Required'
            }

            return errors;
        },
        
         
    }) 
	



	 // password toggler
		const [show, setShow] = useState({
    password: false,
    status:'Show'
  })
     // password toggler
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

	

    // captcha state for verification starts here
   const [captchaVerified,setCaptchaVerified]=useState(false)

  // the verify call function
	function verifyCall(response) {
		if (response) {
			
		   setCaptchaVerified(true)
		}
	 }





	// mutation for the register.
	const [auth, { loading }] = useMutation(register_mutation, {
		onCompleted(cd) {
			props.history.push('/login');
            
	
        },
        onError(e){
            console.log(e.message)
        }
	});

	//mutation for the send Verification Email


	if (loading) {
		return <div>loading..........</div>;
		
	
	} else
		return (
			<div style={{ padding: '3%' }} className="mt-3">
			   
				<MDBContainer className="contWidth" fluid>
					<MDBRow center>
						<MDBCol
							md="6"
							style={{ margin: '0', padding: '0' }}
							className="img"
						>
							<img
								src="https://image.freepik.com/vector-gratis/red-comunidad-empresarial-mapa-mundial_42077-1247.jpg"
								style={{
									width: '100%',
									height: '100%',
									borderTopLeftRadius: '12px',
									borderBottomLeftRadius: '12px',
								}}
							/>
						</MDBCol>
						<MDBCol style={{ padding: '3%' }}>
							<form
								onSubmit={formik.handleSubmit}
							>
								<h5 style={{ fontWeight: '600' }}>Sign Up</h5>
								<p>
									Welcome to Vieuth! Please fill the following
									details for registration
								</p>
								<MDBInput
									label="Type your Name"
									
									name="fName"
									id='fName'
									icon="user"
									group
									type="text"
									outline
									validate
									error="wrong"
									success="right"
									value={formik.values.fName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<div className="red-text text-center">
								{formik.touched.fName && formik.errors.fName?<div>{formik.errors.fName}</div>:null}
								</div>
								<MDBInput
									label="Type your email"
									
									id='email'
							    
									name="email"
									icon="envelope"
									group
									outline
									type="email"
									validate
									error="wrong"
									success="right"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								 <div className="red-text text-center">
								{formik.touched.email && formik.errors.email?<div>{formik.errors.email}</div>:null}
								</div>
								<MDBInput
									label="Type your password"
								
								
									outline
									id="password"
									name="password"
									icon="key"
									group
									type="password"
									validate
									value={formik.values.password}
									onChange={
										formik.handleChange
									}
									onBlur={formik.handleBlur}
								   
								/>
								 <div className="red-text text-center">
								{formik.touched.password && formik.errors.password?<div>{formik.errors.password}</div>:null}
								</div>

								<MDBInput   outline label="Confirm Your Password" required id="cnfPassword" name="cnfPassword" icon="exclamation" group type={(show.password)?'text':'password'} value={formik.values.cnfPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                      <div className='red-text text-center'>
                                      { formik.touched.cnfPassword && formik.errors.cnfPassword?<div>{formik.errors.cnfPassword}</div>:null}
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



								   <div className="pb-2 mb-2">
									<select
										
										id="role"
										name="role"
										className="browser-default custom-select"
										value={formik.values.role}
										onChange={
										 formik.handleChange
										}
										onBlur={formik.handleBlur}
									  >
										<option value="0">
											Choose your Role
										</option>
										<option value="student">Student</option>
										<option value="college">College</option>
										<option value="company">Company</option>
									   </select>
									  <div className='red-text text-center'>
                                        {formik.touched.role&&formik.errors.role?<div>{formik.errors.role}</div>:null}
                                      </div>
								</div>
								<div className="pb-2 mb-2">
									<select
										
										id="gender"
										name="gender"
										className="browser-default custom-select"
										value={formik.values.gender}
										onChange={
										 formik.handleChange
										}
										onBlur={formik.handleBlur}
									>
										<option value="0">
											Choose your Gender
										</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									  </select>
									  <div className='red-text text-center'>
                                        { formik.touched.gender&&formik.errors.gender?<div>{formik.errors.gender}</div>:null}
									</div>
									<div className='d-flex justify-content-center p-2'>
								<Recaptcha
									sitekey="6Lep48AZAAAAAJ__A5vnk1W7RZSVdTaEsDJXlcTx"
									verifyCallback={verifyCall}
			
									
								
									theme='light'
								    
									/>
									</div>
								</div>
								
								  <div className="text-center">
									<button
										className="btn blue-gradient p-2 w-responsive "
										type="submit"
										disabled={!(formik.dirty&& formik.isValid)}
								     	>
										{loading && (<Loader />)}
                                {!loading&& <span>Register</span>}
									</button>
								</div>
								
								<p className="text-center">
									<strong>Already a member?</strong>
									<strong className="blue-text ml-2">
										<Link to="/login">Sign In</Link>
									</strong>
								</p>
								
							</form>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</div>
		);
}


// checks what the data type of the store value returned is
Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};


// maps state from the store to our component view.
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
