'use strict'
const  tasks         = require('express').Router();

const taskData = []
//const sendString = (req, res)=>res.send(`Deleted one ${req.params.id}`)



tasks.route('/:id')
    .get((req, res)=>res.send(`Show tasks ${req.params.id}`))
    .put((req, res)=>res.send(`Edited one ${req.params.id}`))
    .delete((req, res)=>res.send(`Deleted one ${req.params.id}`))



tasks.route('/')
    .get((req, res)=>res.send('Show tasks'))
    .post((req, res)=>res.send('Posted new taks'))







module.exports = tasks
