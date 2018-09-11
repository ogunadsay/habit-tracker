import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../reducers/authReducer';
import { connect } from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
export class Login extends Component {
  renderField(field) {
    const className = `input ${field.meta.touched && field.meta.error ? 'is-danger' : ''}`;
    return (
      <div className="field">
        <p className="control has-icons-left">
          <input
            className={className}
            placeholder={field.placeholder}
            type={field.type}
            {...field.input}
          />
          <span className="icon is-small is-left">
            <i className={"fas fa-" + field.icon}></i>
          </span>
        </p>
        {field.meta.touched ? <p className="help is-danger">{field.meta.error}</p> : ""}
      </div>
    )
  }
  onSubmit(values) {
    this.props.login(values)
  }
  render() {
    const { handleSubmit } = this.props;
    if (this.props.userLoggedIn) {
      return <Redirect to="/"/>
    }
    else {
      return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            placeholder="Email"
            icon="envelope"
            name="email"
            type="email"
            component={this.renderField}
          />
          <Field
            placeholder="Password"
            icon="lock"
            name="password"
            type="password"
            component={this.renderField}
          />
          <div className="field">
            <p className="control">
              <button className="button is-success" type="submit">
                Login
            </button>
            <Link to="/register" className="is-pulled-right">Dont have an account?</Link>
            </p>
          </div>
        </form>
      )
    }
  }
}
function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Enter an email address";
  }
  if (!values.password) {
    errors.password = "Enter a password"
  }
  return errors;
}

const mapStateToProps = (state) => {
  return { userLoggedIn: state.authReducer.userLoggedIn }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default reduxForm({
  validate,
  form: "LoginForm"
})(
  connect(mapStateToProps, mapDispatchToProps)(Login)
)