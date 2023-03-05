const mongoose = require('mongoose')
const { User, Thought } = require('../models');

mongoose.connect("mongodb://127.0.0.1:27017/danbookdb", {
    useNewUrlPArser: true,
    useUnifiedTopology: true,
}).then(() => { console.log("Server connection is live!"); })
    .catch((err) => { console.log(err) });

const seedUsers = [
    {
        username:
            "DanieltheManiel",
        email:
            "dandemonium@gmail.com"
    },
    {
        username: "ZenMaster69",
        email: "we1WUnoway@hotmail.com",
    },
    {
        username: "The_Legend27",
        email: "getrektN3rd@live.com",
    },
    {
        username: "TheThinkiestTh!nker",
        email: "digd33p@gmail.com",
    },
];
const seedThoughts = [
    {
        thoughtText: "Did somebody ring the Danster🤠?",
        username: "DanieltheManiel",
    },
    {
        thoughtText: "Emptying my mind and filling my belly 😋",
        username: "ZenMaster69",
    },
    {
        thoughtText: "I'm totally going to crash Zen's castle tonight hehe",
        username: "The_Legend27",
    },
    {
        thoughtText: "Thinking about nothing today,head empty ╰(*°▽°*)╯",
        username: "TheThinkiestTh!nker",
    },
];

const seedDb = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
    await Thought.deleteMany({});
    await Thought.insertMany(seedThoughts);
}

seedDb().then(() => {
    mongoose.connection.close();
    console.log('database seeded')
})