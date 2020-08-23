import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types"; 
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { connect } from "react-redux"; // helps us to connect react with redux
import { loginUser } from "../../actions/authActions"; // the actions having a type and a payload
import classnames from "classnames";

import {ApolloProvider} from 'react-apollo';
import gql from 'graphql-tag'; // for parsing pure graph ql queries 
import { MDBRow,MDBContainer,MDBInput, MDBModalFooter} from "mdbreact";
import './login.css';
 

 

//making the variable and adding the logic 
const mutation=gql`
mutation login($email:String!, $password:String!){
  login(input:{
    email:$email,
    password:$password
  })
  {
    _id
  }
}
`
const sendEmailMutation=gql`
  mutation{
  verifyUserEmail(input:{
  })
  }
`

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      disabled:"true"
    };
  }

  componentDidMount() {

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


onSubmit = e => {
  e.preventDefault();
  client.mutate({
    mutation,
    variables:{email:this.state.email, password:this.state.password}
  }).then(res=>{
console.log(res.data.login._id);
const token=res.data.login._id;
const userData={
  email:this.state.email,
  password:this.state.password,
  token
}
this.props.loginUser(userData)
  })
  .catch((error)=>{
    const userData={
      token:null
    }
    this.props.loginUser(userData)
  })
  }
render() {
    const {errors} = this.state;
return (
  <ApolloProvider client={client}>            
            <MDBContainer fluid className="background"> 
             <MDBRow  center>
                      
                      <div className="d-flex justify-content-center align-items-center" style={{height:'100vh', width:'45%'}}>
                        <div className=" w-responsive">
                        <form onSubmit={this.onSubmit}> 
                           <p className=" text-center text-black-100 h4 h4-responsive mb-5">Log In</p>
                             
                            <MDBInput label="Type your email" isRequired="true" type="submit" name="email" icon="envelope" group type="email" validate error="wrong" success="right" value={this.state.email} onChange={this.onChange} error={errors.email} className={classnames("", {invalid: errors.email || errors.emailnotfound })} />
                            <span className="red-text text-center">
                              {errors.email}
                              {errors.emailnotfound}
                              </span>
                            <MDBInput label="Type your password" isRequired='true' type="submit" name="password" icon="key" group type="password" validate value={this.state.password} onChange={this.onChange} error={errors.password} className={classnames("", {invalid: errors.password || errors.passwordincorrect})} />
                            <span className="red-text text-center">
                              {errors.password}
                               {errors.passwordincorrect}
                              </span>
                            
                             <p className="text-center h6 mb-4 blue-text"><Link to="/recoverPass"> Forgot Password</Link></p>
                             <div className="text-center">
                             <button className={`btn blue-gradient ${this.state.disabled}  p-2 w-responsive rounded`} type="submit">Sign In</button>
                             
                              <p className="p-3 black-text"><strong>or Sign In with:</strong></p>
                              <div className="d-flex justify-content-around ">
                              <div>
                              <i class="fab fa-facebook-f p-2 " style={{fontSize:'20px'}}></i>
                              </div>
                             <div> <i class="fab fa-linkedin-in p-2" style={{fontSize:'20px'}}></i></div>
                            <div>  <i class="fab fa-google p-2" style={{fontSize:'20px'}}></i> </div>
                              </div>
                             </div>
                             <MDBModalFooter className="mx-5 pt-3 mb-1"></MDBModalFooter>
                             <p className="text-center"><strong>Not a member?</strong><strong className="blue-text ml-2"><Link to='/register'>Sign up?</Link></strong></p>
                             </form>
                           </div>
                        
                          </div>
                
                          </MDBRow>
                              </MDBContainer>
                              
                               </ApolloProvider> 
                               



    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));