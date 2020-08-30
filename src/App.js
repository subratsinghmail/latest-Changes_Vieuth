import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";


import './App.css';
import configureStore from './reducers/index';
import store from "./store";
import ConfirmEmail from './components/auth/ConfirmEmail'
import EditProfileNew from './components/dashboard/EditProfileNew'
import SendVerificationEmail from './components/auth/SendEmailVerification'
import NavbarPage from './components/CommonLayout copy/Navbar'
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/LoginNew";
import RecoverPass from "./components/auth/RecoverPass";
import UpdatePasswordForm from "./components/auth/UpdatePasswordForm";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateRouteCompany from "./components/private-route/PrivateRoutesCompany";
import PrivateRouteAdmin from "./components/private-route/PrivateRoutesAdmin";
import Unavailable from './components/Unavailable/Unavaliable'
import Dashboard from "./components/dashboard/Dashboard";
import Profile from './components/dashboard/Profile'
import CompanyDashboard from './components/CompanyDashboard/Company_dashboard'
import AdminDashboard from './components/AdminDashboard/Admin_dashboard'
import ShowUserList from './components/AdminDashboard/ShowUserList'
import ShowUserProfile from './components/AdminDashboard/ShowUserProfile'
import NavbarLogin from './components/dashboard/Navbar'
import CreateProfile from './components/dashboard/CreateProfile'
import EditProfile from './components/dashboard/EditProfile'
import ProjectDetails from './components/dashboard/ProjectDetails'
import DisplayProjects from './components/AdminDashboard/DisplayProjects'
import Projects from './components/AdminDashboard/Projects'
import UpdateProject from './components/AdminDashboard/UpdateProject'
import PrivateRoutesAdmin from "./components/private-route/PrivateRoutesAdmin";


//routes for the email.
import PrivateRouteEmail from "./components/private-route/PrivateRouteEmail";
import Hold from "./components/auth/Hold";
import SendEmailVerification from "./components/auth/SendEmailVerification";
// Check for token to keep user logged in



class App extends Component {
  constructor(props) {
    super(props)
  
    
  }
 
 
  render() {
    return (
      // <Provider store={store}>
    
      
      <BrowserRouter>
        <div style={{paddingBottom:'5rem'}}>
          {/* {console.log(localStorage.getItem('user')+"In App.js File")} */}
          <NavbarPage />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/password/recover" component={RecoverPass} />
          <Route exact path="/password/reset" component={UpdatePasswordForm} />
          <Route exact path="/confirm-email/:token" component={ConfirmEmail} />
          <Route exact path="/hold" component={Hold} />
          <PrivateRouteEmail  exact path="/send-email-verification" component={SendEmailVerification}/>
          <Switch>
            {/* Student Dashboard */}

            

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/dashboard/profile" component={Profile} />
            <PrivateRoute exact path="/dashboard/profile/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/dashboard/profile/edit-profile" component={EditProfileNew} />
            <PrivateRoute exact path="/dashboard/projectDetails/:id" component={ProjectDetails} />
            {/* <PrivateRoute exact path="/dashboard/projects" component={Projects} /> */}
            {/* CompanyDashboard */}
            <PrivateRouteCompany exact path="/company-dashboard" component={CompanyDashboard} />
            {/* Admin Dashboard */}
            <PrivateRoutesAdmin exact path="/admin-dashboard" component={AdminDashboard} />
            <PrivateRoutesAdmin exact path="/admin-dashboard/create-project" component={Projects} />
            <PrivateRoutesAdmin exact path="/admin-dashboard/show-users" component={ShowUserList} />
            <PrivateRoutesAdmin exact path="/admin-dashboard/show-users/user-profile" component={ShowUserProfile}/>
            <PrivateRoutesAdmin exact path="/admin-dashboard/display-projects" component={DisplayProjects}/>
            <PrivateRoutesAdmin exact path="/admin-dashboard/display-projects/update-project/:title" component={UpdateProject}/>
            {/* {this.props.auth.isAuthenticated&&(<Route  component={Unavailable}/>)} */}
          </Switch>
        </div>
      </BrowserRouter>
    
      // </Provider>
    );
  }
}

// App.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default App;

