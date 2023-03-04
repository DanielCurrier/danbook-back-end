const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        createdAt: new Date().toLocaleDateString(),
    }
});

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            createdAt: Date.now,
            get: (time) => format_date(time)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],


    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }


)
thoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length;
});
module.exports = model("Thought", thoughtSchema);