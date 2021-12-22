const express = require('express')
const app = express()
const port = 5000
const { User } = require('./models/User')
const bodyParser = require('body-parser')

//application/x-www-from-urlencoded 이렇게된 데이터를 분석해서 가져올 수 있게 하는것
app.use(bodyParser.urlencoded({extended : true}))

//application/json json타입으로 된것을 분석해서 가져올 수 있게 한것
app.use(bodyParser.json())

const config = require('./config/key')
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    
}).then(() => console.log("mongoDB connected..."))
.catch(err => console.log(err))

app.get('/', (req,res) => res.send("Hello world"))

app.post('/register', (req,res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것등을 데이터베이스에 넣어준다.
    const user = new User(req.body)
    /* { 이렇게 json형식으로 req.body에 들어갈 수 잇는 이유는 bodyParser때문. 클라이언트에서 정보를 bodyParser해서 서버에 넣어준다.
        username ; "parkso",
        email : "123@naver.com",
        password :"12345"

    } */
    user.save((err, userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({success : true})
    }) // save 몽고디비 메소드. 정보들이 유저에 저장이 된것임
})

app.listen(port, () => console.log(`example app listening on port ${port}`))


