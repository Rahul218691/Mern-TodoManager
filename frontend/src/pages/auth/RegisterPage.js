import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {Message,Loader} from '../../components';
import {register} from '../../actions/authActions';
import {USER_REGISTER_RESET} from '../../constants/authConstants';
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css"; 


function RegisterPage() {

    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const dispatch = useDispatch();
    const {loading,message,error} = useSelector(state => state.userRegister);

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirm,setConfirm] = useState('');


    const handleFormSubmit = (e) =>{
        e.preventDefault();
        if(password !== confirm){
            return new Noty({
                type:'error',
                text:'Password does not match',
                timeout:2000,
                progressBar:false
            }).show();             
        }else if(!email.match(regEx)){
			return new Noty({
				type:'error',
				text:'Please provide a valid email',
				timeout:2000,
				progressBar:false
			}).show();              
        }else{
            dispatch(register(name,email,password))
        }
    }

    if(error || message){
        setTimeout(()=>dispatch({
            type:USER_REGISTER_RESET
        }),2000);
    }
  

    return (
        <div className="container mt-5">
            <h3 className="text-center">Register an Account</h3>
            {loading && <Loader />}
            {message && <Message type="success">{message}</Message>}
            {error && <Message type="danger">{error}</Message>}
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username"
                     aria-describedby="username"
                     placeholder="username"
                     autoFocus
                     value={name}
                     onChange={(e)=>setName(e.target.value)}
                      />
                </div>                 
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email"
                     aria-describedby="useremail"
                     placeholder="abc@gmail.com"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                      />
                </div>  
                <div className="form-group">
                        <label htmlFor="exampleInputPassword">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" 
                        aria-describedby="userpassword" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="********"/>
                </div> 
                <div className="form-group">
                        <label htmlFor="confirmpass">Confirm-Password</label>
                        <input type="password" className="form-control" id="confirmpass" 
                        aria-describedby="userpasswordconfirm" 
                        value={confirm}
                        onChange={(e)=>setConfirm(e.target.value)}
                        placeholder="********"/>
                </div>   
                <div>
                    <div className="text-right">
                        <Link to="/login">Already have a account?</Link>
                    </div>
                </div> 
                <button className="btn btn-primary">Register</button>                                           
            </form>
        </div>
    )
}

export default RegisterPage
