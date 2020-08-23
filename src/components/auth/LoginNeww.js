import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { getCurrentProfile } from '../../actions/profile';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
	MDBRow,
	MDBContainer,
	MDBInput,
	MDBBtnGroup,
	MDBModalFooter,
	MDBCol,
	MDBBtn,
} from 'mdbreact';
import Spinner from '../layout/Spinner';
import './login.css';
const loginMutation = gql`
mutation login($email:String!, $password:String!){
  login(input:{
    email:$email,
    password:$password
  })
  {
    _id,
    verified
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
const sendEmailMutation = gql`
	mutation {
		verifyUserEmail(input: {})
	}
`;
function LoginNew(props) {
	const [loginState, setLoginState] = useState({
		email: '',
		password: '',
		errors: {},
		disabled: 'true',
	});
	const [submitted, setSubmitted] = useState(false);
	useEffect(() => {
		// if (props.auth.isAuthenticated) {
		//     props.history.push("/dashboard");
		//   }
		if (props.errors) {
			setLoginState({
				...loginState,
				errors: props.errors,
			});
		}
	}, [submitted, props.errors, props.loginUser]);
	const [loginFunction, { loading, error, data }] = useMutation(
		loginMutation,
		{
			onCompleted(cd) {
				console.log('data here' + JSON.stringify(cd));
				const token = cd.login._id;
				const userData = {
                    userID: token,
                    role:cd.login.role,
                    verified:cd.login.verified,
                    
                      _id:cd.login.profile._id,
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
				// console.log(userData.role+"In Oncompleted")
				// props.getCurrentProfile(profileData)

				props.loginUser(userData, props.history);
			},
		}
	);
	const handleSubmit = (e) => {
		e.preventDefault();
		// debugger;
		console.log('loginState' + loginState);
		loginFunction({
			variables: {
				email: loginState.email,
				password: loginState.password,
			},
		});
		//   console.log("data"+data);
		//   console.log("error"+error)
		// if (data) {
		//   console.log("data here" + data.login._id)
		//   const token = data.login._id;
		//   const userData = {
		//     email: loginState.email,
		//     password: loginState.password,
		//     token: token
		//   }
		//   props.loginUser(userData, props.history);
		// }
		if (error) {
			const userData = {
				token: null,
			};
			props.loginUser(userData);
		}
		setSubmitted(true);
	};
	if (loading) {
		return <Spinner />;
	}
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
							src="https://image.freepik.com/vector-gratis/red-comunidad-empresarial-mapa-mundial_42077-1247.jpg"
							style={{
								width: '100%',
								height: '100%',
								borderTopLeftRadius: '12px',
								borderBottomLeftRadius: '12px',
							}}
						/>
					</MDBCol>
					<MDBCol style={{ padding: '2%' }}>
						<form onSubmit={(e) => handleSubmit(e)}>
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
										class="fab fa-facebook-f p-2 "
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
										class="fab fa-google p-2"
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
										class="fab fa-linkedin-in p-2"
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
							<MDBInput
								label="Type your email"
								isRequired="true"
								name="email"
								icon="envelope"
								group
								outline
								type="email"
								validate
								error="wrong"
								success="right"
								value={loginState.email}
								onChange={(e) =>
									setLoginState({
										...loginState,
										email: e.target.value,
									})
								}
								error={
									loginState.errors
										? loginState.errors.email
										: ''
								}
							/>
							<span className="red-text text-center">
								{loginState.errors && (
									<p>{loginState.errors.email}</p>
								)}
								{/* {loginState.errors.emailnotfound} */}
							</span>
							<MDBInput
								label="Type your password"
								isRequired="true"
								name="password"
								icon="key"
								group
								outline
								type="password"
								validate
								className="mb-0"
								value={loginState.password}
								onChange={(e) =>
									setLoginState({
										...loginState,
										password: e.target.value,
									})
								}
								error={
									loginState.errors
										? loginState.errors.password
										: ''
								}
							/>
							<span className="red-text text-center">
								{loginState.errors && (
									<p>{loginState.errors.password}</p>
								)}
								{/* {errors.password} */}
								{/* {errors.passwordincorrect} */}
							</span>

							<p className="text-right h6 mb-4 blue-text">
								<Link to="/recoverPass">Forgot Password?</Link>
							</p>
							<div className="text-center">
								<button
									className={`btn blue-gradient   p-2 w-responsive rounded`}
									type="submit"
								>
									Sign In
								</button>
							</div>
							{/* <MDBModalFooter className="mx-5 pt-3 mb-1"></MDBModalFooter> */}
							<p className="text-center">
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
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    profile:state.profile,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser,getCurrentProfile }
  )(withRouter(LoginNew));
  
