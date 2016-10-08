var router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/posts', require('./post/postRoutes'));

module.exports = router;
