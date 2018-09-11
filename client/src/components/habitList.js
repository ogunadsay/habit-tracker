import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { habitActionCreators } from '../reducers/habitReducer';
import { modalActionCreators } from '../reducers/modalReducer';

export class HabitList extends Component {

    componentDidMount() {
        this.props.getHabits()
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <button className="button is-primary" id="addHabit" onClick={() => { this.props.toggleAddModal() }}>
                    Add habit
          </button>
                <div>
                    {this.props.habits.map(habit => {
                        return (
                            <div className="notification has-background-white-ter" key={habit._id}>
                                <button className="delete" onClick={()=>this.props.toggleDeleteModal(habit._id)}></button>
                                <p className="control">{habit.title}</p>
                                <p className="help">{habit.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { habits: state.habitReducer.habits }
}

const mapDispatchToProps = dispatch => bindActionCreators({ ...habitActionCreators, ...modalActionCreators }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HabitList)
