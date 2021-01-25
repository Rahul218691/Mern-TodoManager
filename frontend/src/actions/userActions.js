
import axios from 'axios';

import {
PASSWORD_UPDATE_REQUEST,
PASSWORD_UPDATE_SUCCESS,
PASSWORD_UPDATE_FAIL,
USER_PROFILE_UPDATE_SUCCESS,
USER_PROFILE_UPDATE_REQUEST,
USER_PROFILE_UPDATE_FAIL
} from '../constants/userConstants';

import {
USER_LOGIN_SUCCESS
} from '../constants/authConstants';

const baseURL = 'http://localhost:5000/v1/api/user';

export const changePassword = (password) => async (dispatch,getState) => {
    try {
      dispatch({
        type: PASSWORD_UPDATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.patch(
        `${baseURL}/changepass`,
        {password},
        config
      )
      dispatch({
        type: PASSWORD_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PASSWORD_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const updateProfile = (formData) => async (dispatch,getState) => {
    try {
      dispatch({
        type: USER_PROFILE_UPDATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `${baseURL}/updateProfile`,
        formData,
        config
      )
      dispatch({
        type: USER_PROFILE_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type:USER_LOGIN_SUCCESS,
        payload:data
      })
    } catch (error) {
      dispatch({
        type: USER_PROFILE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }