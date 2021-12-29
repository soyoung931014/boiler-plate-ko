// 몽구스 모델을 가져온다.
const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // bcrypt를 가져온다. //https://www.npmjs.com/package/bcrypt
const saltRounds = 10 // salt몇글자인지, 솔트를 생성하고 비밀번호를 암호화한다.(공식문서보자)

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
//**** */
//****몽구스에서 가져온 메소드인데 index.js에서 register 분기로 들어오는 포스트메소드의 비밀번호를 암호화할때 pre메소드를 겪고 save한다.
userSchema.pre('save',function( next ) { // 'save'저장하기전에 함수 함수실행하고 next외치고 save하는것이라는 의미

    var user = this; // userSchema다 가지고 온다. #10 7분
        
    // 비밀번호가 수정될떄만 아래 암호화가 진행된다. 이 조건 안써주면 예를 들어 이름을 수정할경우 패스워드가 새로 암호화 되므로, 패스워드를 수정했을 경우에만 새로 암호화되게 조건문을 씌워준다.
    if(user.isModified('password')) {
   
            //salt생성
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)// 에러가나면 index.js의 user.save의 err로 들어간다.
            bcrypt.hash(user.password, salt, function(err, hash) { // 콜백함수의 hash가 해시된 비번
                // Store hash in your password DB. 
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
            next()
    }

})

// ******comparePassword메소드 만들기
userSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPassword 1234567   (데이터베이스에 있는)암호화된 비밀번호 "$2b$10$CGGcucwh8PuiphmtPGV50u3PNXQZXjgIk6X3Ib1h2ZlZy27zkgEzq
    // 1234567을 암호화해서 데이터베이스의 암호화된 비밀번호와 같은지 확인해보자(복호화는 안됨, 암호화는 가능
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err),
        cb(null, isMatch)
    })

}




const User = mongoose.model('User', userSchema)



module.exports = { User }

