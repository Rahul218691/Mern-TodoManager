import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {
    userRegisterReducer,
    userLoginReducer
} from './reducers/authReducers';

import {
    todoReducer
} from './reducers/todoReducers';

const reducer = combineReducers({
    userRegister:userRegisterReducer,
    userLogin:userLoginReducer,
    todos:todoReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
    userLogin: {userInfo:userInfoFromStorage}
}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;