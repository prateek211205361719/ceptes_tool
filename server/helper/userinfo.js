const moment = require('moment');
const mongoose = require('mongoose');
const { Tasks } = require('../models/task');
const { Milesstones } = require('../models/milesstone');

const todayDatetime = moment(Date.now()).format('YYYY-MM-DDTHH:MM:SS.ss');

module.exports = {
    userTaskList :  () => {
        // User related tasks
        try {
            // var fetchedTasks = await Tasks.find({"assignedUsers._userId": {$in : ['5a9d114ffb9d866cbe9e6f1b']}});
            
            var fetchedTasks =  Tasks.find({"assignedUsers._userId": "5a9d114ffb9d866cbe9e6f1b"});
            
            // console.log(fetchedTasks);
            return fetchedTasks;
            //res.send(fetchedTasks);
        } catch (error) {
            return error;
        }
    },
    pastDueTaskList: () => {
        //console.log('--- date pastDueTaskList -- '+todayDatetime);
        try {
            // var fetchedPastDueTaskList = Tasks.find({dueDate: {$lt : todayDatetime}});

            

            var fetchedPastDueTaskList = Tasks.aggregate([
                {   "$group" : { "_id" : "$status" ,  "name" : { $push: "$name" }}  }
            ]);

            return fetchedPastDueTaskList;
        } catch (error) {
            return error;
        }
    },
    todayDueTaskList: () => {
        //console.log('--- date todayDueTaskList -- '+todayDatetime);
        try {
            var fetchedtodayDueTaskList = Tasks.find({dueDate: todayDatetime});
            return fetchedtodayDueTaskList;
        } catch (error) {
            return error;
        }
    },
    milestoneList: () => {
        try {
            // TODO: pass the related user id - {"_responsible._userId": "5a8eb7cdd5debe535cecf90d"} as parameter
            var milestoneList = Milesstones.find({"_responsible._id": "5a8eb7cdd5debe535cecf90d"});
            return milestoneList;
        } catch (error) {
            return milestoneList;
        }
    },
    taskListGroupBy: () => {
        try {

            // { $group : { _id : "$author", books: { $push: "$title" } } }
            var taskListGroupBy = Tasks.find({ $group : { _id : "$priority", books: { $push: "$name" } } });
            return taskListGroupBy;
        } catch (error) {
            return error;
        }
    }

};