import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {logoutUser} from '../../actions/authActions'
import PropTypes from "prop-types";
import { Mutation } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import {ApolloClient} from '@apollo/client';
import {connect} from 'react-redux'
import logo from '../../vieuth.png'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon
} from "mdbreact";
import gql from 'graphql-tag';




// const client = new ApolloClient({
//     uri: 'https://vieuth-backend.herokuapp.com/graphql',
// })



// the query for the logout mutation.
const logoutMutation=gql`
    mutation{
        logout
    }
`
class NavbarPage extends Component {
    state = {
        collapseID: ""
    };

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
   
    
         

           
    
    
    
    
    
    // logout function

    onLogoutClick = e => {
          e.preventDefault();
        this.props.logoutUser()
        
        }


    render() {
        return (
            <>

                <MDBNavbar color="black" dark expand="md" style={{ zIndex: 9999 }} >
                    <MDBNavbarBrand>
                        <img src={logo} height="50px" />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active>
                                <Link to=' ' className="nav-link">Home</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link to='' className="nav-link">Features</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link to=''  className="nav-link">Pricing</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <div className="d-none d-md-inline">MDBDropdown</div>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem>Action</MDBDropdownItem>
                                        <MDBDropdownItem >Another Action</MDBDropdownItem>
                                        <MDBDropdownItem >Something else here</MDBDropdownItem>
                                        <MDBDropdownItem >Something else here</MDBDropdownItem>
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
                                           
                                               <MDBDropdownItem onClick={this.onLogoutClick}  href="#!">Log out</MDBDropdownItem>            
                            
                                        
                                           
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </>
        );
    }
}
NavbarPage.propTypes = {
    logoutUser: PropTypes.func.isRequired
};
export default connect(null,{logoutUser})(NavbarPage);