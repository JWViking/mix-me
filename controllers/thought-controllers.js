const { Thought } = require('../models');

//api/thoughts
const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .them(dbMixmeData => res.json(dbMixmeData)
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }));
    },

    //get a thought by id
    getThoughtId({params}, res) {
        Thought.findOne({_id: params.id})
        .select('-__v')
        .then(dbMixmeData => {
            if(!dbMixmeData) {
                res.status(404).json({message: 'No thought with this id.'});
                return;
            }
            res.json(dbMixmeData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create a new thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbMixmeData => res.json(dbMixmeData))
        .catch(err => res.status(400).json(err));
    },

    //update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbMixmeData => {
            if (!dbMixmeData) {
                res.status(404).json({message: 'No thought found with this id.'});
                return;
            }
            res.json(dbMixmeData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(deleteThought => {
            if (!deleteThought) {
                res.status(404).json({ message: 'No thought found with this id.'});
            }
            res.json(deleteThought);
        })
        .catch(err => res.status(400).json(err));
    },

    //update thought by pushing a reaction to the array
    updateReactions({params}, res){
        Thought.findOneAndUpdate({_id:params.thoughtId}, {push:{reaction: params.reactionId}})
        .then(updateThoughts => {
            if(!updateThoughts) {
                res.status(404).json({message: 'No thought found with this id'});
            }
            res.json(updateThoughts);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a reaction by pulling a reaction from the array
    deleteReaction({params}, res) {
        Thought.findByIdAndUpdate({_id:params.thoughtId}, {$pull: {reaction: params.reactionId}})
        .then(deleteReaction => {
            if(!deleteReaction) {
                res.status(404).json({message: 'No thought with this id.'});
            }
            res.json(deleteReaction);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;