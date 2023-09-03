const { Thought, User } = require('../models');
module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');;
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
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } }, // Remove the thoughtId from the 'thoughts' array
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'Thought deleted, but found no user with that ID',
                });
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
    // Create thought reaction
    async createThoughtReaction(req, res) {
        try {
            const { thoughtId } = req.params;
            const newReaction = req.body;
            const thought = await Thought.findOne({ _id: thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }


            //  Add the new reaction to the reactions array of the thought
            thought.reactions.push(newReaction);

            // Save the updated thought with the new reaction
            const updatedThought = await thought.save();

            res.json(updatedThought);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // Delete thought reaction
    async deleteThoughtReaction(req, res) {
        try {
            const {thoughtId, reactionId} = req.params;
            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId: reactionId } } },
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