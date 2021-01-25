const router = require('express').Router();
const {
    changePassword,
    updateUserProfile
} = require('../controllers/userControllers');
const {protect} = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/profile")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});

router.patch('/changepass',protect,changePassword);

router.put('/updateProfile',protect,upload.single('profile'),updateUserProfile);

module.exports = router;