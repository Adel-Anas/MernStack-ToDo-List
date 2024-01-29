import Task from '../Models/TaskSchema.js';

const TaskController = {
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find({DeletedAt:null});
            res.json(tasks);
        } catch (error) {
            console.error("Error getting data", error);
            res.status(500).send("Internal Server Error");
        }
    } ,
    getTaskById: async (req, res) => {
        try {
            const tasks= await Task.findById(req.params.id);
            res.status(200).json(tasks);
        } catch (err) {
            console.error("Error getting data", err);
            res.status(500).send("Internal Server Error");
        }
    },
    postTask: async(req, res)=>{
        const {Title, Description, Priority, CreatedBy, Status}= req.body;
        try{
            const newPost= await Task.create({Title, Description, Priority, CreatedBy, Status});
            res.json(newPost);
            console.log('Task is submitted successfully');
        }catch (err){
            console.error('Error creating task',err);
        }
    },
    updateTask: async(req,res)=>{
        try{
            const task = await Task.findByIdAndUpdate(req.params.id,req.body)
            res.status(200).json(task)
        }catch(err){
            console.error("erreur updating data",err)
        }
    },
    // eslint-disable-next-line no-unused-vars
    deleteTask: async(req,res)=>{
        try{
            await Task.findByIdAndDelete(req.params.id,{DeletedAt: new Date().toISOString()})
            res.send("Item Deleted Successfully")
        }catch (err){
            console.error("erreur deleting data",err)
        }
    }
};


export default TaskController;