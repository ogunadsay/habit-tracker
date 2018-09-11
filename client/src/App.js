import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from './reducers/authReducer';
import {Redirect} from "react-router-dom"
import HabitList  from './components/habitList';
import AddHabitModal  from './components/addHabitModal';
import DeleteHabitModal  from './components/deleteHabitModal';

export class App extends Component {

  render() {
    if (this.props.userLoggedIn)
      return (
        <div className="columns">
        <AddHabitModal/>
        <DeleteHabitModal/>
          <div className="column is-4">
            <HabitList/>
          </div>
          <div className="column is-8">
            sdasdasdasd
          </div>
        </div>
      )
    else {
      return (
        <div>
          <Redirect to="/login"/>
        </div>

      )
    }
  }
}

const mapStateToProps = (state) => {
  return { userLoggedIn: state.authReducer.userLoggedIn }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
