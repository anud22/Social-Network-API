const { Schema, model } = require('mongoose');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(){
                return this.createdAt.toLocalizedString();
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
userSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`;
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
