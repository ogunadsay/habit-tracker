import * as actionTypes from "../actions/actionTypes";

const initialState = {
    addModalClassName:"",
    deleteModalClassName:"",
    habitId:""
}

export const modalActionCreators={
    toggleAddModal:()=>(dispatch,getState)=>{
        dispatch({type:actionTypes.TOGGLE_ADD_MODAL})
    },
    toggleDeleteModal:(habitId)=>(dispatch,getState)=>{
        dispatch({type:actionTypes.TOGGLE_DELETE_MODAL,habitId})
    }
}

export default (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.TOGGLE_ADD_MODAL:
            return {
                ...state,
                addModalClassName:state.addModalClassName==="is-active"?"":"is-active"
            }
        case actionTypes.TOGGLE_DELETE_MODAL:
        console.log(action)
            return{
                ...state,
                deleteModalClassName:state.deleteModalClassName==="is-active"?"":"is-active",
                habitId:action.habitId
            }
        default:
            return state;
    }
}