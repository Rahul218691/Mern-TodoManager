import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getTodosList,createTodosList,deleteTodosList} from '../actions/todoActions';
import {Loader} from '../components';

function TodoListCard() {

    const dispatch = useDispatch();

    const todos = useSelector((state)=>state.todos);

    const [name,setName] = useState('');
    const [loading,setLoading] = useState(true);

    const handleCreateTodo = (e) =>{
        e.preventDefault();
       dispatch(createTodosList(name))
       setName('');
    }

    const deleteTodo = id =>{
        dispatch(deleteTodosList(id))
    }

    useEffect(() =>{
        dispatch(getTodosList())
        setLoading(false)
    },[dispatch]);    


    return (
        <div className="card">
            <div className="card-header text-center">
                TodoList
            </div>
            <ul className="list-group list-group-flush">
                {
                    loading ? <Loader /> : todos.length > 0 ? 
                    todos.map((todo,i) =>(
                        <li className="list-group-item" key={i}>{todo.name} <span className="float-right" onClick={()=>deleteTodo(todo._id)}><i className="fas fa-trash"></i></span></li>
                    )) : (
                        <li className="list-group-item text-center">Please add some items</li>
                    )
                }
                <div className="mt-2 container">
                    <form>
                        <div className="form-group">
                                <input className="form-control"
                                placeholder="create task" 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}/>
                            <button className="btn btn-success" onClick={handleCreateTodo}>Add</button>
                        </div>
                    </form>
                </div>
            </ul>
        </div>
    )
}

export default TodoListCard;
