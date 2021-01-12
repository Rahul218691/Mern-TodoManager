const router = require('express').Router();
const {
    createUser, authUser
} = require('../controllers/authController');


router.post('/register',createUser);
router.post('/login',authUser);

module.exports = router;