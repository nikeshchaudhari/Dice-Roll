const http = require('http')
const app = require('./app')
const server = http.createServer(app)
server.listen(4001,()=>{
console.log("Server is Running.....");

})