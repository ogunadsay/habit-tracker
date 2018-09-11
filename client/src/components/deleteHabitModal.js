import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { modalActionCreators } from '../reducers/modalReducer';
import { habitActionCreators } from '../reducers/habitReducer';

export class DeleteHabitModal extends Component {
  render() {
    return (
        <div className={"modal " + this.props.modalClassName}>
        <div className="modal-background" onClick={() => this.props.toggleDeleteModal()}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add habit</p>
            <button className="delete" aria-label="close" onClick={() => this.props.toggleDeleteModal()}></button>
          </header>
          <section className="modal-card-body">
            Are you sure you want to delete this habit?
          </section>
          <footer className="modal-card-foot">
                <button className="button is-danger" type="button" onClick={()=>this.props.deleteHabit(this.props.habitId)}>Delete</button>
                <button className="button" type="button" onClick={() => this.props.toggleDeleteModal()}>Cancel</button>
              </footer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{modalClassName:state.modalReducer.deleteModalClassName,habitId:state.modalReducer.habitId}
}

const mapDispatchToProps = dispatch=>bindActionCreators({...modalActionCreators,...habitActionCreators},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteHabitModal)
