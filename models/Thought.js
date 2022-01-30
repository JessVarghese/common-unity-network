const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [],
     
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );
  
  // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
  
  const Thought = model('Thought', ThoughtSchema);
  
  module.exports = Thought;