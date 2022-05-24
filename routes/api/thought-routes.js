const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtId,
    createThought,
    updateThought,
    deleteThought,
    updateReactions,
    deleteReaction
} = require('../../controllers/thought-controllers');

//Get and post at api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//get with id, Put, Delete at api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtId)
    .put(updateThought)
    .delete(deleteThought);

//put api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .post(updateReactions)
    .delete(deleteReaction);

module.exports = router