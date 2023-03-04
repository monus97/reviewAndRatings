const express = require('express')
//const app = express();
const router = express.Router()
// const utils = require('./validators/testSchema')



// const task = [
//     {
//     id : 1,
//     name : "task 1",
//     completed : false
//     },
//     {
//     id : 2,
//     name : "task 1",
//     completed : false
// },
// {
//     id : 3,
//     name : "task 1",
//     completed : false
// },
// ]

// router.get('/test/task',function(req,res){
//     console.log('hello this is testing tool')
//     res.status(200).json(task)
// })
// router.post("/create/task",(req,res)=>{
//     const {error} = utils.validateTask(req.body)
//     if(error) return res.status(400).send("the name should be at least 3 char long")
//     const task = {
//         id : getTasks.length+1,
//         name : req.body.name,
//         completed : req.body.completed
//     }
//     getTasks.push(task)
//     res.status(201).send(task)
// })


module.exports = router