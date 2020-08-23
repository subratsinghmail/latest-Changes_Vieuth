
import React, {useState, Fragment} from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {getCurrentProfile} from '../../actions/profile'

 function AddEducation(props) {
    //    const [formData,setFormData]=useState({
    //     college:'',
    //     university:'',
    //     branch:'',
    //     degree:'',
    // })
    // const [displaySocialInputs,toggleSocialInputs]=useState(false);
    // const{
    //   college,
    //   university,
    //   branch,
    //   degree,
   
    // }=formData


    // const onChange=(e)=>{
    //     // e.preventDefault();
    //     console.log(formData)
    //     setFormData({...formData,[e.target.name]:e.target.value})
    //     props.change(e);
    // }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Graduation
      </Typography>
      <br/>
      <Grid container spacing={3}>
      <Grid item xs={12} >
          <TextField
            required
            id="fullName"
            name="college"
            value={props.data.college} 
            onChange={(e=>props.change(e))} required 
            label="College"
            fullWidth

          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="university"
            name="university"
            value={props.data.university} 
            onChange={(e=>props.change(e))} 
            label="University"
            fullWidth
    
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="branch"
            name="branch"
            value={props.data.branch} 
            onChange={(e=>props.change(e))} 
            label="Branch"
            fullWidth
    
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="degree"
            name="degree"
            value={props.data.degree} 
            onChange={(e=>props.change(e))} 
            label="Degree"
            fullWidth
    
          />
        </Grid>
       
      </Grid>


    </React.Fragment>
  );
}

AddEducation.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  }
  const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    profile:state.profile.profile
  })
  
  export default connect(mapStateToProps,{getCurrentProfile})(withRouter(AddEducation))