import React, { useState, Fragment,useEffect } from 'react'
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



function EditProfile(props) {


  const [formData,setFormData]=useState({
    fullName:'',
    fName:'',
    lName:'',
    profilePicUrl:'',
    dob:'',
    gender:'',
    college:'',
    university:'',
    branch:'',
    degree:'',
    // tags:'',
    // globalRank:'',
    // tagsRank:'',
    contact:'',
    // company:'',
    website:'',
    // location:'',
    // skills:'',
    // githubusername:'',
    bio:'',
    address:'',
    twitter:'',
    facebook:'',
    linkedin:'',
    youtube:'',
    instagram:'',
    githubusername:''
})
// const [displaySocialInputs,toggleSocialInputs]=useState(false);
const{
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
}=formData
useEffect(() => {
    setFormData({
    fullName:props.profile.fullName?props.profile.fullName:'',
    fName:props.profile.fName?props.profile.fName:'',
    lName:props.profile.lName?props.profile.lName:'',
    profilePicUrl:props.profile.profilePicUrl?props.profile.profilePicUrl:'',
    dob:props.profile.dob?props.profile.dob:'',
    gender:props.profile.gender?props.profile.gender:'',
    college:props.profile.college?props.profile.college:'',
    university:props.profile.university?props.profile.university:'',
    branch:props.profile.branch?props.profile.branch:'',
    degree:props.profile.degree?props.profile.degree:'',
    // tags:'',
    // globalRank:'',
    // tagsRank:'',
    contact:props.profile.contact?props.profile.contact:'',
    // company:'',
    website:props.profile.website?props.profile.website:'',
    // location:'',
    // skills:'',
    // githubusername:'',
    bio:props.profile.bio?props.profile.bio:'',
    address:props.profile.address?props.profile.address:'',
    twitter:props.profile.twitter?props.profile.twitter:'',
    facebook:props.profile.facebook?props.profile.facebook:'',
    linkedin:props.profile.linkedin?props.profile.linkedin:'',
    youtube:props.profile.youtube?props.profile.youtube:'',
    instagram:props.profile.instagram?props.profile.instagram:'',
    githubusername:props.profile.githubusername?props.profile.githubusername:'',
    })
},[])

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
                type={activeStep===(steps.length-1)?"submit":""}
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}

              >
                {activeStep === (steps.length -1) ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>

        </Paper>

      </main>
    </form>
  )

}

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  setCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile.profile
})

export default connect(mapStateToProps, { getCurrentProfile, setCurrentProfile })(withRouter(EditProfile))
// import React, {useState, useEffect,Fragment} from 'react'
// import Navbar from './Navbar'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {getCurrentProfile} from '../../actions/profile'
// function EditProfile(props) {
    // const [formData,setFormData]=useState({
    //     fullName:'',
    //     fName:'',
    //     lName:'',
    //     profilePicUrl:'',
    //     dob:'',
    //     gender:'',
    //     college:'',
    //     university:'',
    //     branch:'',
    //     degree:'',
    //     // tags:'',
    //     // globalRank:'',
    //     // tagsRank:'',
    //     contact:'',
    //     // company:'',
    //     website:'',
    //     // location:'',
    //     // skills:'',
    //     // githubusername:'',
    //     bio:'',
    //     address:'',
    //     twitter:'',
    //     facebook:'',
    //     linkedin:'',
    //     youtube:'',
    //     instagram:'',
    //     githubusername:''
    // })
    // const [displaySocialInputs,toggleSocialInputs]=useState(false);
    // const{
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
    // }=formData
    // useEffect(() => {
    //     setFormData({
    //     fullName:props.profile.fullName?props.profile.fullName:'',
    //     fName:props.profile.fName?props.profile.fName:'',
    //     lName:props.profile.lName?props.profile.lName:'',
    //     profilePicUrl:props.profile.profilePicUrl?props.profile.profilePicUrl:'',
    //     dob:props.profile.dob?props.profile.dob:'',
    //     gender:props.profile.gender?props.profile.gender:'',
    //     college:props.profile.college?props.profile.college:'',
    //     university:props.profile.university?props.profile.university:'',
    //     branch:props.profile.branch?props.profile.branch:'',
    //     degree:props.profile.degree?props.profile.degree:'',
    //     // tags:'',
    //     // globalRank:'',
    //     // tagsRank:'',
    //     contact:props.profile.contact?props.profile.contact:'',
    //     // company:'',
    //     website:props.profile.website?props.profile.website:'',
    //     // location:'',
    //     // skills:'',
    //     // githubusername:'',
    //     bio:props.profile.bio?props.profile.bio:'',
    //     address:props.profile.address?props.profile.address:'',
    //     twitter:props.profile.twitter?props.profile.twitter:'',
    //     facebook:props.profile.facebook?props.profile.facebook:'',
    //     linkedin:props.profile.linkedin?props.profile.linkedin:'',
    //     youtube:props.profile.youtube?props.profile.youtube:'',
    //     instagram:props.profile.instagram?props.profile.instagram:'',
    //     githubusername:props.profile.githubusername?props.profile.githubusername:'',
    //     })
    // }, [])
//     const onChange=(e)=>{
//         // e.preventDefault();
//         console.log(formData)
//         setFormData({...formData,[e.target.name]:e.target.value})
        
//     }
//     const onSubmit=(e)=>{
//         // console.log(formData) 
        
//         e.preventDefault()  
//         props.getCurrentProfile(formData,props.history) 
//     }
//     return (
//         <div>
//             <Navbar/>
//             <section className="container " style={{boxShadow:' -3px 5px 5px 5px #aaaaaa',marginTop:'1rem'}}>
//       <h1 className="large "  style={{color:'rgb(92, 206, 183)',fontWeight:'600'}}>
//         Edit Your Profile
//       </h1>
//       <p className="lead">
//         <i className="fas fa-user" ></i> Let's get some information to make your
//         profile stand out
//         <strong>{console.log(formData)}</strong>
//       </p>
//       <small>* = required field</small>
//       <form className="form" onSubmit={(e)=>onSubmit(e)}>
//         <div className="form-group">
//         <div className="form-group">
//           <input type="text" placeholder="Full Name" name="fullName" value={fullName} onChange={(e=>onChange(e))} required/>
//           <small className="form-text"
//             >Enter your Full Name</small
//           >
//         </div>

//         <div className="form-group">
//           <input type="text" placeholder="First Name" name="fName" value={fName} onChange={(e=>onChange(e))} required/>
//           <small className="form-text"
//             >Enter your First Name</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Last Name" name="lName" value={lName} onChange={(e=>onChange(e))} />
//           <small className="form-text"
//             >Enter your Last Name</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="file" placeholder="Profile Pic" name="profilePicUrl" value={profilePicUrl} onChange={(e=>onChange(e))} />
//           <small className="form-text"
//             >Upload your profile picture</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="date" placeholder="D.O.B" name="dob" value={dob} onChange={(e=>onChange(e))} required/>
//           <small className="form-text"
//             >Seclct your date of birth*</small
//           >
//         </div>
//         <div class="form-group">
//           <select name="gender" value={gender} onChange={(e=>onChange(e))}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Others">Others</option>
//           </select>
//           <small className="form-text"
//             >Select your gender</small
//           >
//           </div>
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="College Name" name="college" value={college} onChange={(e=>onChange(e))} required />
//           <small className="form-text"
//             >Enter your college name</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="University Name" name="university" value={university} onChange={(e=>onChange(e))} />
//           <small className="form-text"
//             >Enter your University</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Branch Name" name="branch" value={branch} onChange={(e=>onChange(e))} required/>
//           <small className="form-text"
//             >Enter Branch Name</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Degree" name="degree" value={degree} onChange={(e=>onChange(e))} required />
//           <small className="form-text"
//             >Enter the type of degree/course</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Contact" name="contact" value={contact} onChange={(e=>onChange(e))} required/>
//           <small className="form-text"
//             >Enter your contact details</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Address" name="address" value={address} onChange={(e=>onChange(e))} required />
//           <small className="form-text"
//             >Enter your address</small
//           >
//         </div>
//         <div className="form-group">
//           <input type="text" placeholder="Website" name="website" onChange={(e=>onChange(e))} value={website} />
//           <small className="form-text"
//             >Could be your own or a company website</small
//           >
//         </div>
//         {/* <div className="form-group">
//           <input type="text" placeholder="* Skills" name="skills" onChange={(e=>onChange(e))}value={skills} />
//           <small className="form-text"
//             >Please use comma separated values (eg.
//             HTML,CSS,JavaScript,PHP)</small
//           >
//         </div> */}
//         {/* <div className="form-group">
//           <input
//             type="text"
//             placeholder="Github Username"
//             name="githubusername"
//             onChange={(e=>onChange(e))}
//             value={githubusername}
//           />
//           <small className="form-text"
//             >If you want your latest repos and a Github link, include your
//             username</small
//           >
//         </div> */}
//         <div className="form-group">
//           <textarea placeholder="A short bio of yourself" name="bio"  onChange={(e=>onChange(e))} value={bio}></textarea>
//           <small className="form-text">Tell us a little about yourself</small>
//         </div>

//         <div className="my-2">
//           <button onClick={()=>toggleSocialInputs(!displaySocialInputs)} style={{marginBottom:'1rem'}} type="button" className="btn btn-light">
//             Add Social Network Links
//           </button>
//           <span><small>Optional</small></span>
//         </div>
//             {displaySocialInputs&&<Fragment>
//                 <div className="form-group social-input">
//           <i style={{color:'rgb(57, 70, 211)'}} className="fab fa-twitter fa-2x"></i>
//           <input  type="text" placeholder="Twitter URL" name="twitter"  onChange={(e=>onChange(e))} value={twitter}/>
//         </div>

//         <div className="form-group social-input">
//           <i style={{color:'rgb(125, 68, 229)'}} className="fab fa-facebook fa-2x"></i>
//           <input type="text" placeholder="Facebook URL" name="facebook"  onChange={(e=>onChange(e))}value={facebook} />
//         </div>

//         <div className="form-group social-input">
//           <i style={{color:'rgb(244, 12, 39)'}} className="fab fa-youtube fa-2x"></i>
//           <input type="text" placeholder="YouTube URL" name="youtube"  onChange={(e=>onChange(e))} value={youtube}/>
//         </div>
//         <div className="form-group social-input">
//           <i style={{color:'black'}} className="fab fa-github fa-2x"></i>
//           <input type="text" placeholder="Github URL" name="githubusername"  onChange={(e=>onChange(e))} value={githubusername}/>
//         </div>

//         <div className="form-group social-input">
//           <i style={{color:'rgb(57, 70, 211)'}} className="fab fa-linkedin fa-2x"></i>
//           <input type="text" placeholder="Linkedin URL" name="linkedin"  onChange={(e=>onChange(e))} value={linkedin}/>
//         </div>

//         <div className="form-group social-input">
//           <i style={{color:'rgb(244, 14, 194)'}}className=" fab fa-instagram fa-2x"></i>
//           <input type="text" placeholder="Instagram URL" name="instagram"  onChange={(e=>onChange(e))} value={instagram} />
//         </div>
//             </Fragment>

//             }
        
//         <input type="submit" className="btn btn-primary my-1" />
//         <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
//       </form>
//     </section>
//             </div>
//     )
// }

// EditProfile.propTypes = {
//     getCurrentProfile: PropTypes.func.isRequired,
//     profile: PropTypes.object.isRequired
// }
// const mapStateToProps=state=>({
//     profile:state.profile.profile
// })
// export default connect(mapStateToProps,{getCurrentProfile})(EditProfile)

