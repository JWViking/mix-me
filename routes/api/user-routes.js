const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateFriends,
    deleteFriend
} = require('../../controllers/user-controllers');

//Get and Post at api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Get with id, Put, Delete @ api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//Put api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(updateFriends)
    .delete(deleteFriend);

module.exports = router;
