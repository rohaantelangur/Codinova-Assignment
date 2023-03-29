const express = require('express');
const dbconnect = require('./config/dbconnect');
var cors = require('cors')
const app = express()
app.use(cors())
const dotenv = require("dotenv").config();
const ExchangeList = require("./routes/ExchangeList") 
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const { notFound, errorhandle } = require('./middleware/errorHandler');
dbconnect() 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/v1', ExchangeList)

app.use(notFound)
app.use(errorhandle)

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})
