import React,{useState,useEffect} from 'react'
import ContentImg from '../images/content.svg';
import {useSelector} from 'react-redux';

export default function TodoInactive() {

    const [welcome,setWelcome] = useState('');

    const {userInfo} = useSelector((state)=>state.userLogin);

    useEffect(() =>{
        let date = new Date();
        let hour = date.getHours();
        
        if(hour < 12) {
            setWelcome('Good Morning')
        }else if(hour < 17){
            setWelcome('Good Afternoon')
        }else{
            setWelcome('Good Evening')
        }
    },[])

    return (
        <div className="container mt-2">
            <p>{welcome && welcome} <strong>{userInfo && userInfo.name}</strong></p>
            <img src={ContentImg} alt="" className="img-fluid"/>
            <p className="text-center">You are signedIn as <strong>{userInfo && userInfo.email}</strong></p>
        </div>
    )
}
