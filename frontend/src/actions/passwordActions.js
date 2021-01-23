import axios from 'axios';
import {
PASSWORD_RESET_SUCCESS,
PASSWORD_RESET_REQUEST,
PASSWORD_RESET_FAIL,
PASSWORD_RESET_UPDATE_REQUEST,
PASSWORD_RESET_UPDATE_FAIL,
PASSWORD_RESET_UPDATE_SUCCESS
} from '../constants/passwordConstants';


const baseURL = 'http://localhost:5000/v1/api/password';

export const resetPassword = (email) => async (dispatch) => {
    try {
      dispatch({
        type: PASSWORD_RESET_REQUEST,
      })
  
      const config = {
        headers: {
            "Content-Type": 'application/json',
        },
      }    
      const { data } = await axios.post(
        `${baseURL}/verifyuser`,
        {email},
        config
      )
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const updatePassword = (verification,password) => async (dispatch) => {
    try {
      dispatch({
        type: PASSWORD_RESET_UPDATE_REQUEST,
      })
  
      const config = {
        headers: {
            "Content-Type": 'application/json',
        },
      }    
      const { data } = await axios.put(
        `${baseURL}/resetpassword`,
        {verification,password},
        config
      )
      dispatch({
        type: PASSWORD_RESET_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }