'use strict'
const  tasks         = require('express').Router();
const db    = require('../models/task')


//const sendString = (req, res)=>res.send(`Deleted one ${req.params.taskID}`)
const sendJSONresp = (req, res)=>res.json(res.rows)


tasks.route('/:taskID')
    .put(db.updateTask, sendJSONresp)
    .delete(db.deleteTask, (req, res)=>res.send(req.params.taskID))



tasks.route('/')
    .get(db.getTasks, sendJSONresp)
    .post(db.addTask, sendJSONresp)





module.exports = tasks
