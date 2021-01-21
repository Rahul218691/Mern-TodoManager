import React,{useState} from 'react'
import {TodoList,InactiveTodo} from '../../components';
import Todolisting from './Todolisting';

const Dashboard = () =>{

    const [active,setActive] = useState(0);
    const [change,setChangeList] = useState(false);

    const setChange = () =>{
        setActive(1);
        setChangeList(!change);
    }

    const setDeleteState = () =>{
        setActive(0);
    }

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-4">
                    <TodoList onUpdate={setChange} onDeleted={setDeleteState}/>
                </div>
                <div className="col-md-8">
                    {
                        active === 1 ? <Todolisting change={change}/> : <InactiveTodo />
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
