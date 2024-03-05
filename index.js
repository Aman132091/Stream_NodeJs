const express = require('express')
require('dotenv').config()
const fs =require('fs')
const zlib = require('zlib')
const status = require('express-status-monitor')
const port = process.env.PORT
const app = express()
app.use(status())

fs.createReadStream('./sample.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")))


app.get('/',(req,res)=>{
    const stream = fs.createReadStream('./sample.txt',"utf-8")
    stream.on('data',(chunk)=> res.write(chunk))
    stream.on('end',()=> res.end())
    // fs.readFile("./sample.txt",(err,data)=>{
    //     res.end(data)
    // })
})
app.listen(port,()=>{
    console.log(`Server listened at http://localhost:${port}`);
})
