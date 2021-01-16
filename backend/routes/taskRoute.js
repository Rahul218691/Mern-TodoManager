const router = require('express').Router();
const {protect} = require('../middlewares/authMiddleware');
const {
    createTask, getTasks, deleteTask
} = require('../controllers/taskController');

router.get('/getmytask',protect,getTasks);
router.post('/addtask',protect,createTask);
router.delete('/deletetask/:id',protect,deleteTask);

module.exports = router;