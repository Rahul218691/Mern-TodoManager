const router = require('express').Router();
const {sendVerifyEmail,resetPassword} = require('../controllers/passwordController');

router.post('/verifyuser',sendVerifyEmail);
router.put('/resetpassword',resetPassword);

module.exports = router;