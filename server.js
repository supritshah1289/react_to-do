'use strict'
const express     = require('express')
const path        = require('path')
const logger      = require('morgan')
const PORT        = process.env.PORT ||3009
const app         = express()


app.use(logger('dev'))
app.use(express.static(path.join(__dirname,'public')))



app.route('/tasks/:id')
    .get((req, res)=>res.send(`Show tasks ${req.params.id}`))
    .put((req, res)=>res.send(`Edited one ${req.params.id}`))
    .delete((req, res)=>res.send(`Deleted one ${req.params.id}`))



app.route('/tasks')
    .get((req, res)=>res.send('Show tasks'))
    .post((req, res)=>res.send('Posted new taks'))


app.get('/', (req, res)=>{
  res.send('Hello Home')
})



app.listen(PORT, ()=>{
  console.log('Server is listening on port', PORT);
})
