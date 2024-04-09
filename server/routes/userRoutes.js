const router = require("express").Router();
const {registerUser,loginUser,getCurrentUser} = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post('/register',registerUser)
router.post('/login',loginUser)


router.get('/get-current-user',authMiddleware, getCurrentUser)


module.exports = router