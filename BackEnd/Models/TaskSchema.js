const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    
    Title: {type: String, required:true},
    Description:{type: String},
    Priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
    },
    Status:{enum: 
        ["ToDo","In Progress", "Completed"]
    },
    DeletedAt:{
        type:Date,
        default:null
    },
    CreatedBy:{
        type:String,
    }

    

})

const Task = mongoose.model('Task', TaskSchema);
module.exports=Task;