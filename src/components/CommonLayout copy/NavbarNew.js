import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import {logoutUser} from '../../actions/authActions'
import PropTypes from "prop-types";
import { useMutation} from '@apollo/react-hooks'
import {connect} from 'react-redux'
import logo from '../../vieuth.png'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon
} from "mdbreact";
import gql from 'graphql-tag'

const logoutMutation=gql`{
    mutation{
        logout
    }
}`
function NavbarNew(props) {

    const [state,setState]=useState({
        collapseID:""
    })
    const [logoutFunc,{client,loading,error,data}]=useMutation(logoutMutation)
    const toggleCollapse = (userID )=>
        setState(prevState => ({
            collapseID: prevState.collapseID !== userID ? userID : ""
        }));
        if(error){
            console.log("logout error"+error)
        }
        if(loading){
            console.log("loading")
        }
    const onLogoutClick = e => {
            e.preventDefault();
           
            logoutFunc()
            client.resetStore();
            props.logoutUser()
    };
    return (
        <>

            <MDBNavbar color="black" dark expand="md" style={{ zIndex: 9999 }} >
                <MDBNavbarBrand>
                    <img src={logo} height="50px" />
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={()=>toggleCollapse("navbarCollapse3")} />
                <MDBCollapse id="navbarCollapse3" isOpen={state.collapseID} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <Link to="#!" className="nav-link">Home</Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="#!" className="nav-link">Features</Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="#!" className="nav-link">Pricing</Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">MDBDropdown</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default" right>
                                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <Link className="waves-effect waves-light d-flex align-items-center nav-link" to="#!">1
            <MDBIcon icon="envelope" className="ml-1" />
                            </Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle className="dopdown-toggle" nav>
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0"
                                        style={{ height: "35px", padding: 0 }} alt="" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default" right>
                                    <MDBDropdownItem href="#!">My account</MDBDropdownItem>
                                   
                                    <MDBDropdownItem onClick={()=>onLogoutClick}>Log out</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </>
    );
}

NavbarNew.propTypes = {
    logoutUser: PropTypes.func.isRequired
};
export default connect(null,{logoutUser})(NavbarNew);

