const {Router} = require('express');

// Import controllers
const user = require('../controllers/user.controller');

// Create instance
const router = Router();

router.get('/', (req, res) => res.send('owo'));
router.get('/user/profile', user.profile);
router.post('/user/signup', user.signup);
router.post('/user/login', user.login);
router.put('/user/resetPassword/:token', user.resetPassword);
router.post('/user/forgotPassword', user.forgotPassword);

module.exports = router;