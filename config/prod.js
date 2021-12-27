// 헤로쿠 캡쳐본을 보자
module.exports = {
    mongoURI: process.env.MONGO_URI
}
//분기처리
//로컬환경에서(development) 사용 할때 -> dev.js
//배포환경에서(production) 사용할때 => prod.js
