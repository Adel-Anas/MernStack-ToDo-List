import Task from '../Models/TaskSchema.js';

const TaskController = {
    getAllTasks: async (req, res) => {
        try {
            const { status } = req.query;

            let query = { DeletedAt: null };

            if (status) {
                query.Status = status;
            }

            const tasks = await Task.find(query);
            res.json(tasks);
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    },
    getTaskById: async (req, res) => {
        try {
            const {id} = req.params
            if(!id){
                res.send("Id not Found")
            }
            const tasks= await Task.findById(id);
            res.status(200).json(tasks);
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
    postTask: async(req, res)=>{
        const {Title, Description, Priority, CreatedBy, Status, DeletedAt, Deadline}= req.body;
        try{
            const newPost= await Task.create({Title,Description,Priority,CreatedBy, Status, DeletedAt, Deadline});
            res.json(newPost);
            console.log('Task is submitted successfully');
        }catch (err){
            res.status(500).send(`Internal Server Error`);
        }
    },
    updateTask: async(req,res)=>{
        const {id} = req.params
        try{
            if(!id){
                res.send("Id Not Found, can't update")
            }
            const task = await Task.findByIdAndUpdate(id, req.body)
            res.status(200).json(task)
        }catch(err){
            res.send("Id Not Found, can't update")
        }
    },
    // eslint-disable-next-line no-unused-vars
    softDeleteTask: async(req,res)=>{
        const { id } = req.params
        try{
            await Task.findByIdAndUpdate(id,{DeletedAt: new Date().toISOString()})
            res.send("Item Deleted Successfully")
        }catch (err){
            res.send(`Internal Server Error`);
        }
    }
};


export default TaskController;