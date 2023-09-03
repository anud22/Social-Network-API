const { Thought } = require('../models');
module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // Delete a thought 
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.userId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'Thought deleted!' })
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    //Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    async addThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // Remove thought reaction
    async removeThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }


            res.json(thought);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};