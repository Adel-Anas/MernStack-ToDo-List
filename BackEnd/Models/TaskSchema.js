import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    
    Title: {type: String, required:true},
    Description:{type: String},
    Priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
    },
    Status:{enum: 
        ["ToDo","In Progress", "Completed"],
        default: "ToDo"
    },
    DeletedAt:{
        type:Date,
        default:null
    },
    CreatedBy:{
        type:String,
    }
})

export const Task = mongoose.model('Task', TaskSchema);
