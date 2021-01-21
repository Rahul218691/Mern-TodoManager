import axios from 'axios';
import {
TODO_CREATE,
TODO_DELETE,
TODO_FETCH,
FETCH_SINGLE_TODO,
CREATE_SUB_TODO_SUCCESS,
CREATE_SUB_TODO_REQUEST,
CREATE_SUB_TODO_FAIL,
DELETE_SUBTASK_FAIL,
DELETE_SUBTASK_REQUEST,
DELETE_SUBTASK_SUCCESS
} from '../constants/todoConstants';

const baseURL = 'http://localhost:5000/v1/api/task';

export const getTodosList = () =>async(dispatch,getState) =>{
    try{
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const {data} = await axios.get(`${baseURL}/getmytask`,config);
      dispatch({
        type:TODO_FETCH,
        payload:data
      })      
    } catch (error) {
      console.log(error)
    }
  }

  export const createTodosList = (name) =>async(dispatch,getState) =>{
    try{
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const {data} = await axios.post(`${baseURL}/addtask`,{name},config);
      // console.log(data)
      dispatch({
        type:TODO_CREATE,
        payload:data
      })      
    } catch (error) {
      console.log(error)
    }
  }

  export const deleteTodosList = (id) =>async(dispatch,getState) =>{
    try{  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
       await axios.delete(`${baseURL}/deletetask/${id}`,config);
      // console.log(data)
      dispatch({
        type:TODO_DELETE,
        payload:id
      })      
    } catch (error) {
      console.log(error)
    }
  }

  export const fetchTaskList = (id) =>async(dispatch,getState) =>{
    try{  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
       const {data} = await axios.get(`${baseURL}/subtasks/${id}`,config);
      // console.log(data)
      dispatch({
        type:FETCH_SINGLE_TODO,
        payload:data
      })      
    } catch (error) {
      console.log(error)
    }
  }

  export const addTaskList = (id,task,name) => async(dispatch,getState) =>{
    try {
      dispatch({
        type:CREATE_SUB_TODO_REQUEST
      })
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const {data} = await axios.post(`${baseURL}/addtasklist/${id}`,{task,name},config);
      // console.log(data)
      dispatch({
        type:CREATE_SUB_TODO_SUCCESS,
        payload:data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type:CREATE_SUB_TODO_FAIL
      })
    }
  }

  export const deleteTaskData = (taskId,tasklistId) => async(dispatch,getState) =>{
    try {
      dispatch({
        type:DELETE_SUBTASK_REQUEST
      })
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const {data} = await axios.delete(`${baseURL}/subtask/${taskId}/tasks/${tasklistId}`,config);
      // console.log(data)
      dispatch({
        type:DELETE_SUBTASK_SUCCESS,
        payload:data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type:DELETE_SUBTASK_FAIL
      })
    }
  }