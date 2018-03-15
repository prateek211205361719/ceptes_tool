
const mongoose = require('mongoose');
const { Tasks } = require('../models/task');


module.exports = {
    userPastDueTaskList: (taskJSON) => {
        //console.log('todayDatetime -- '+todayDatetime);
        

        // console.log(taskJSON.myname);

        //var taskJSON = JSON.stringify(taskJSON);

       // console.log(taskJSON);


        try {
            var fetchedPastDueTaskList = Tasks.find(taskJSON);
                
            return fetchedPastDueTaskList;
        } catch (error) {
            return error;
        }
    },
};