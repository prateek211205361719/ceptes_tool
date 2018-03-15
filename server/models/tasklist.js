

const mongoose = require("mongoose");
const { Schema } = mongoose;
const tasklistSchems = Schema({
    name:{
        type:String,
        required:true
    },
    _milestone:{
        type:Schema.Types.ObjectId,
        required:true
    }
});

const TaskList = mongoose.model('TaskList', tasklistSchems);

module.exports = {
    TaskList
};

