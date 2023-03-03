const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port= 3000

app.use(bodyParser.json())
const student_router = require('./routers/students')
app.use('/',student_router);
const router = express.Router();

app.listen(post, ()=>{
    console.log (`example app listening en port ${port}`)
})



module.exports=router


