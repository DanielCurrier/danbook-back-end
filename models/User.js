const { Schema, model } = require("mongoose");


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            match: [/.+\@.+\..+/],
            unique: true,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
        ],
    },

    {
        toJSON: {
            virtuals: true
        },
        id: false

    }
);

userSchema.virtual("friendsCount").get(function () {
    return this.friends.length;
});

module.exports = model("User", userSchema);