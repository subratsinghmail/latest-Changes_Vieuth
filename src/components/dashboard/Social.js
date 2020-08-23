
import React, {useState, Fragment} from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {getCurrentProfile} from '../../actions/profile'

function Social(props) {

  //      const [formData,setFormData]=useState({
  //       fullName:'',
  //   fName:'',
  //   lName:'',
  //   profilePicUrl:'',
  //   dob:'',
  //   gender:'',
  //   college:'',
  //   university:'',
  //   branch:'',
  //   degree:'',
  //   // tags:'',
  //   // globalRank:'',
  //   // tagsRank:'',
  //   contact:'',
  //   // company:'',
  //   website:'',
  //   // location:'',
  //   // skills:'',
  //   // githubusername:'',
  //   bio:'',
  //   address:'',
  //   twitter:'',
  //   facebook:'',
  //   linkedin:'',
  //   youtube:'',
  //   instagram:'',
  //   githubusername:''
  //   })
  //    const [displaySocialInputs,toggleSocialInputs]=useState(false);
  //   const{
     
  //       fullName,
  //       fName,
  //       lName,
  //       profilePicUrl,
  //       dob,
  //       gender,
  //       college,
  //       university,
  //       branch,
  //       degree,
  //       // tags,
  //       // globalRank,
  //       // tagsRank,
  //       contact,
  //       // company:'',
  //       website,
  //       // location:'',
  //       // skills:'',
  //       // githubusername:'',
  //       bio,
  //       address,
  //       twitter,
  //       facebook,
  //       linkedin,
  //       youtube,
  //       instagram,
  //       githubusername
  //   }=formData


  //   const onChange=(e)=>{
  //     // e.preventDefault();
  //     // console.log(formData)
  //     setFormData({...formData,[e.target.name]:e.target.value})
  //    props.change(e);
  // }

  return (
    <React.Fragment >
      <Typography variant="h6" gutterBottom>
        Social
      </Typography>
      <br/>
      <Grid container spacing={3}>
      <Grid item xs={12} >
      <TextField
        id="input-with-icon-textfield"
        label="Twitter"
        name="twitter" 
        value={props.data.twitter} 
        onChange={(e=>props.change(e))} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TwitterIcon />
            </InputAdornment>
          )
        }}
      />
        </Grid>
        <Grid item xs={12} >
      <TextField
        id="input-with-icon-textfield"
        label="Facebook"
        name="facebook"  
        value={props.data.facebook}
        onChange={(e=>props.change(e))} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FacebookIcon/>
            </InputAdornment>
          )
        }}
      />
        </Grid>
        <Grid item xs={12} >
      <TextField
        id="input-with-icon-textfield"
        label="Instagram"
        name="instagram"  
        onChange={(e=>props.change(e))}  
        value={props.data.instagram} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InstagramIcon />
            </InputAdornment>
          )
        }}
      />
        </Grid>
        <Grid item xs={12} >
      <TextField
        id="input-with-icon-textfield"
        label="Linkedin"
        name="linkedin"  
        onChange={(e=>props.change(e))}  
        value={props.data.linkedin}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          )
        }}
      />
        </Grid>
        <Grid item xs={12} >
      <TextField
        id="input-with-icon-textfield"
        label="Github"
        name="githubusername"  
        onChange={(e=>props.change(e))} 
        value={props.data.githubusername}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GitHubIcon />
            </InputAdornment>
          )
        }}
      />
        </Grid>
      </Grid>


    </React.Fragment>
  );
}

Social.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  }
  const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    profile:state.profile.profile
  })
  
  export default connect(mapStateToProps,{getCurrentProfile})(withRouter(Social))