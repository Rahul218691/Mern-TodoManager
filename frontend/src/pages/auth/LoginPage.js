import React from 'react'
import {Link} from 'react-router-dom';

function LoginPage() {
    return (
        <div className="container mt-5">
            <h3 className="text-center">Login to your account</h3>
            <form>
                <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                         aria-describedby="email"
                         autoFocus 
                         placeholder="abc@gmail.com"/>
                </div>
                <div className="form-group">
                        <label htmlFor="exampleInputPassword">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" 
                        aria-describedby="userpassword" 
                        placeholder="********"/>
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
