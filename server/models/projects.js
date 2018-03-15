const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    _owner:{
        type:Schema.Types.ObjectId,
        required:true
    },
    startDate:{
        type: Date, 
        default: Date.now,
    },
    endDate:{
        type: Date, 
        default: Date.now,
    },
    Active:{
        type:Boolean,
        default:true
    },
    description:{
        type:String,
       
    },
  
    Users:[{
       name:{
           type:String
       },
       photo:{
           type:String
       },
       photo:{
        type:String
       },
       email:{
         type:String
       },
       _userId:{
             type:Schema.Types.ObjectId,
       }
    }],
    created_at:{ 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});

const Projects = mongoose.model('Projects', projectSchema);
module.exports = {
    Projects
};
