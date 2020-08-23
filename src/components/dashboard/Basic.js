import React, {useState, Fragment} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCurrentProfile} from '../../actions/profile'

function Basic(props) {

    
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField required id="website" label="Website" name="website" onChange={(e=>props.change(e))} value={props.data.website}  fullWidth />
        </Grid>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="Bio" variant="outlined" name="bio"  onChange={(e=>props.change(e))} value={props.data.bio} fullWidth/>
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
  type="file"
  name="profilePicUrl" value={props.data.profilePicUrl} onChange={(e=>props.change(e))} 
/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Basic.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  }
  const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    profile:state.profile.profile
  })

export default connect(mapStateToProps,{getCurrentProfile})(withRouter(Basic))