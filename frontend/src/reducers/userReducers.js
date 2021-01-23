import {
PASSWORD_UPDATE_REQUEST,
PASSWORD_UPDATE_SUCCESS,
PASSWORD_UPDATE_FAIL,
PASSWORD_UPDATE_RESET
} from '../constants/userConstants';


export const userPasswordUpdateReducer = (state={},action) =>{
    switch(action.type){
        case PASSWORD_UPDATE_REQUEST:
            return {loading:true}
        case PASSWORD_UPDATE_SUCCESS:
            return {loading:false,message:action.payload.message}
        case PASSWORD_UPDATE_FAIL:
            return {loading:false,error:action.payload}
        case PASSWORD_UPDATE_RESET:
            return {}
        default:
            return state;                
    }
}
