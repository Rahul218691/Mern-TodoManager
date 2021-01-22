import React,{useEffect,useState,useRef} from 'react'
import {Message} from '../../components';
import {useDispatch,useSelector} from 'react-redux';
import {addTaskList,fetchTaskList,deleteTaskData,AddToComplete} from '../../actions/todoActions';
import {Collapse} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Pie3D from '../../components/chart/Pie3D';

export default function Todolisting({change}) {

    const dispatch = useDispatch();

    const [todoname,setTodoname] = useState('');
    const [todoId,setTodoId] = useState('');
    const taskRef = useRef();
    const [open,setOpen] = useState(false);

    const TodoList = useSelector((state)=>state.listTodo);
    const {success} = useSelector((state) =>state.subTask);
    const {taskdelete} = useSelector((state)=>state.deleteSubTask);
    const {taskcomplete} = useSelector((state)=>state.taskComplete);

    useEffect(() =>{
        setTodoname(localStorage.getItem('TaskName'));
        setTodoId(localStorage.getItem('TaskId'));
        dispatch(fetchTaskList(localStorage.getItem('TaskId')));
    },[change,dispatch,success,taskdelete,taskcomplete]);

    const handleAddTask = e =>{
        e.preventDefault();
        dispatch(addTaskList(todoId,taskRef.current.value,todoname));
        taskRef.current.value = "";
    }

    const handleDelete = (taskId,tasklistId) =>{
        dispatch(deleteTaskData(taskId,tasklistId));
    }

    const handleComplete = (taskId,tasklistId) =>{
        dispatch(AddToComplete(taskId,tasklistId))
    }

    const filteredCompleted =  TodoList[0] ? TodoList[0].tasklists.filter(task => task.completed === true) : [];
    const filteredInCompleted =  TodoList[0] ? TodoList[0].tasklists.filter(task => task.completed === false) : [];
    const totalTasks = TodoList[0] ? TodoList[0].tasklists.length : 0;

    const CompletedPerc = ((filteredCompleted.length/totalTasks) * 100);
    // console.log(CompletedPerc);
    const InCompletedPerc = ((filteredInCompleted.length/totalTasks) * 100);
    // console.log(InCompletedPerc);

    const chartData = [
        {
          label: "Complete",
          value: `${CompletedPerc}`
        },
        {
          label: "Incomplete",
          value: `${InCompletedPerc}`
        }
      ];

    return (
        <div className="container mt-2">
            <Message type="secondary">Task: {todoname && todoname} <span className="float-right"><Link to="#" onClick={()=>setOpen(prevOpen => !prevOpen)}><i className="fas fa-chart-pie mr-2"></i>{open ? 'Hide Graph' : 'View Graph'}</Link></span></Message>
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
                    <Collapse in={open}>
                        <div>
                            <Pie3D data={chartData} totalTasks={totalTasks}/>
                        </div>
                    </Collapse>
                </div>
                <div className="mt-2">
                <ul className="list-group">
                    {
                        TodoList[0] ?
                        TodoList[0].tasklists.reverse().map((todo,i) =>(
                            <li className={todo.completed ? 'list-group-item strikethrough' : 'list-group-item'} key={i}>{todo.task}<span className="float-right" style={{cursor:'pointer'}} onClick={()=>handleDelete(todoId,todo._id)}><i className="fas fa-trash"></i></span>
                            {!todo.completed && <span style={{cursor:'pointer'}} className="float-right mr-4" title="mark as complete" onClick={()=>handleComplete(todoId,todo._id)}><i className="fas fa-check"></i></span>}</li>
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
