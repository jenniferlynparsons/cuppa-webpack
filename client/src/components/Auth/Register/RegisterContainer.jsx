import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authShape } from "../../../lib/propTypes";
import {
  emailSchema,
  passwordSchema,
  password2Schema,
  nameSchema
} from "../../../lib/validationSchemas";
import { registerUser } from "../../../actions/authActions";
import { Register } from "./Register";

class RegisterContainer extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    inputValidation: {
      name: true,
      email: true,
      duplicateEmail: true,
      password: true,
      password2: true
    },
    errorMessages: {
      name: "Please enter a valid name",
      email: "Please enter a valid email address",
      password: "Please enter a valid password",
      password2: "Please make sure the passwords match"
    },
    loadingStatus: "inprogress"
  };

  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    const namevalid = nameSchema.isValidSync(newUser);
    const emailvalid = emailSchema.isValidSync(newUser);
    const passvalid = passwordSchema.isValidSync(newUser);
    const pass2valid = password2Schema.isValidSync(newUser);

    const passmatch = newUser.password === newUser.password2;

    if (namevalid && emailvalid && passvalid && pass2valid && passmatch) {
      this.props.registerUser(newUser, this.props.history);
    } else {
      this.setState(state => ({
        inputValidation: {
          ...state.inputValidation,
          name: namevalid,
          email: emailvalid,
          duplicateEmail: true,
          password: passvalid,
          password2: pass2valid === passmatch ? pass2valid : false
        }
      }));
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else {
      this.setState({ loadingStatus: "complete" });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated && !prevProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (
      this.props.serverErrors &&
      !prevProps.serverErrors &&
      this.props.serverErrors.duplicateEmail
    ) {
      this.setState(state => ({
        inputValidation: {
          ...state.inputValidation,
          duplicateEmail: false
        }
      }));
    }
  }

  render() {
    if (this.state.loadingStatus !== "complete") {
      return (
        <div data-testid="loadingmessage" className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    } else {
      return (
        <Register
          email={this.state.email}
          password={this.state.password}
          password2={this.state.password2}
          inputValidation={this.state.inputValidation}
          errorMessages={this.state.errorMessages}
          onChange={this.handleInputChange}
          onSubmit={this.handleFormSubmit}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  serverErrors: state.errors.serverErrors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterContainer);

export const RegisterContainerComponent = RegisterContainer;

RegisterContainer.propTypes = {
  auth: authShape.isRequired,
  history: PropTypes.object,
  registerUser: PropTypes.func.isRequired,
  serverErrors: PropTypes.object
};
