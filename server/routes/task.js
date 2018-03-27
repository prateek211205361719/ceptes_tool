const moment = require('moment');
const { Tasks } = require('../models/task');
const { userPastDueTaskList } = require('../helper/taskHelper');
const _ = require("lodash");
module.exports =  (app) => {
    
    //get all task according to milestone and project
    app.get('/api/tasks/milestone/:milestoneId', async (req, res) => {
        var projectId = req.query.projectId;
        var milestoneId =req.params.milestoneId;
       
        let assignTaskList = await Tasks.find({'milestone._mileStoneId': milestoneId});
        let unAssignTaskList = await Tasks.find({
            $and:[
                  {milestone: []},
                  {'project._projectId': projectId}
            ]
        });
        res.send({assignTaskList, unAssignTaskList});
    });

    //get all task related to project which dont belogs to milesstone
    app.get('/api/tasks/milestone/:milestoneId', async (req, res) => {
        var milestoneId =req.params.milestoneId;
        let taskList = await Tasks.find({_mileStioneId: null});
        res.send(taskList);
    });


    app.get('/api/tasks/:projectId', async (req, res) => {
        //const todayDatetime = moment(Date.now()).format('YYYY-MM-DDTHH:MM:SS.sss');
        const todayDatetime = Date.now();
        var type = req.query.type;
        var projectId = req.params.projectId;
        var userId = req.user._id;
        var reqParam = {};
        reqParam["$and"] = [];

        console.log('project id - '+projectId);

        if (projectId !== 'undefined') {
            reqParam["$and"].push({"project._projectId": projectId});
        }

        reqParam["$and"].push({"assignedUsers._userId": userId});

        if (type !== 'undefined') {
            switch(type) {
                case 'Past Due': reqParam["$and"].push({"dueDate": { $lt: todayDatetime }});
                                reqParam["$and"].push({"status": { $ne: 'Completed' }});
                                break;
                case 'Pending': reqParam["$and"].push({"status": { $in: ['In Progress', 'Open']}});
                break;
                case 'Completed': reqParam["$and"].push({"status": { $eq: 'Completed'}});
                                break;
                default: break;

            }
        }


        if (reqParam["$and"].length < 2) {
            reqParam = {};
            reqParam["assignedUsers._userId"] = userId;
        }


        var taskListUpdated = await userPastDueTaskList(reqParam);
        

        if (!taskListUpdated) {
            return res.status(400).send();
        }

        res.send(taskListUpdated);

    });
   

    //To create a task
    app.post('/api/tasks', async (req, res) => {
            try{
                var { name, photo, _id} = req.user;
                var body = req.body;
                var task = new Tasks(body);
                task.__owner = {name, photo, _userId:_id};
                var newtask =  await task.save();
                res.send(newtask);
            }catch(e){
                console.log(e);
                res.status(400).send(e);
            }
    });

    //Update the task
    app.post('/api/updateTask/:task_id', async (req, res) => {
        var reqBody = req.body;
        //const taskobj = new Task(reqBody);
        //console.log('employeeObj -=-=- '+JSON.stringify(employeeObj));
        try {
           
            var updatedTask = await Tasks.findByIdAndUpdate(req.params.task_id,{$set:req.body},{new: true});
            if(!updatedTask)
                return res.status(400).send();
            res.send(updatedTask);
        } catch (err) {
            res.status(400).send(err);
        }
    });
    
    // updating task with milestoneid
     app.post('/api/updateTaskByMilesStone/:id', async  (req, res) => {
            var mileStoneId = req.params.id;
            var {assignedTask, unAssigned} = req.body;
            
           
            _.forEach(assignedTask , async (item) => {
                 item.milestone.push({
                    _mileStoneId:mileStoneId,
                    name:'new Mile'
                 });
                 let updatedTask =  await Tasks.findByIdAndUpdate(item._id, {$set:item},{new: true});
             
            })
            _.forEach(unAssigned , async (item) => {
                item.milestone = [];
                let updatedTask =  await Tasks.findByIdAndUpdate(item._id, {$set:item},{new: true});
            
           })

            res.redirect(`/api/tasks/milestone/${mileStoneId}?projectId=5ab64288d30def00143228f9`);
            //var assignedTaskList = await Tasks.find({_mileStoneId : mileStoneId});
           // console.log(assignedTaskList);
            //res.send(assignedTaskList);

            
     });


    //Delete the task
    app.delete('/api/deleteTask/:task_id', async (req, res) => {
        var taskId = req.params.task_id;

        try {
            var deletedRecord = await Tasks.findByIdAndRemove(taskId);
            res.send(deletedRecord);
        } catch (err) {
            res.status(400).send(err);
        }
        
    });

    // Fetch task lists related to the user

    app.post('/api/getUsersTasks', async (req, res) => {
        var userInfo = req.body;
        console.log(userInfo);
        try {
            // var fetchedTasks = await Tasks.find({"assignedUsers._userId": {$in : ['5a9d114ffb9d866cbe9e6f1b']}});
            
            var fetchedTasks = await Tasks.find({"assignedUsers._userId": "5a9d114ffb9d866cbe9e6f1b"});
            
            console.log('-- fetchedTasks -- '+fetchedTasks);
            res.send(fetchedTasks);
        } catch (error) {
            res.status(400).send(error)
        }
    });

    // Fetch issues related to the user

    app.post('/api/getUsersIssues', async (req, res) => {
        // req.body should contain 
        // {
        //     "assignedUsers._userId" : "5a9d114ffb9d866cbe9e6f1b",
        //     "type": {"$ne": "task"}
        // }
        var userInfo = req.body;

        try {
            var fetchedTasks = await limitedUserTaskList(userInfo, 5);
            res.send(fetchedTasks);
        } catch (error) {
            res.status(400).send(error)
        }
    });

    
    // Fetch issues related to the user

    app.post('/api/todayPendingTasks', async (req, res) => {
        // req.body should contain 
        // {
        //     "assignedUsers._userId" : "5a9d114ffb9d866cbe9e6f1b",
        //     "dueDate": todayDatetime
        // }
        var userInfo = req.body;
        // userInfo["dueDate"] = todayDatetime;

        var dateJSON = {};
        dateJSON["$eq"] = todayDatetime;

        userInfo.dueDate = dateJSON;
        console.log(userInfo);
        try {
            var fetchedTasks = await limitedUserTaskList(userInfo, 5);
            res.send(fetchedTasks);
        } catch (error) {
            res.status(400).send(error)
        }
    });

};