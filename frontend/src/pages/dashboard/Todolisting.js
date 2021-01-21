import React,{useEffect,useState,useRef} from 'react'
import {Message} from '../../components';
import {useDispatch,useSelector} from 'react-redux';
import {addTaskList,fetchTaskList,deleteTaskData} from '../../actions/todoActions';

export default function Todolisting({change}) {

    const dispatch = useDispatch();

    const [todoname,setTodoname] = useState('');
    const [todoId,setTodoId] = useState('');
    const taskRef = useRef();

    const TodoList = useSelector((state)=>state.listTodo);
    const {success} = useSelector((state) =>state.subTask);
    const {taskdelete} = useSelector((state)=>state.deleteSubTask);

    useEffect(() =>{
        setTodoname(localStorage.getItem('TaskName'));
        setTodoId(localStorage.getItem('TaskId'));
        dispatch(fetchTaskList(localStorage.getItem('TaskId')));
    },[change,dispatch,success,taskdelete]);

    const handleAddTask = e =>{
        e.preventDefault();
        dispatch(addTaskList(todoId,taskRef.current.value,todoname));
        taskRef.current.value = "";
    }

    const handleDelete = (taskId,tasklistId) =>{
        dispatch(deleteTaskData(taskId,tasklistId));
    }

    return (
        <div className="container mt-2">
            <Message type="secondary">Task: {todoname && todoname}</Message>
            <div>
                <form onSubmit={handleAddTask}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control"
                     placeholder="Enter your task" aria-label="Task list"
                      aria-describedby="basic-addon2" 
                      required
                      ref={taskRef}/>
                    <div className="input-group-append">
                        <button className="btn btn-warning" id="basic-addon2">Add Task</button>
                    </div>
                    </div>
                </form>
                <div className="mt-2">
                <ul className="list-group">
                    {
                        TodoList[0] ?
                        TodoList[0].tasklists.reverse().map((todo,i) =>(
                            <li className="list-group-item" key={i}>{todo.task}<span className="float-right" style={{cursor:'pointer'}} onClick={()=>handleDelete(todoId,todo._id)}><i className="fas fa-trash"></i></span></li>
                        )) : (
                            <li className="list-group-item text-center">No Tasks Added</li>
                        )
                    }
                </ul>
                </div>
            </div>
        </div>
    )
}
