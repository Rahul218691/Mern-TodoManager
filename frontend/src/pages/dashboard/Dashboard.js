import React from 'react'
import {TodoList} from '../../components';

const Dashboard = () =>{
    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-4">
                    <TodoList />
                </div>
                <div className="col-md-8"></div>
            </div>
        </div>
    )
}

export default Dashboard
