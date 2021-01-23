const router = require('express').Router();
const {
    changePassword,
    getUserProfile
} = require('../controllers/userControllers');
const {protect} = require('../middlewares/authMiddleware');

router.get('/myprofile',protect,getUserProfile);

router.patch('/changepass',protect,changePassword);

module.exports = router;