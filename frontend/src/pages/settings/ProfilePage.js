import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';

function ProfilePage() {

    const {userInfo} = useSelector(state=>state.userLogin);

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [profile,setProfile] = useState('');
    const [img,setImg] = useState('');

    useEffect(() =>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
            setProfile(userInfo.profile)
        }
    },[userInfo]);


    return (
        <div className="container mt-5">
            <h4 className="text-center">User Profile</h4>
            <div className="row">
                    <div className="col-md-4">
                        <img src={profile} className="img-fluid" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" placeholder="username"
                                className="form-control"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
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
                                <input type="file" className="custom-file-input" id="validatedCustomFile" onChange={(e)=>setImg(e.target.files[0])}/>
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
