import React, { Component } from "react";
import { Link} from "react-router-dom";
import PropTypes from "prop-types";


class UpdatePassword extends Component {
  state = {
    password: "",
    password2: "",
    submitted: false
  }

  handleChange = key => e => {
    this.setState({ [key]: e.target.value })
  }

  updatePassword = e => {
    e.preventDefault()
    const { userId, token } = this.props;
    const { password } = this.state;

    /*axios
      .post(
        `${}/reset_password/receive_new_password/${userId}/${token}`,
        { password }   
      )
      .then(res => res)
      .catch(err => console.warn("ERROR FROM SERVER UPDATING PASSWORD:", err))*/
    this.setState({ submitted: !this.state.submitted }) //changes will be done in this part based on upcoming changes 
  }
 render() {
    const { submitted } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
      <Link to="/password/recover" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Recover Password
            </Link>
        <h3 style={{ paddingBottom: "1.25rem" }}>Update your password</h3>
        {submitted ? (
          <div className="flow-text grey-text text-darken-1">
            <p>Your password has been saved.</p>
            <Link to="/login" className="btn-flat waves-effect">
              Sign back in
            </Link>
          </div>
        ) : (
          <div className="flow-text grey-text text-darken-1">
            <form
              onSubmit={this.updatePassword}
              style={{ paddingBottom: "1.5rem" }}
            >
              <input
                onChange={this.handleChange("password")}
                value={this.state.password}
                placeholder="New password"
                type="password"
              />
              <input
                onChange={this.handleChange("confirmPassword")}
                value={this.state.confirmPassword}
                placeholder="Confirm password"
                type="password"
              />

               <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Update password
              </button>
            </form>

            <p
              style={{
                fontSize: "1rem",
                maxWidth: "420px",
                paddingLeft: "0.5rem"
              }}
            >
              Make sure it's at least 8 characters including a number and a
              lowercase letter. 
            
            </p>
          </div>
        )}
      </div>
       </div>
        </div>
    );
  }
}

UpdatePassword.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

export default UpdatePassword;