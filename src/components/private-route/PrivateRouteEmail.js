import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Upload from '../auth/Upload';

const PrivateRouteEmail = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isAuthenticated === true && !auth.user.verified) {
                return <Component {...props}/>
            } else if(auth.isAuthenticated===true&&!auth.user.enabled) {
                return <Upload/>
            }
            else {
                return <Redirect to='/login'/>
            }
         
        }}
    
    
    />
)

PrivateRouteEmail.propTypes = {
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRouteEmail);
