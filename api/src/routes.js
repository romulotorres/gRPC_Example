const { Router } = require('express')
const UserController = require('./controllers/UserController')

// const authMiddleware = require('./middlewares/auth');

const router = Router()

// router.use(authMiddleware);

router.get('/users', UserController.list)
router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)

module.exports = router
