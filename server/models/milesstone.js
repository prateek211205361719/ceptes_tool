
const mongoose = require("mongoose");
const { Schema } = mongoose;

const MilesstoneSchema = Schema({
    name:{
        type:String,
        required:true
    },
    startDate:{
        type: Date, 
        default: Date.now
    },
    endDate:{
        type: Date, 
        default: Date.now
    },
    project:[{
        name:{
            type:String,
            required:true
        },
        _projectId:{
            type:Schema.Types.ObjectId,
            required:true
        }
    }],
    _owner:[{
        name:{
            type:String,
            required:true
        },
        email:{
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
    _responsible:[{
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
    }],
    created_at:{ 
        type: Date, 
        required: true, 
        default: Date.now 
    }
    
});

const Milesstones  = mongoose.model('milesstones', MilesstoneSchema);
module.exports = {
    Milesstones
};
