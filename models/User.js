// 몽구스 모델을 가져온다.
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10 // salt몇글자인지
const userSchema = mongoose.Schema({
    name: {
        type: String, 
        maxlength: 50
    }, 
    email: {
        type: String,
        trim: true, // john ahn@naver.com 이있을떄 trim이 빈칸을 없애주는 역할을 한다.
        unique: 1 // 이메일은 유니크했으면 좋겠으니까
    }, 
    password: {
        type: String, 
        minlength: 5
    },
    lastname: {
        type: String, 
        maxlength: 50
    },
    role : {  // role을 주는 이유 어떤 유저가 관리자가 될수도 있고 일반 유저가 될수도 있기 때문, 관리자는 일반 유저를 관리할 수 있고,,
        type: Number, // 1이면 관리자, 0이면 일반유저고..
        default : 0
    },
    image : String,
    token: {
        type: String
    },
    tokenExp: { // 토큰이 사용할 수 있는 기간
        type: Number
    }

})
//****몽구스에서 가져온 메소드인데 index.js에서 register 분기로 들어오는 포스트메소드의 비밀번호를 암호화할때 pre메소드를 겪고 save한다.
userSchema.pre('save',function( next ) { // 'save'저장하기전에 함수 함수실행하고 next외치고 save하는것이라는 의미

    var user = this;
        // 비밀번호를 암호화 시킨다. 
    if(user.isModified('password')) {
    //salt생성
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB. 
            if(err) return next(err)
            user.password = hash
            next()
        });
    });
    }

})
const User = mongoose.model('User', userSchema)

module.exports = { User }