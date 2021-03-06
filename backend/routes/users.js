const express = require('express');
const router = express.Router();
const { getAllUsers, getAUser, getAllUsersPerCommunity, getActivityPerUser, createUser, editUser} = require('../db/queries/usersQueries.js')

// * `GET /users`
//   * Get all users

// * `GET /users/community/:id`
//   * Get all users per community

// * `GET /users/activity/:user_id`
//   * Get all activity for a user

// * `POST /users`
//   * Create a new user

// * `PATCH /users/:user_id`
//   * Update a specific user

//* GET /users/:id
//*GET Specific user

router.get('/:id', getAUser);
router.get('/', getAllUsers)
router.get('/community/:id', getAllUsersPerCommunity)
router.get('/activity/:user_id', getActivityPerUser)
router.post('/', createUser)
router.patch('/:user_id', editUser)


module.exports = router;
