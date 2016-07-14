'use strict'
const pg     = require('pg-promise')({

})



const config = {
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS
};

const _db = pg(config)

module.exports = {
 /*Get tasks */
 getTasks(req,res,next){
   _db.any('SELECT * FROM tasks;')
   .then( tasks=>{
     res.rows = tasks;
     next()
   })
   .catch(error =>{
     console.error('ERROR!!!', error);
     throw error
   })
 },
 /* posts task */
addTask(req,res,next){
 console.log('=====', req.body)
 _db.any(
   `INSERT INTO
   tasks(task_name, task_desc)
   VALUES($/name/, $/desc/)
   returning *;`, req.body
   )
 .then(data =>{
   console.log("ADDED TASK SUCCESFULLY");
   res.rows = data;
   next();
 })
 .catch(error=>{
   console.error('ERROR ADDING TASK!', error)
   throw error
 })
},
updateTask(req,res,next){
req.body.tID = Number.parseInt(req.params.taskID);
req.body.completed = !!req.body.completed

 _db.one(`UPDATE tasks SET
   task_name = $/task_name/,
   task_desc = $/task_desc/,
   completed = $/completed/
   WHERE task_id =$/tID/
   returning *;`,
   req.body)
 .then(task =>{
   console.log("UPDATED TASK SUCCESFULLY");
   res.rows = task;
   next();
 })
 .catch(error=>{
   console.error('ERROR ADDING TASK!', error)
   throw error
 })
},
deleteTask(req,res,next){
const tID = Number.parseInt(req.params.taskID);


 _db.none(`
   DELETE FROM tasks
   WHERE task_id = ($1)`,
   [tID])
 .then(task =>{
   console.log("DELETED TASK SUCCESFULLY");
   res.rows = task;
   next();
 })
 .catch(error=>{
   console.error('ERROR ADDING TASK!', error)
   throw error
 })
}
}
