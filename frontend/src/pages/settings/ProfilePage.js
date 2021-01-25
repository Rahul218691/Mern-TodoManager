import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Message,Loader} from '../../components';
import {USER_PROFILE_UPDATE_RESET} from '../../constants/userConstants';
import {updateProfile} from '../../actions/userActions';

function ProfilePage() {

    const dispatch = useDispatch()

    const {userInfo} = useSelector(state=>state.userLogin);
    const {loading,error} = useSelector(state=>state.userProfileUpdate);

   const [values,setValues] = useState({
    name:'',
    email:'',
    profile:'',
    img:'',
    formData:new FormData()
   });

   const {name,email,formData,img} = values;

    const handleOnChange = name =>event =>{
        const value = name === "profile" ? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values,[name]:value})
    }

    const handleProfileSubmit = e =>{
        e.preventDefault();
        dispatch(updateProfile(formData));
    }

    useEffect(() =>{
        if(userInfo){
            setValues({
                ...values,
                name:userInfo.name,
                img:userInfo.profile,
                email:userInfo.email
            });
        }// eslint-disable-next-line
    },[userInfo])

	if(error){
        setTimeout(()=>dispatch({
            type:USER_PROFILE_UPDATE_RESET
        }),2000);	
    }   

    return (
        <div className="container mt-5">
            <h4 className="text-center">User Profile</h4>
            {loading && <Loader />}
            {error && <Message type="danger">{error}</Message>}
            <div className="row">
                    <div className="col-md-4">
                        <img src={img} className="img-fluid" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <form onSubmit={handleProfileSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" placeholder="username"
                                className="form-control"
                                value={name}
                                name="name"
                                onChange={handleOnChange('name')}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="abc@gmail.com"
                                className="form-control"
                                readOnly
                                value={email}
                                />
                            </div>
                            <div className="custom-file mb-3">
                                <input type="file" className="custom-file-input" id="validatedCustomFile"
                                name="profile"
                                onChange={handleOnChange('profile')}/>
                                <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                            </div>
                            <button className="btn btn-warning" type="submit">UpdateProfile</button>
                        </form>
                    </div>
            </div>
        </div>
    )
}

export default ProfilePage;
