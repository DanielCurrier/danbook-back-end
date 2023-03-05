const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find({})
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));

    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((userData) => !userData ? res.status(404).json({ message: 'No user has been found with this id!' }) : res.json(userData)
            )
    },
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((userData) => !userData
                ? res.status(404).json({ message: 'No user has been found with this id!' })
                : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.deleteOne({ _id: req.params.userId })
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'No user found with that id!' })
                    : Thought.deleteMany({ username: userData.username })
                        .then(deletedData => deletedData ? res.json({ message: 'All thoughts from this User have been successfully deleted!' }) : res.status(404).json({ message: 'No thoughts have been found under this username...' }))
            })
    },
    addNewFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true, runValidators: true })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true, runValidators: true })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },


}