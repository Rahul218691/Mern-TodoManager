import {
TODO_DELETE,
TODO_CREATE,
TODO_FETCH
} from '../constants/todoConstants';



export const todoReducer = (todos=[], action) => {
    switch (action.type) {
      case TODO_FETCH:
        return action.payload
      case TODO_CREATE:
        return [...todos,action.payload]
      case TODO_DELETE:
        return todos.filter((todo) => todo._id !== action.payload)
      default:
        return todos
    }
  }
