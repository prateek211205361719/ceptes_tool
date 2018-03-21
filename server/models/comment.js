
const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = Schema({
     description:{
        type:String,
     },
     _files:[{
        filename:{
            type:String
        },
        _fileId:{
            type:Schema.Types.ObjectId
        },
        uploadDate:{
            type:Date
        }
       
     }],
     _taskId:{
        type:Schema.Types.ObjectId
     },
     created_at:{ 
        type: Date, 
        required: true, 
        default: Date.now 
    },
     _owner:[{
        name:{
            type:String,
            required:true
        },
        photo:{
            type:String
        },
        email:{
            type:String,
            required:true
        },
        _userId:{
            type:Schema.Types.ObjectId,
            required:true
        }
     }]
});
const Comment = mongoose.model('comment', commentSchema);

module.exports = {
    Comment
};