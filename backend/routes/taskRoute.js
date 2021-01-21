const router = require('express').Router();
const {protect} = require('../middlewares/authMiddleware');
const {
    createTask, getTasks, deleteTask,addTaskList,
    getTaskById,deleteSubTask,addTaskCompleted
} = require('../controllers/taskController');

router.get('/getmytask',protect,getTasks);
router.post('/addtask',protect,createTask);
router.delete('/deletetask/:id',protect,deleteTask);

router.get('/subtasks/:taskId',protect,getTaskById);
router.post('/addtasklist/:taskId',protect,addTaskList);
router.delete('/subtask/:taskId/tasks/:tasklistId',protect,deleteSubTask);
router.patch('/subtask/:taskId/tasks/:tasklistId',protect,addTaskCompleted);

module.exports = router;