import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    
    Title: {
        type: String,
        required:true
    },
    Description:{
        type: String
    },
    Priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
    },
    Status:{
        type: String,
        enum: ["ToDo", "In Progress", "Completed"],
    },
    DeletedAt:{
        type:Date,
        default:null
    },
    CreatedBy:{
        type:String,
    },
    Deadline:{
        type: Date
    }
})
const Task = mongoose.model('Task', TaskSchema);

export default Task;
