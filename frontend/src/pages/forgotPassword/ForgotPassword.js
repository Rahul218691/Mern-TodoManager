import React,{useRef} from 'react';
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css"; 
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {Message,Loader} from '../../components';
import {resetPassword} from '../../actions/passwordActions';
import {PASSWORD_RESET_RESET} from '../../constants/passwordConstants';

function ForgotPassword() {

    const dispatch = useDispatch();

    const {loading,message,error} = useSelector(state=>state.resetPassword);

    const emailRef = useRef();
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    const formhandleSubmit = (e) =>{
        e.preventDefault();
        if(!emailRef.current.value.match(regEx)){
            return new Noty({
				type:'error',
				text:'Please provide a valid email',
				timeout:2000,
				progressBar:false
			}).show();  
        }else{
            dispatch(resetPassword(emailRef.current.value))
        }
    }

    if(error || message){
        setTimeout(()=>dispatch({
            type:PASSWORD_RESET_RESET
        }),2000);
    }

    return (
        <div className="container mt-5">
            <h3 className="text-center">Enter your Registered Email</h3>
            {loading && <Loader />}
            {message && <Message type="success">{message}</Message>}
            {error && <Message type="danger">{error}</Message>}
            <form onSubmit={formhandleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="text" required id="email"
                    ref={emailRef}
                    placeholder="abc@gmail.com"
                    />
                    <div className="float-right">
                    <Link to='/login'><i className="fas fa-sign-in-alt"></i> Back To Login</Link>
                </div>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword;