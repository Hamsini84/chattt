var express = require("express")
var bodyParser = require('body-parser')
const req = require("express/lib/request")
const res = require("express/lib/response")
const { Socket } = require("socket.io")

var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://hamsini84:<Bharathbelli45>@cluster0.7cndmdh.mongodb.net/?retryWrites=true&w=majority'
const { sendStatus } = require("express/lib/response")
const { error } = require("console")



app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))





/*var msgSchema = new mongoose.Schema({

    name:String,
    message:String,
    required:true
    
})

var Msg = mongoose.model('msg', msgSchema);*/




var messages = [
    {name: "jihn", message: "hello"},
    {name:"jane", message:"hi"}
    
]

app.get('/messages', (req, res) => {
   res.send(messages)
  })

app.post('/messages',(req,res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)

})


io.on('connection',(Socket)=> {
    console.log('user connected')
})

mongoose.connect(mongoDB, (err)=> {
    console.log(' MongoDB connected')
})

var server = http.listen(3000, () => {
    console.log("i am listening", server.address().port ) 
})


