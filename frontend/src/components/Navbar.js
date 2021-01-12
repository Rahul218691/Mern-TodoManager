import React from 'react'
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../actions/authActions';

function Navbar() {

    const dispatch = useDispatch();

    const {userInfo} = useSelector(state=>state.userLogin);

    const logoutHandler = () =>{
        dispatch(logout())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Task-Management</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            {
                userInfo ? (
                    <>
                    <li className="nav-item" onClick={logoutHandler}>
                        <Link className="nav-link" to="#">Logout</Link>
                    </li>
                    </>
                ) : (
                    <>
                       <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </>
                )
            }
            </ul>
        </div>
        </nav>
    )
}

export default Navbar
