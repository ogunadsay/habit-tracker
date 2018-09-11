import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { actionCreators } from '../reducers/authReducer';
import {Field,reduxForm} from 'redux-form'
import {Link} from "react-router-dom"

export class Register extends Component {
    handleSubmit(values) {
        this.props.register(values)
    }
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
    render() {
        console.log(this.props)
        if (this.props.userLoggedIn) {
            return (
                <div>
                    user authenticated
            </div>
            )
        }
        else {
            const {handleSubmit} = this.props;
            return (
                <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
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
                    <Field
                        placeholder="Confirm password"
                        icon="lock"
                        name="confirm_password"
                        type="password"
                        component={this.renderField}
                    />
                    <div className="field">
                        <p className="control">
                            <button className="button is-success" type="submit">
                                Register
                            </button>
                            <Link to="/login" className="is-pulled-right">Do you already have an account?</Link>
                        </p>
                    </div>
                </form>
            )

        }
    }
}

function validate(values){
    const errors = {}
    if(!values.email){
        errors.email = "Please enter a valid email address"
    }
    if(!values.password){
        errors.password = "Please enter a password"
    }
    if(!values.confirm_password){
        errors.confirm_password ="Please confirm password"
    }
    if(values.password!==values.confirm_password){
        errors.confirm_password="Passwords don't match"
    }
    return errors
}

const mapStateToProps = (state) => {
    return { userLoggedIn: state.authReducer.userLoggedIn }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default reduxForm({
    form:"RegisterForm",
    validate
})(
    connect(mapStateToProps, mapDispatchToProps)(Register)
)

