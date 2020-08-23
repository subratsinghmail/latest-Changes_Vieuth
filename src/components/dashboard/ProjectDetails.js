import React ,{useEffect}from 'react'
import PropTypes from 'prop-types'
import './ProjectDetails.css'
import Navbar from './Navbar'
import cover from './cover.jpg'
import avatar from '../SeperateComponents/avatar3.webp'
import Slider from "react-slick";
import StudentCardComponent2 from '../SeperateComponents/StudentCardComponent2'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import gql from 'graphql-tag'
import logo from '../../vieuth.png'
import {useQuery,useMutation} from '@apollo/react-hooks'


const allProjectsQuery=gql`
    query ($page:Int,$limit:Int,$title:String){
        searchProject(page:$page,limit:$limit,title:$title){
            totalPages,
            totalDocs,
            docs{
            _id,
            title,
            body,
            start,
            end
            }
        }
    }
`;
function ProjectDetails(props) {
    useEffect(() => {
            window.scrollTo(0, 0)
    }, [props])
    const {loading,error,data}=useQuery(allProjectsQuery,{
        variables:{
            page:1,
            limit:8,
            title:props.location.state.title?props.location.state.title.trim().toLowerCase():""
        }
    })
    const filterData=data?data.searchProject.docs:null;
    // console.log(JSON.stringify(showData)+"In side project details")
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <>
        <Navbar/>
        <MDBContainer className="my-3 " style={{paddingBottom:'5rem'}}>
        <MDBCard>
        <div className="fb-profile">
        <img align="left" className="fb-image-lg img-fluid rounded" src={cover} height="100px" alt="Profile image example"/>
        <img align="left" className="fb-image-profile img-fluid  thumbnail" src={avatar} alt="Profile image example"/>
        
        
        
        
        </div>
        <MDBCardBody>
        
            <div className="d-flex justify-content-between">
            <div style={{fontWeight:900}} >
                        <h4><strong>{props.location.state.title?props.location.state.title:"Title Here"}</strong></h4>
                </div>
            <div className="">
            <MDBBtn style={{borderRadius:'25px',borderStyle:'solid'}} className="p-2 pl-3 pr-3 btn-lg btn-dark mr-5">{`Appy Now `}<i class="fas fa-arrow-right"></i></MDBBtn>
            </div>
                
            </div>
            <MDBRow>
                <MDBCol size="12">
                   <h5>{props.location.state.titleType?props.location.state.titleType:"TitleType"}</h5> 
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol  className="pl-4 pt-2" size="12">
                <i className="fa fa-lg fa-calendar" aria-hidden="true"></i>{` `}{props.location.state.start?new Date(parseInt(props.location.state.start)).toString().substring(4,16):"Start Date Here"}
                </MDBCol>
            
            </MDBRow>
            <MDBRow >
                <MDBCol   className="pl-4 pt-2" size="12">
                <i className="fa fa-lg fa-map-marker" aria-hidden="true"></i>{` Location`}
                </MDBCol>
            
            </MDBRow>
        </MDBCardBody>
        </MDBCard>
        <MDBCard className="mt-2">
            <MDBCardBody>
                <MDBRow className=" pl-2 mt-2">
                    <MDBCol size="12"  className="p-3" style={{borderLeftStyle:'solid',borderLeftWidth:'5px',borderLeftColor:'#3DBC93'}}>
                        <h3>Job Description</h3>
                    </MDBCol>
                    <MDBCol className="p-3 " size="12">
                        {props.location.state.body?props.location.state.body:<p>Lorem ipsum dolor sit amet consectetur adipisicing elit 
                        Temporibus odio labore consequuntur, modi quos hic assumenda iure illum
                        Nulla molestiae expedita veniam minima itaque tempora atque cum iste quibusdam voluptatibus</p>}
                    </MDBCol>
                </MDBRow>
                <MDBRow className=" pl-2 mt-2">
                    <MDBCol size="12"  className="p-3" style={{borderLeftStyle:'solid',borderLeftWidth:'5px',borderLeftColor:'#3DBC93'}}>
                        <h3>Responsiblities Of The Intern</h3>
                    </MDBCol>
                    <MDBCol className="p-1" size="12">
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                        </ul>
                        
                        </MDBCol>
                </MDBRow>
                <MDBRow className=" pl-2 mt-2">
                    <MDBCol size="12"  className="p-3" style={{borderLeftStyle:'solid',borderLeftWidth:'5px',borderLeftColor:'#3DBC93'}}>
                        <h3>Skills Required</h3>
                    </MDBCol>
                    <MDBCol className="p-1" size="12">
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                        </ul>
                        
                        </MDBCol>
                </MDBRow>
                <MDBRow className=" pl-2 mt-2">
                    <MDBCol size="12"  className="p-3" style={{borderLeftStyle:'solid',borderLeftWidth:'5px',borderLeftColor:'#3DBC93'}}>
                        <h3>Important Dates</h3>
                    </MDBCol>
                    <MDBCol className="p-3 " size="12">
                    <i className="fa fa-lg fa-calendar" aria-hidden="true"></i>{` `}{props.location.state.end?new Date(parseInt(props.location.state.end)).toString().substring(4,16):"End Date"}<span style={{color:'red',fontWeight:900}}>{`   Application Deadline`}</span>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>

        </MDBCard>
        
        {filterData&&filterData.length>1&&
        <MDBCard className="mt-5">
        <div style={{marginBottom:'2rem'}}>
        <h4  style={{borderLeftStyle:'solid',borderLeftWidth:'5px',borderLeftColor:'#3DBC93',padding:'1rem 1rem',margin:'1rem 1rem'}}><strong>Related Results</strong>  </h4>
        <Slider  {...settings} style={{paddingLeft:'4rem'}}>
            {filterData&&filterData.map((opportunity,index)=>{
                return <>
                <StudentCardComponent2 data={opportunity} 
                                             key={`st-op-${index}`} />
                </>
            })
            
            }
           
        </Slider>
      </div>
      </MDBCard>
      }
        </MDBContainer>
        </>
        )
}

ProjectDetails.propTypes = {

}

export default ProjectDetails



