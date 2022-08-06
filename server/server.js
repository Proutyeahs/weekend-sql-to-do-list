const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({extended : true}))
app.use(express.static('server/public'))

let todoRouter = require('./routes/todo.router.js');
app.use('/todo', todoRouter)

app.listen(PORT, function(){
    console.log('lisenting on port', PORT)
})

