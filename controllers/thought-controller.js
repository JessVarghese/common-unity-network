const { Thought } = require('../models');

const thoughtController = {
    //GET all thoughts
    getAllThoughts(req,res) {
        Thought.find({})
          .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    //   GET to get a single thought by its _id

    getThoughtById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    //   POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

    createThought({ body }, res) {
        Thought.create(body)
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },

    //   PUT to update a thought by its _id

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
// DELETE to remove a thought by its _id
      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },

      // POST to create a reaction stored in a single thought's reactions array field
      addReaction({ body }, res) {
        Thought.create(body)
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },
      // DELETE to remove a Reaction from a Thought's Reaction list

      deleteReaction({ body }, res) {
        Thought.findOneAndDelete(body)
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },
}

module.exports = thoughtController;