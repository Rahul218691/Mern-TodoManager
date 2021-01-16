import axios from 'axios';
import {
TODO_CREATE,
TODO_DELETE,
TODO_FETCH
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