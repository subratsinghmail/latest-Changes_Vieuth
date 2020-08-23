import React, { useEffect , useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateUser} from '../../actions/authActions'
import { withRouter } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol ,MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBProgress} from "mdbreact";
import Navbar from './Navbar'
function EditProfileNew(props) {
    // console.log("in profile"+JSON.parse(localStorage.getItem('user').user))
    // if(localStorage.getItem('user')){
    //     console.log(JSON.parse(localStorage.getItem('user')).email)
    // }
    const [formData,setFormData]=useState({})
    const [image, setImage] = useState({ preview: "", raw: "" });
    useEffect(() => {
        const user=JSON.parse(localStorage.getItem('user'))
        setFormData(user);
        console.log("in edit"+formData._id)
    }, [])
    const handleChange = e => {
        if (e.target.files.length) {
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
            
          });
        //   console.log("showing"+JSON.stringify(e.target.files[0]))
        //   console.log((URL.createObjectURL(e.target.files[0])))
        //   const formData = new FormData();
        //   formData.append("image", image.raw);
        //   console.log("Formdata"+JSON.stringify(formData))
        //   setFormData({
        //     ...formData,
        //     profilePicUrl:formData
        // })
        }
      };
      
    const handleSubmit=(e)=>{
        e.preventDefault();
        localStorage.setItem('user',JSON.stringify(formData))
        console.log("IN Edit Profile"+localStorage.getItem('user'))
        props.history.push('/dashboard/profile')
    }
    return (
        <>
        <Navbar/>
        <div className="row d-flex justify-content-center ">
        <div className="col-md-10 col-xl-8 mt-3 mb-4">
        <div className="card" style={{borderLeftColor:'#EC407A',borderLeftWidth:'9px',borderLeftStyle:'solid'}} >
        <div className="card-body">
            <form name="" onSubmit={(e)=>handleSubmit(e)}>
            {/* {formData.gender} */}
            <h3 className="dark-grey-text" >
                <strong>Edit Profile</strong>
            </h3>
            <div className="row d-flex justify-content-center">
            <h4 style={{borderRadius:'5px'}} className=" btn btn-lg btn-pink text-light dark-grey-text pl-4 pr-4 p-2">
                <strong>Personal Details</strong>
            </h4>
            </div>
             

            <MDBRow className="d-flex justify-content-start">
            <label htmlFor="upload-button">
                {image.preview ? (
                <img src={image.preview} alt="dummy" className="rounded mx-auto d-block"   width='150px' height='110px'  />
                ) : (
                <>
                    <span className="fa-stack fa-2x mt-3 mb-2">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fas fa-store fa-stack-1x fa-inverse" />
                    </span>
                    
                </>
                )}
                <h5 className="text-center " className="btn btn-sm" >Upload your photo</h5>
            </label>
            <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChange}
            />
            
            </MDBRow>


            <div className="md-form">
            <i className="fa prefix fa-user-o" aria-hidden="true"></i>
                <input type="text" id="form1" placeholder="Full Name" value={formData.fullName?formData.fullName:""} onChange={(e)=>setFormData({...formData,fullName:e.target.value})} className="form-control"/>
                {/* <label for="form1">Full Name</label> */}
            </div>
            
            <div className="row">
                <div className="col-6">
                <div className="md-form">
                <i className="fa prefix fa-user-o" aria-hidden="true"></i>
                <input type="text" value={formData.fName?formData.fName:""} placeholder="First Name" onChange={(e)=>setFormData({...formData,fName:e.target.value})} className="form-control"/>
                {/* <label >First Name</label> */}
            </div>
                </div>
                <div className="col-6">
                <div className="md-form">
                <i className="fa prefix fa-user-o" aria-hidden="true"></i>
                <input type="text" value={formData.lName?formData.lName:""} placeholder="Last Name" onChange={(e)=>setFormData({...formData,lName:e.target.value})} className="form-control"/>
                {/* <label >Last Name</label> */}
            </div>
                </div>
            </div>
            
            <div className="row">
            <div className="md-form col-6">
            <i className="fa prefix fa-calendar" aria-hidden="true"></i>
                <input type="date" placeholder="Enter D.O.B" className="form-control"/>
                {/* <label >Enter D.O.B</label> */}
            </div>
            <div className="col-6 ">
            <label htmlFor=""> <small>Select Gender</small></label>
            <select  className="browser-default custom-select custom-select-md mb-3" value={formData.gender?formData.gender:""} onChange={(e)=>setFormData({...formData,gender:e.target.value})}>
                <option selected disabled>Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="others">others</option>
            </select>
            </div>
            
            </div>
            <div className="md-form ">
            <i className="fa prefix fa-pencil-square-o" aria-hidden="true"></i>
                <textarea type="text" placeholder="Bio"  value={formData.bio?formData.bio:""} onChange={(e)=>setFormData({...formData,bio:e.target.value})} className="md-textarea"></textarea>
                {/* <label >Bio</label> */}
            </div> 
            <div>
                <label ><small>Address Details</small></label>
                <div className="row">
                <div className="col-6">
                <div className="md-form">
                <i className="fas prefix fa-address-book" aria-hidden="true"></i>
                <input type="text" placeholder="Street"  value={formData.street?formData.street:""} onChange={(e)=>setFormData({...formData,street:e.target.value})} className="form-control"/>
                {/* <label >Street</label> */}
            </div>
                </div>
                <div className="col-6">
                <div className="md-form">
                <i className="fas prefix fa-address-book" aria-hidden="true"></i>
                <input type="text" placeholder="city" value={formData.city?formData.city:""} onChange={(e)=>setFormData({...formData,city:e.target.value})} className="form-control"/>
                {/* <label >City</label> */}
            </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                <div className="md-form">
                <i class="fas prefix fa-address-card" aria-hidden="true"></i>
                <input type="text" placeholder="State" value={formData.state?formData.state:""} onChange={(e)=>setFormData({...formData,state:e.target.value})} className="form-control"/>
                {/* <label >State</label> */}
            </div>
                </div>
                <div className="col-6">
                <div className="md-form">
                <i class="fas prefix fa-address-card" aria-hidden="true"></i>
                <input type="text" placeholder="Country"  value={formData.country?formData.country:""} onChange={(e)=>setFormData({...formData,country:e.target.value})} className="form-control"/>
                {/* <label >country</label> */}
            </div>
                </div>
            </div>
            </div>
            <div>
                <label><small>Contact Details</small></label>
                <div className="row">
                <div className="col-6">
                <div className="md-form">
                <i className="fa prefix fa-envelope-o" aria-hidden="true"></i>
                <input type="text" placeholder="Email" value={formData.email?formData.email:""} className="active" onChange={(e)=>setFormData({...formData,email:e.target.value})} className="form-control"/>
                
            </div>
                </div>
                <div className="col-6">
                <div className="md-form">
                <i className="fa prefix fa-phone" aria-hidden="true"></i>
                <input type="text" placeholder="mobile" value={formData.mobile?formData.mobile:""} className="active"  onChange={(e)=>setFormData({...formData,mobile:e.target.value})}  className="form-control"/>
                
            </div>
                </div>
            </div>
            </div>
            <div className="md-form">
            <i className="fa prefix fa-desktop" aria-hidden="true"></i>
                <input type="text" placeholder="Website" value={formData.website?formData.website:""} className="active"  onChange={(e)=>setFormData({...formData,website:e.target.value})} className="form-control"/>
                {/* <label >Website</label> */}
            </div>
            
            
            <div className="row d-flex justify-content-center">
            <h4 style={{borderRadius:'5px'}} className=" btn btn-lg btn-pink text-light dark-grey-text pl-4 pr-4 p-2">
                <strong>Education</strong>
            </h4>
            </div>
            <div className="md-form">
            <i className="fa prefix fa-user-o" aria-hidden="true"></i>
                <input type="text" placeHolder="College" value={formData.college?formData.college:""} className="active"  onChange={(e)=>setFormData({...formData,college:e.target.value})}  className="form-control"/>
                {/* <label >College</label> */}
            </div>
            <div className="md-form">
            <i className="fa prefix fa-user-o" aria-hidden="true"></i>
                <input type="text" placeholder="University" value={formData.university?formData.university:""} className="active"  onChange={(e)=>setFormData({...formData,university:e.target.value})}className="form-control"/>
                {/* <label >University</label> */}
            </div>

            <div className="md-form">
            <i className="fa prefix fa-user-o" aria-hidden="true"></i>
                <input type="text" placeholder="Branch" value={formData.branch?formData.branch:""} className="active"  onChange={(e)=>setFormData({...formData,branch:e.target.value})} className="form-control"/>
                {/* <label >Branch</label> */}
            </div>
            <div className="md-form">
            <i className="fa prefix fa-graduation-cap" aria-hidden="true"></i>
                <input type="text" placeholder="Degree" value={formData.degree?formData.degree:""} className="active"  onChange={(e)=>setFormData({...formData,degree:e.target.value})} className="form-control"/>
                {/* <label >Degree</label> */}
            </div>
            
            <div className="row d-flex justify-content-center">
            <h4 style={{borderRadius:'5px'}} className=" btn btn-lg btn-pink text-light dark-grey-text pl-4 pr-4 p-2">
                <strong>Social Media</strong>
            </h4>
            </div>
            <div className="md-form">
            <i className="fa prefix fa-github" aria-hidden="true"></i>
                <input type="text" value={formData.github?formData.github:""} className="active"   onChange={(e)=>setFormData({...formData,github:e.target.value})} className="form-control"/>
                <label >Github</label>
            </div>
            <div className="md-form">
            <i className="fa prefix fa-linkedin" aria-hidden="true"></i>
                <input type="text" value={formData.linkedin?formData.linkedin:""} className="active"  onChange={(e)=>setFormData({...formData,linkedin:e.target.value})} className="form-control"/>
                <label >Linkedin</label>
            </div>

            <div className="md-form">
            <i className="fa prefix fa-facebook" aria-hidden="true"></i>
                <input type="text" value={formData.facebook?formData.facebook:""} onChange={(e)=>setFormData({...formData,facebook:e.target.value})} className="form-control"/>
                <label >Facebook</label>
            </div>
            <div className="md-form">
            <i className="fa prefix fa-twitter" aria-hidden="true"></i>
                <input type="text" value={formData.twitter?formData.twitter:""} onChange={(e)=>setFormData({...formData,twitter:e.target.value})} className="form-control"/>
                <label >Twitter</label>
            </div>
            <div className="row d-flex justify-content-center">
                <button type="submit" className="btn" style={{borderWidth:'5px',borderRadius:'5px',borderColor:'pink',borderStyle:'solid'}} color="pink">Submit</button>
            </div>
            </form>
        

        </div>

        </div>


        </div>
                </div>
                </>
    )
}

EditProfileNew.propTypes = {
    userUpdate: PropTypes.func.isRequired
  }
  const mapStateToProps = state => ({
    user: state.auth.user,
    profile: state.profile.profile
  })

export default connect(mapStateToProps, { updateUser})(withRouter(EditProfileNew))

