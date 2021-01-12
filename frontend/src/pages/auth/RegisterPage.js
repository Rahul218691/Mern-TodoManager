import React from 'react'
import {Link} from 'react-router-dom';

function RegisterPage() {
    return (
        <div className="container mt-5">
            <h3 className="text-center">Register an Account</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username"
                     aria-describedby="username"
                     placeholder="username"
                     autoFocus
                      />
                </div>                 
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email"
                     aria-describedby="useremail"
                     placeholder="abc@gmail.com"
                      />
                </div>  
                <div className="form-group">
                        <label htmlFor="exampleInputPassword">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" 
                        aria-describedby="userpassword" 
                        placeholder="********"/>
                </div> 
                <div className="form-group">
                        <label htmlFor="confirmpass">Confirm-Password</label>
                        <input type="password" className="form-control" id="confirmpass" 
                        aria-describedby="userpasswordconfirm" 
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
