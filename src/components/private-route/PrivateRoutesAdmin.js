import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Unavailable from '../Unavailable/NotAuthorised'
import PropTypes from "prop-types";
const PrivateRoutesAdmin = ({ component: Component, auth, ...rest }) => (
    <Route
    {...rest}
    render={props =>{
      
        if(auth.isAuthenticated===true &&auth.user.role.toString().toLowerCase()==="admin"){
          return <Component {...props}/>
        }
        else if(auth.isAuthenticated==true&&auth.user.role.toString().toLowerCase()!=="admin"){
          return <Unavailable/>
        }
        else{
          return <Redirect to="/login"/>
        }
    }}
  />
   );
   
   
   PrivateRoutesAdmin.propTypes = {
     auth: PropTypes.object.isRequired
   };
   
   const mapStateToProps = state => ({
     auth: state.auth
   });
   
   export default connect(mapStateToProps)(PrivateRoutesAdmin);


