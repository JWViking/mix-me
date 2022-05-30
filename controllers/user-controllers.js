const { User } = require('../models');

// api/users
const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbMixmeData => res.json(dbMixmeData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get a user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbMixmeData => {
                if (!dbMixmeData) {
                    res.status(404).json({ message: 'No user is found with this id!' });
                    return;
                }
                res.json(dbMixmeData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //post a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbMixmeData => res.json(dbMixmeData))
            // .catch(err => res.status(400).json(err));
    },

    //update a user by it's _id (put)
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbMixmeData => {
                if (!dbMixmeData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbMixmeData);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete user by _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(deleteUser => {
                if (!deleteUser) {
                    res.status(404).json({ message: 'No User found with this id.' });
                }
                res.json(deleteUser);
            })
            .catch(err => res.status(400).json(err));
    },

    //bonus remove a users thoughts when the user is also deleted

    // api/users/:userId/friends/:friendId
    //add a new friend to user's friend list
    updateFriends({params}, res){
        User.findOneAndUpdate({_id:params.userId}, {$push:{friends: params.friendId}})
        .then(updateFriends => {
            if(!updateFriends) {
                res.status(404).json({message: 'No user found with this id.'});
            }
            res.json(updateFriends);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a friend from a user's friend list
    deleteFriend({params}, res){
        User.findOneAndUpdate({_id:params.userId}, {$pull: {friends:params.friendId}})
        .then(deleteFriend => {
            if(!deleteFriend) {
                res.status(404).json({message: 'No user with this id.'});
            }
            res.json(deleteFriend);
        })
        .catch(err => res.status(400).json(err));
    }
};



module.exports = userController;