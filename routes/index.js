const router = require('express').Router()

router.use('/', require('./htmlRoutes.js'))
router.use('/api', require('./workoutRoutes.js'))

module.exports = router
