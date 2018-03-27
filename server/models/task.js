
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    description:{
        type:String,
        required:true
    },
    _owner:[{
        name:{
            type:String,
            required:true
        },
        photo:{
            type:String,
            required:true
        },
        _userId:{
            type:Schema.Types.ObjectId,
            required:true
        }
    }],
    status:{
        type:String,
        required:true,
        default:'Open'
    },
    startDate:{
        type: Date, 
        default: Date.now,
    },
    dueDate:{
        type: Date, 
        default: Date.now,
    },
    duration:{
        type:Number,
        default:2
    },
    priority:{
        type:String,
        default:'Medium'
    },
    workHour:{
        type:Number,
        default:0
    },
    priority:{
        type:String,
    },
    type:{
        type:String,
        default:'task'
    },
    project:[{
        name:{
            type:String,
            required:true,
        },
        _projectId:{
            type:Schema.Types.ObjectId,
            required :true
        }
    }],
    _taskId:{
        type:Schema.Types.ObjectId
    },
    _mileStoneId:{
        type:Schema.Types.ObjectId
    },
    assignedUsers:[
        {
            name:{
                type: String
            },
            _userId:{
                type:Schema.Types.ObjectId,
                required:true
            }
        }
    ]
});

const Tasks = mongoose.model('Tasks', taskSchema);
module.exports = {
    Tasks
};
