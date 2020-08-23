import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import logo from './avatar3.webp'
import Navbar from './Navbar'
import { MDBContainer,MDBProgress,MDBFormInline, MDBRow, MDBCol,MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
function ShowUserProfile(props) {
    return (
        <>
        <Navbar/>
        <MDBContainer className="mt-3">
            {console.log(props)}
            {/* {props.location.state.profile.fName} */}
            <div className="Homepage">
          <MDBRow>
            <MDBCol  lg="4" md="4" size="12" sm="4">
              
              <img src={logo} width="50%" className="rounded mx-auto d-block" alt=""/>
              <h4 className="text-center">{props.location.state.profile.fName?props.location.state.profile.fName:"Not Defined"}</h4>
              <div className="" style={{display:'flex',justifyContent:'space-around'}}>
                <div> <i style={{color:'rgb(57, 70, 211)'}} className="fab fa-twitter fa-2x"></i></div>
                <div> <i style={{color:'rgb(125, 68, 229)'}} className="fab fa-facebook fa-2x"></i></div>
                <div> <i style={{color:'black'}} className="fab fa-github fa-2x"></i></div>
                <div><i style={{color:'rgb(57, 70, 211)'}} className="fab fa-linkedin fa-2x"></i></div>
              </div>
              <MDBCard>
              <MDBCardBody>
                <h6><i className="fas fa-briefcase mr-2"></i>{props.location.state.profile.website?props.location.state.profile.website:'SomeCompany.com'}</h6>
                <h6><i className="fas fa-home mr-2"></i>{props.location.state.profile.address?props.location.state.profile.address:'Some Adress'}</h6>
                <h6><i className="fas fa-envelope mr-2"></i>{props.location.state.email}</h6>
                <h6><i className="fas fa-phone-alt mr-2"></i>{props.location.state.profile.contact?props.location.state.profile.contact:'XYZ Contact'}</h6>
                {/* <Link to='/dashboard/profile/edit-profile'><h6 style={{float:'right'}}><i class="fa fa-pencil-square-o" ></i></h6></Link><br/> */}
                <hr/>
                <h5><i className="fas fa-asterisk mr-2"></i>Skills</h5>
                <h6>Adobe Photoshop</h6>
                <MDBProgress value={50} className="my-2">50%</MDBProgress>
                <h6>HTML</h6>
                <MDBProgress value={50} className="my-2">50%</MDBProgress>
                <h6>CSS</h6>
                <MDBProgress value={50} className="my-2">50%</MDBProgress>
                <hr/>
                <h5><i className="fas fa-globe mr-2"></i>Languages</h5>
                <h6>English</h6>
                <MDBProgress value={50} className="my-2">50%</MDBProgress>
                <h6>Hindi</h6>
                <MDBProgress value={50} className="my-2">50%</MDBProgress>
              </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8" md="8" sm="8" size="12">
            <MDBCard className="mt-2">
                <MDBCardBody>
                <h4><i className="fa fa-suitcase mr-3"></i>Work Experience</h4>
                {/* <h6>College Name</h6>
                <h6 style={{fontWeight:'300'}}>University Name</h6>
                <p><i className="fa fa-calander"></i>jan 2019-<MDBBtn color="success" className="p-1">Current</MDBBtn></p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore at alias ipsa sed. Delectus omnis nam eligendi harum veniam! Architecto illo accusantium eum ipsum itaque aperiam velit. Molestias, placeat libero.</p>
                <hr/>
                <h6>School Name</h6>
                <p><i className="fa fa-calander"></i>jan 2019-may 2020</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore at alias ipsa sed. Delectus omnis nam eligendi harum veniam! Architecto illo accusantium eum ipsum itaque aperiam velit. Molestias, placeat libero.</p> */}
                <div className="outer-timeline">
                <div className="timeline-c">
                  <div className="timeline">
                    <div className="timeline-date">
                      <span>2017</span>
                    </div>
                    <div className="timeline-info">
                    <h6 style={{fontWeight:700}}>Front-End Developer /somecompany.com</h6>
                    <p><i className="fa fa-calander"></i>jan 2019-<MDBBtn color="success" className="p-1">Current</MDBBtn></p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore at alias ipsa sed. Delectus omnis nam eligendi
                   harum veniam! Architecto illo accusantium eum ipsum itaque aperiam velit. Molestias, placeat libero.</p>
                    </div>

                    
                    
                  </div>

                  <div className="timeline">
                    <div className="timeline-date">
                      <span>2017</span>
                    </div>
                    <div className="timeline-info">
                    <h6 style={{fontWeight:700}}>Front-End Developer /somecompany.com</h6>
                    <p><i className="fa fa-calander"></i>jan 2019-<MDBBtn color="success" className="p-1">Current</MDBBtn></p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore at alias ipsa sed. Delectus omnis nam eligendi
                   harum veniam! Architecto illo accusantium eum ipsum itaque aperiam velit. Molestias, placeat libero.</p>
                    </div>

                    
                    
                  </div>
                </div>
                
                </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mt-2">
                <MDBCardBody>
                <h4><i className="fa fa-book mr-3"></i>Education</h4>
                {/* <h6>College Name</h6>
                <h6 style={{fontWeight:'300'}}>University Name</h6>
                <p><i className="fa fa-calander"></i>jan 2019-<MDBBtn color="success" className="p-1">Current</MDBBtn></p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore at alias ipsa sed. Delectus omnis nam eligendi harum veniam! Architecto illo accusantium eum ipsum itaque aperiam velit. Molestias, placeat libero.</p>
                <hr/>
                <h6>School Name</h6>
                <p><i className="fa fa-calander"></i>jan 2019-may 2020</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore at alias ipsa sed. Delectus omnis nam eligendi harum veniam! Architecto illo accusantium eum ipsum itaque aperiam velit. Molestias, placeat libero.</p> */}
                <div className="outer-timeline">
                <div className="timeline-c">
                  <div className="timeline">
                    <div className="timeline-date">
                      <span>2017</span>
                    </div>
                    <div className="timeline-info">
                    <h5>Some kinda Title</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                      Fugiat, odit officiis id mollitia, alias commodi debitis dolores numquam earum eos
                       et fugit sequi architecto minima recusandae perferendis, a eveniet incidunt!
                    </p>
                    </div>

                    
                    
                  </div>

                  <div className="timeline">
                    <div className="timeline-date">
                      <span>2017</span>
                    </div>
                    <div className="timeline-info">
                    <h5>Some kinda Title</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                      Fugiat, odit officiis id mollitia, alias commodi debitis dolores numquam earum eos
                       et fugit sequi architecto minima recusandae perferendis, a eveniet incidunt!
                    </p>
                    </div>

                    
                    
                  </div>
                </div>
                
                </div>
                </MDBCardBody>
              </MDBCard>

            </MDBCol>
          </MDBRow>
    </div>   
        </MDBContainer>
        </>
    )
}

ShowUserProfile.propTypes = {

}

export default ShowUserProfile

