import React from 'react'

function TodoListCard() {
    return (
        <div className="card">
            <div className="card-header text-center">
                TodoList
            </div>
            <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Vestibulum at eros</li>
            </ul>
        </div>
    )
}

export default TodoListCard;
