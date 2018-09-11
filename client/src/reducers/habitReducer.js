import * as actionTypes from "../actions/actionTypes";
import axios from "axios"

const API_URL = process.env.REACT_APP_API

const initialState = {
    habits:[]
}

const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {'x-access-token': sessionStorage.getItem('token')}
  });

const userId = sessionStorage.getItem('userId')

export const habitActionCreators = {
    getHabits:()=>async (dispatch,getState)=>{
        const response = await instance.post("/habits",{
            userId:userId
        })
        if(response.status===200){
            const habits = response.data;
            dispatch({type:actionTypes.GET_HABITS,habits})
        }
        else{
            // dispatch error
        }
    },
    addHabit:(habit)=>async(dispatch,getState)=>{
        const response = await instance.post("/habits/add",{
            userId:userId,
            title:habit.title,
            description:habit.description
        })
        if(response.status===200){
            dispatch({type:actionTypes.ADD_HABIT,habit:{
                _id:response.data.id,
                title:habit.title,
                description:habit.description
            }})
        }
    },
    deleteHabit:(habitId)=>async(dispatch,getState)=>{
        const response = await instance.post(`/habits/delete/${habitId}`)
        
        if(response.status===200){
            dispatch({type:actionTypes.DELETE_HABIT,habitId})
        }
    }   
}

export default (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_HABIT:
            return {
                ...state,
                habits:state.habits.concat(action.habit)
            }
        case actionTypes.GET_HABITS:
            return {
                ...state,
                habits:action.habits
            }
        case actionTypes.DELETE_HABIT:
            return {
                ...state,
                habits:state.habits.filter(habit=>habit._id!==action.habitId)
            }
        default:
            return state;
    }
}