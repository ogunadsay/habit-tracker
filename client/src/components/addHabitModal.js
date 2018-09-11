import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { modalActionCreators } from '../reducers/modalReducer';
import { Field, reduxForm} from 'redux-form'
import { habitActionCreators } from '../reducers/habitReducer';


export class AddHabitModal extends Component {
  renderField(field) {
    const className = `input ${field.meta.touched && field.meta.error ? 'is-danger' : ''}`;
    return(
      <div className="field">
      <p className="control">
        <input
          className={className}
          placeholder={field.placeholder}
          type={field.type}
          {...field.input}
        />
      </p>
      {field.meta.touched ? <p className="help is-danger">{field.meta.error}</p> : ""}
    </div>
    )
  }
  onSubmit(values){
    this.props.addHabit(values)
  }
  render() {
    const {handleSubmit} = this.props
    return (
      <div className={"modal " + this.props.modalClassName}>
        <div className="modal-background" onClick={() => this.props.toggleAddModal()}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add habit</p>
            <button className="delete" aria-label="close" onClick={() => this.props.toggleAddModal()}></button>
          </header>
          <section className="modal-card-body">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                placeholder="Habit title"
                name="title"
                type="text"
                component={this.renderField}
              />
              <Field
                placeholder="Habit description"
                name="description"
                type="text"
                component={this.renderField}
              />
              <footer className="modal-card-foot">
                <button className="button is-success" type="submit">Add</button>
                <button className="button" onClick={() => this.props.toggleAddModal()}>Cancel</button>
              </footer>
            </form>
            
          </section>
        </div>
      </div>
    )
  }
}
function validate(values){
  const errors = {};
  if(!values.title){
    errors.title="Enter a title"
  }
  return errors;
}

const mapStateToProps = (state) => {
  return { modalClassName: state.modalReducer.addModalClassName }
}

const mapDispatchToProps = dispatch => bindActionCreators({...modalActionCreators,...habitActionCreators}, dispatch)

export default reduxForm({
  form:'AddHabitForm',
  validate
})(
  connect(mapStateToProps, mapDispatchToProps)(AddHabitModal)
)
