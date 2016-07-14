'use strict'
const express     = require('express')
const path        = require('path')
const logger      = require('morgan')
const bodyParser  = require('body-parser')
const PORT        = process.env.PORT ||3009
const app         = express()
const taskRoutes  = require('./routes/tasks.js')


app.use(logger('dev'))
app.use(express.static(path.join(__dirname,'public')))




app.get('/', (req, res)=>{
  res.send('Hello Home')
})

app.use('/tasks', taskRoutes);


app.listen(PORT, ()=>{
  console.log('Server is listening on port', PORT);
})
