import React,{useRef,useEffect} from 'react'
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css"; 
import {Message,Loader} from '../../components';
import {useDispatch,useSelector} from 'react-redux';
import {updatePassword} from '../../actions/passwordActions';
import {PASSWORD_RESET_UPDATE_RESET} from '../../constants/passwordConstants';
import {useLocation} from 'react-router-dom';

const useQuery = () =>{
	return new URLSearchParams(useLocation().search);
}


function VerifyEmailPage({location,history}) {

    const newpassRef = useRef();
    const confirmRef = useRef();
    let query = useQuery();
    const verification = query.get("verify");

    const dispatch = useDispatch();
    const {loading,message,error} = useSelector(state=>state.updatePassword);
    const {success} = useSelector(state=>state.updatePassword);

    const onSubmit = (e) =>{
        e.preventDefault();
        if(newpassRef.current.value !== confirmRef.current.value){
            return new Noty({
				type:'error',
				text:'Passwords do not Match',
				timeout:2000,
				progressBar:false
			}).show(); 
        }else{
            dispatch(updatePassword(verification,newpassRef.current.value));
        }
    }

    if(error || message){
        setTimeout(()=>dispatch({
            type:PASSWORD_RESET_UPDATE_RESET
        }),2000);
    }


    useEffect(() =>{
        if(success){
            history.push('/');
        }
    },[success,history])

    return (
        <div className="container mt-5">
            <h3 className="text-center">Reset Password</h3>
            {loading && <Loader />}
            {message && <Message type="success">{message}</Message>}
            {error && <Message type="danger">{error}</Message>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                        <label htmlFor="newpassword">Enter New Password</label>
                        <input className="form-control" placeholder="****" id="newpassword" ref={newpassRef} required/>
                </div>
                <div className="form-group">
                        <label htmlFor="confirmnewpassword">Enter New Password</label>
                        <input className="form-control" placeholder="****" id="confirmnewpassword" ref={confirmRef} required/>
                </div>
                <button className="btn btn-primary" type="submit">ResetPassword</button>
            </form>
        </div>
    )
}

export default VerifyEmailPage;