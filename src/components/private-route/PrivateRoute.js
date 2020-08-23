import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Unavailable from '../Unavailable/NotAuthorised'
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
 <Route
    {...rest}
    render={props =>{
      
        if(auth.isAuthenticated===true &&auth.user.role.toString().toLowerCase()==="student"){
          return <Component {...props}/>
        }
        else if(auth.isAuthenticated==true&&auth.user.role.toString().toLowerCase()!=="student"){
          return <Unavailable/>
        }
        else{
          return <Redirect to="/login"/>
        }
    }}
  />
);

// this is used to check if the data type of the property being returned.
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);