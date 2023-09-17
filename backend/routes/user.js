const express = require('express')
const { loginUser, signupUser, getUsers } = require('../controllers/userController')

const router = express.Router()

// post: sending data to the db (e.g. loggin data/ new user data...)

// login route
router.post('/login', loginUser)

// signin route
router.post('/signup', signupUser)

// getUsers
router.get('/', getUsers)

module.exports = router
