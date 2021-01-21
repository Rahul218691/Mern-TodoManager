import {
TODO_DELETE,
TODO_CREATE,
TODO_FETCH,
FETCH_SINGLE_TODO,
CREATE_SUB_TODO_SUCCESS,
CREATE_SUB_TODO_REQUEST,
CREATE_SUB_TODO_FAIL,
TODO_RESET,
DELETE_SUBTASK_REQUEST,
DELETE_SUBTASK_SUCCESS,
DELETE_SUBTASK_FAIL
} from '../constants/todoConstants';



export const todoReducer = (todos=[], action) => {
    switch (action.type) {
      case TODO_FETCH:
        return action.payload
      case TODO_CREATE:
        return [...todos,action.payload]
      case TODO_DELETE:
        return todos.filter((todo) => todo._id !== action.payload)
      case TODO_RESET:
        return todos=[] 
      default:
        return todos
    }
  }


  export const singleTodoReducer = (todotask={tasklists:[]},action) =>{
    switch(action.type){
      case FETCH_SINGLE_TODO:
        return action.payload  
      default:
        return todotask  
    }
  }

  export const addSubTodoList = (state={},action) =>{
    switch(action.type){
      case CREATE_SUB_TODO_REQUEST:
        return {loading:true,success:false}
      case CREATE_SUB_TODO_SUCCESS:
        return {loading:false,success:true,todo:action.payload}
      case CREATE_SUB_TODO_FAIL:
        return {loading:false,success:false}  
      default:
        return state;  
    }
  }

  export const deleteSubTodoList = (state={},action) =>{
    switch(action.type){
      case DELETE_SUBTASK_REQUEST:
        return {loading:true,taskdelete:false}
      case DELETE_SUBTASK_SUCCESS:
        return {loading:false,taskdelete:true}
      case DELETE_SUBTASK_FAIL:
        return {loading:false,taskdelete:false}  
      default:
        return state;  
    }
  }