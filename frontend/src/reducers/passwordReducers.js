import {
PASSWORD_RESET_REQUEST,
PASSWORD_RESET_FAIL,
PASSWORD_RESET_SUCCESS,
PASSWORD_RESET_RESET,
PASSWORD_RESET_UPDATE_SUCCESS,
PASSWORD_RESET_UPDATE_REQUEST,
PASSWORD_RESET_UPDATE_FAIL,
PASSWORD_RESET_UPDATE_RESET
} from '../constants/passwordConstants';


export const passwordResetRequestReducer = (state={},action) =>{
    switch(action.type){
        case PASSWORD_RESET_REQUEST:
            return {loading:true}
        case PASSWORD_RESET_SUCCESS:
            return {loading:false,message:action.payload.message}
        case PASSWORD_RESET_FAIL:
            return {loading:false,error:action.payload}
        case PASSWORD_RESET_RESET:
            return {}    
        default:
            return state;                
    }
}

export const passwordUpdateRequestReducer = (state={},action) =>{
    switch(action.type){
        case PASSWORD_RESET_UPDATE_REQUEST:
            return {loading:true,success:false}
        case PASSWORD_RESET_UPDATE_SUCCESS:
            return {loading:false,message:action.payload.message,success:true}
        case PASSWORD_RESET_UPDATE_FAIL:
            return {loading:false,error:action.payload,success:false}
        case PASSWORD_RESET_UPDATE_RESET:
            return {}    
        default:
            return state;                
    }
}