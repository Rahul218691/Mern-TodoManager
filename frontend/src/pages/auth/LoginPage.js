import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css"; 
import {useDispatch,useSelector} from 'react-redux';
import {login} from '../../actions/authActions';
import {USER_LOGIN_RESET} from '../../constants/authConstants';
import {Message,Loader} from '../../components';


function LoginPage({location,history}) {

    const dispatch = useDispatch();
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {loading,error,userInfo} = useSelector(state=>state.userLogin);

    const handleLoginSubmit = (e) =>{
        e.preventDefault();
        if(!email.match(regEx)){
            return new Noty({
				type:'error',
				text:'Please provide a valid email',
				timeout:2000,
				progressBar:false
			}).show();  
        }else{
            dispatch(login(email,password));
        }
    }

	if(error){
        setTimeout(()=>dispatch({
            type:USER_LOGIN_RESET
        }),2000);	
  }    

  useEffect(()=>{
    if(userInfo){
        history.push('/');
    }
  },[userInfo,history])

    return (
        <div className="container mt-5">
            <h3 className="text-center">Login to your account</h3>
            {loading && <Loader/>}
            {error && <Message type="danger">{error}</Message>}
            <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                         aria-describedby="email"
                         autoFocus 
                         placeholder="abc@gmail.com"
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                        <label htmlFor="exampleInputPassword">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" 
                        aria-describedby="userpassword" 
                        placeholder="********"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                </div>    
                <div className="logintypes">
                    <div><Link to='/register'>New User? Click Here</Link></div>
                    <div><Link to="#">ForgotPassword?</Link></div>
                </div>
                <button className="btn btn-primary" type="submit">Login</button>            
            </form>
        </div>
    )
}

export default LoginPage
