import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getTodosList,createTodosList,deleteTodosList} from '../actions/todoActions';
import {Loader} from '../components';
import {Link} from 'react-router-dom';

function TodoListCard({onUpdate,onDeleted}) {

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

    const moveToTask = (id,name) =>{
        // dispatch(fetchTaskList(id));
        localStorage.removeItem('TaskName');
        localStorage.removeItem('TaskId');
        localStorage.setItem('TaskName',name);
        localStorage.setItem('TaskId',id);
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
                        <li className="list-group-item" key={i}><Link to="#" onClick={()=>{
                            onUpdate()
                            moveToTask(todo._id,todo.name)
                        }}>{todo.name}</Link> <span className="float-right" style={{cursor:'pointer'}} onClick={()=>{deleteTodo(todo._id)
                             onDeleted()}}><i className="fas fa-trash"></i></span></li>
                    )) : (
                        <li className="list-group-item text-center">Please add some items</li>
                    )
                }
                <div className="mt-2 container">
                    <form>
                        <div className="form-group">
                                <input className="form-control"
                                placeholder="create Todo" 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}/>
                            <button className="btn btn-success" onClick={handleCreateTodo}>Add Todo</button>
                        </div>
                    </form>
                </div>
            </ul>
        </div>
    )
}

export default TodoListCard;
