
//환경변수를 dev, prod로 분기처리

if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}


