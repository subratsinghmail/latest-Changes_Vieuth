import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Personal from './Personal';
import Basic from './Basic';
import Social from './Social';
import Navbar from './Navbar'
import AddEducation from './AddEducation';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getCurrentProfile, setCurrentProfile } from '../../actions/profile'
import Link from '@material-ui/core/Link';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {

    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    square: true,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));



// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }



function CreateProfile(props) {


  const [formData, setFormData] = useState({
    fullName: '',
    fName: '',
    lName: '',
    profilePicUrl: '',
    dob: '',
    gender: '',
    college: '',
    university: '',
    branch: '',
    degree: '',
    // tags:'',
    // globalRank:'',
    // tagsRank:'',
    contact: '',
    // company:'',
    website: '',
    // location:'',
    // skills:'',
    // githubusername:'',
    bio: '',
    address: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    githubusername: ''
  })
  // const [displaySocialInputs,toggleSocialInputs]=useState(false);
  const {
    fullName,
    fName,
    lName,
    profilePicUrl,
    dob,
    gender,
    college,
    university,
    branch,
    degree,
    // tags,
    // globalRank,
    // tagsRank,
    contact,
    // company:'',
    website,
    // location:'',
    // skills:'',
    // githubusername:'',
    bio,
    address,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    githubusername
  } = formData

  const steps = ['Personal Information', 'Basic Information', 'Add Education', 'Social'];


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Personal change={(e) => { onChange(e) }} data={formData} />;
      case 1:
        return <Basic change={(e) => { onChange(e) }} data={formData} />;
      case 2:
        return <AddEducation change={(e) => { onChange(e) }} data={formData} />;
      case 3:
        return <Social change={(e) => { onChange(e) }} data={formData}/>;
      default:
        throw new Error('Unknown step');
    }
  }


  const onChange = (e) => {
    console.log("e.target.name and value:", e.target.name, e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // console.log(e);
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = (e) => {
    console.log(formData)

    e.preventDefault()
    // setActiveStep(0);
    props.setCurrentProfile(formData, props.history)
    // props.getCurrentProfile(formData, props.history)
  }


  return (
    <div>
    <Navbar/>
    <form onSubmit={(e) => onSubmit(e)} >
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <CreateNewFolderIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Create a Profile
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main className={classes.layout} >
        <Paper className={classes.paper} >
          <Typography component="h1" variant="h4" align="center">
            Create Profile
              </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                type='submit'
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}

              >
              {console.log("first"+activeStep)}
                {activeStep === (steps.length ) ? 'Submit' : 'Next'}
                {console.log("second"+activeStep)}
              </Button>
            </div>
          </div>

        </Paper>

      </main>
    </form>
    </div>
  )

}

CreateProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  setCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile.profile
})

export default connect(mapStateToProps, { getCurrentProfile, setCurrentProfile })(withRouter(CreateProfile))