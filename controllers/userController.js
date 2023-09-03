const { User} = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User and associated apps deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  //Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //add a new friend to user's friend list
  async createUserFriend(req, res){
    try{
      const user = await User.findOne(
        { _id: req.params.userId });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (user.friends.includes(friendId)) {
          return res.status(400).json({ message: 'Friend already exists in the user\'s friend list' });
        }
        const friend = await User.findOne({ _id: friendId });

        if (!friend) {
          return res.status(404).json({ message: 'Friend not found' });
        }
        user.friends.push(friendId);
        await user.save();
        res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
   //delete friend from user's friend list
   async deleteUserFriend(req, res){
    try{
      const user = await User.findOne(
        { _id: req.params.userId });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (!user.friends.includes(friendId)) {
          return res.status(400).json({ message: 'Friend does not exist in the user\'s friend list' });
        }
        user.friends = user.friends.filter(friend => friend.toString() !== friendId);
        await user.save();
        res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
