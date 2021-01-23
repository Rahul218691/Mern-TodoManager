import React,{useState} from 'react'
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css"; 
import {Message,Loader} from '../../components';
import {useDispatch,useSelector} from 'react-redux';
import {changePassword} from '../../actions/userActions';
import {PASSWORD_UPDATE_RESET} from '../../constants/userConstants';

function ChangePassword() {

    const [password,setPassword] = useState('');
    const [confirm,setConfirm] = useState('');
    const dispatch = useDispatch();

    const {loading,message,error} = useSelector(state =>state.changePassword);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password !== confirm){
            return new Noty({
				type:'error',
				text:'Passwords do not Match',
				timeout:2000,
				progressBar:false
			}).show(); 
        }else{
            dispatch(changePassword(password));
        }
    }

	if(error || message){
        setTimeout(()=>dispatch({
            type:PASSWORD_UPDATE_RESET
        }),2000);	
    }   


    return (
        <div className="container mt-5">
            <h3 className="text-center">Update Password</h3>  
            {loading && <Loader />} 
            {error && <Message type="danger">{error}</Message>}
            {message && <Message type="success">{message}</Message>} 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newpass">Enter New Password</label>
                    <input className="form-control" placeholder="****" id="newpass"
                    value={password}
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpass">Confirm New Password</label>
                    <input className="form-control" placeholder="****" id="confirmpass"
                    value={confirm}
                    type="password"
                    onChange={(e)=>setConfirm(e.target.value)}
                    required/>
                </div>
                <button className="btn btn-warning">Update</button>
            </form>        
        </div>
    )
}

export default ChangePassword;