const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughtData) => !thoughtData
                ? res.status(404).json({ message: 'No thought has been found with that Id!' })
                : res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true, runValidators: true })
            .then(thoughtData => thoughtData ? res.json(thoughtData) : res.status(404).json({ message: thought404Message(req.params.thoughtId) }))
            .catch(err => res.status(400).json(err))

    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thoughtData) => !thoughtData
                ? res.status(404).json({ message: 'No thought has been found with this Id!' })
                : res.json({ message: 'Thought has been successfully deleted!' }))
            .catch((err) => res.status(404).json(err))
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username } } },
            { new: true, runValidators: true })
            .then(thoughtData => !thoughtData
                ? res.status(404).json({ message: 'No thought has been found with that Id!' })
                : res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true })
            .then(thoughtData => !thoughtData
                ? res.status(404).json({ message: 'No thought has been found with that Id!' })
                : res.json(thoughtData))
            .catch((err) => res.status(500).json(err))
    }
};