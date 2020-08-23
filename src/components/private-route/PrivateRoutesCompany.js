import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Unavailable from '../Unavailable/NotAuthorised'
import PropTypes from "prop-types";

const PrivateRoutesCompany = ({ component: Component, auth, ...rest }) => (
    <Route
    {...rest}
    render={props =>{
      
        if(auth.isAuthenticated===true &&auth.user.role.toString().toLowerCase()==="company"){
          return <Component {...props}/>
        }
        else if(auth.user.role.toString().toLowerCase()!=="company"){
          return <Unavailable/>
        }
        else{
          return <Redirect to="/login"/>
        }
    }}
  />
   );
   
   
   PrivateRoutesCompany.propTypes = {
     auth: PropTypes.object.isRequired
   };
   
   const mapStateToProps = state => ({
     auth: state.auth
   });
   
   export default connect(mapStateToProps)(PrivateRoutesCompany);

