import React, { useState, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getCurrentProfile } from '../../actions/profile'

function Personal(props) {

  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   fName: '',
  //   lName: '',
  //   profilePicUrl: '',
  //   dob: '',
  //   gender: '',
  //   college: '',
  //   university: '',
  //   branch: '',
  //   degree: '',
  //   // tags:'',
  //   // globalRank:'',
  //   // tagsRank:'',
  //   contact: '',
  //   // company:'',
  //   website: '',
  //   // location:'',
  //   // skills:'',
  //   // githubusername:'',
  //   bio: '',
  //   address: '',
  //   twitter: '',
  //   facebook: '',
  //   linkedin: '',
  //   youtube: '',
  //   instagram: '',
  //   githubusername: ''

  // })
  // const [displaySocialInputs, toggleSocialInputs] = useState(false);
  // const {
  //   fullName,
  //   fName,
  //   lName,
  //   profilePicUrl,
  //   dob,
  //   gender,
  //   college,
  //   university,
  //   branch,
  //   degree,
  //   // tags,
  //   // globalRank,
  //   // tagsRank,
  //   contact,
  //   // company:'',
  //   website,
  //   // location:'',
  //   // skills:'',
  //   // githubusername:'',
  //   bio,
  //   address,
  //   twitter,
  //   facebook,
  //   linkedin,
  //   youtube,
  //   instagram,
  //   githubusername
  // } = formData


  // const onChange = (e) => {
  //   // e.preventDefault();
  //   console.log("e.target.name and value:", e.target.name, e.target.value)
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  //   props.change(e);
  // }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            name="fullName"
            //value={fullName}
            value={props.data.fName + " " + props.data.lName}
            //  onChange={(e => props.change(e))}
            label="Full name"
            disabled={true}
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="fName"
            value={props.data.fName}
            onChange={(e => props.change(e))}
            label="First name"
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required

            name="lName"
            value={props.data.lName}
            label="Last name"
            onChange={(e => props.change(e))}
            fullWidth

          />
        </Grid>
        <Grid item xs={12} >
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="gender"
            value={props.data.gender}
            onChange={(e => props.change(e))}
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="O">Others</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="date"
            label="Dob"
            name="dob"
            value={props.data.dob}
            onChange={(e => props.change(e))}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            value={props.data.address}
            onChange={(e => props.change(e))}
            label="Address"
            fullWidth

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="contact"
            name="contact"
            value={props.data.contact}
            onChange={(e => props.change(e))}
            label="Contact"
            fullWidth

          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Personal.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(withRouter(Personal))