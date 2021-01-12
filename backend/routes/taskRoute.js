const router = require('express').Router();
const {protect} = require('../middlewares/authMiddleware');
const {
    createTask, getTasks
} = require('../controllers/taskController');

router.get('/getmytask',protect,getTasks);
router.post('/addtask',protect,createTask);

module.exports = router;