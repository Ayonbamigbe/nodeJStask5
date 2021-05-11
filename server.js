const express = require("express");
const Mongoose = require("mongoose");

var app = express();

Mongoose.connect("mongodb://localhost:27017/task5");

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ message:"succes" }));

const PeopleInfo = Mongoose.model("person", {
    name: String,
    email: String,
    country: String
});

app.post("/person", async (request, response) => {
    try {
        var person = new PeopleInfo(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/people", async (request, response) => {
    try {
        var result = await PeopleInfo.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/person/:id", async (request, response) => {
    try {
        var person = await PeopleInfo.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.put("/person/:id", async (request, response) => {
    try {
        var person = await PeopleInfo.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/person/:id", async (request, response) => {
    try {
        var result = await PeopleInfo.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.listen(6005, () => {
    console.log(`server is listening on port 6005...`)
});