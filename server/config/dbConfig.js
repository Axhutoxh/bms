const mongoose = require('mongoose')
const mongodbURL = process.env.MONGODB_URL
const connection = mongoose.connection

mongoose.connect(mongodbURL,{})

connection.on('connected',()=>{
    console.log('Connection successful')
})