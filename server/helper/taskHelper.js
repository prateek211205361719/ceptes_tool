const mongoose = require('mongoose');
const { Tasks } = require('../models/task');


module.exports = {
    userPastDueTaskList: (taskJSON) => {
        console.log(taskJSON.status);
        try {
            var fetchedPastDueTaskList = Tasks.find(taskJSON);
                
            return fetchedPastDueTaskList;
        } catch (error) {
            return error;
        }
    },
    limitedUserTaskList: (taskJSON, recLimit) => {
        try {
            var fetchedTasks = Tasks.find(taskJSON).limit(recLimit);
            return fetchedTasks;
        } catch (error) {
            return error;
        }
    }
};