const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://parksoyoung:qkr76600@cluster0.xjjhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    
}).then(() => console.log("mongoDB connected..."))
.catch(err => console.log(err))
app.get('/', (req,res) => res.send("Hello world"))

app.listen(port, () => console.log(`example app listening on port ${port}`))


// mongosh "mongodb+srv://cluster0.xjjhr.mongodb.net/myFirstDatabase" --username parksoyoung


// add your application string into youtr application code
// mongodb+srv://parksoyoung:<password>@cluster0.xjjhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority