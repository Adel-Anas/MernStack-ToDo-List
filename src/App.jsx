import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import './App.css';
import './Scrollbar.css';
import AddLogo from './assets/Add.png';
import SearchIcon from './assets/Search-icon.png';
import Delete from './assets/delete.png';
import Modify from './assets/modify.png';
import Button from './components/select';



function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Priority: "",
    Status: "ToDo",
    DeletedAt: null,
    CreatedBy: "",
    Deadline: ""
  })
  const [addTask, setAddTask] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const[userInfo, setUserInfo] = useState(false);
  const [itemId, setItemId] = useState(0)

  const [updatedTask, setUpdatedTask] = useState({
    Title: "",
    Description: "",
    Priority: "",
    Status: "ToDo",
    DeletedAt: null,
    CreatedBy: "",
    Deadline: ""
  })
  const [searchQuery, setSearchQuery] = useState("");
  // const formateddate= new Date(updatedTask.Deadline).split("01",1);

  const filteredTasks = fetchedData.filter((task) =>
    task.Title.toLowerCase().includes(searchQuery.toLowerCase()) || task.CreatedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showUpdateCard = (item) => {
    setUpdatedTask(
      item
    )
    setUpdateTask(true)
    setItemId(item._id)
  }
  const showInfoUser = (item) => {
    setUpdatedTask(
      item
    )
    setUserInfo(true)
  }
  const showAddTask = () => {
    setAddTask(true)
  }

  const getData = async () => {
    try{
      const response = await axios.get("http://localhost:4001/api/tasks")
      setFetchedData(response.data);
    }catch(err){
      console.error(err)
    }
  }

  const handlePost = async (e) => {
    e.preventDefault();
    try{
      console.log(formData.Title)
      await axios.post("http://localhost:4001/api/tasks", formData)
      setFormData({
        Title: "",
        Description: "",
        Priority: "",
        Status: "",
        DeletedAt: null,
        CreatedBy: ""
    })
      getData();
      setAddTask(false);
    }catch(err){
      console.error(err)
    }
  }

  const handleUpdate = async (id) => {
    try{
      await axios.put(`http://localhost:4001/api/tasks/${id}`, updatedTask)
      setUpdateTask(false)
      getData()
    }catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    getData();
  }, [])

  return ( 
    <>
      <div className="flex items-center justify-center gap-8 min-h-screen bg-[#192428]">
        {/* TO DO TABLE  */}
        <div className="shadow rounded-md w-[400px] h-[650px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
          <div className='mb-8 flex items-center justify-center border-b-[2px] border-b-white'>
            <h1 className='text-3xl text-white font-[Poppins] mb-5'>To Do</h1>
          </div>
          <div className='flex items-center justify-evenly mb-7 border-b-[2px] pb-8'>
            <input type="text" className='w-[270px] h-[45px] rounded pl-2 outline-none border border-white' placeholder='Search Task'
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)} 
         />
        
            <img src={SearchIcon} alt="search icon" className='w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer'/>
            <img src={AddLogo} onClick={showAddTask} alt="" className='w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer'/>
          </div>
           <div className='scroll pt-[200px] flex flex-col gap-6 items-center justify-center mb-6 cursor-pointer overflow-y-auto'>
              {filteredTasks.map((item, index)=>{
                return (
                  <div className='cursor-pointer bg-blue-500 w-80 h-auto py-3 flex flex-col gap-3 items-center justify-center rounded-md hover:opacity-70 duration-300' key={index}>
                    <p  onClick={()=>showInfoUser(item)} className='text-white font-[Poppins] text-xl'>{item.Title}</p>
                    <div className='w-full flex items-center justify-between px-5 gap-4'>
                      <div className='flex gap-1'>
                        <button className='status'>ToDo</button>
                        <button className='status'>In Progress</button>
                        <button className='status'>Done</button>
                      </div>
                     <div className='flex gap-1'>
                      <img src={Modify} alt="" className='icons' onClick={()=>showUpdateCard(item)}/>
                      <img src={Delete} alt="" className='icons'/>
                     </div>
                    </div>
                  </div> 
                    )
                  })}
            </div>
        </div>

        {/* IN PROGRESS TABLE  */}
        <div className="shadow-2xl rounded-md w-[400px] h-[650px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
          <div className='mb-8 flex items-center justify-center border-b-[2px] border-b-white'>
            <h1 className='text-3xl text-white font-[Poppins] mb-5'>In Progress</h1>
          </div>
          <div className='flex items-center justify-evenly mb-7 border-b-[2px] pb-8'>
            <input type="text" className='w-[270px] h-[45px] rounded pl-2 outline-none border border-white' placeholder='Search Task'/>
            <img src={SearchIcon} alt="search icon" className='w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer'/>
          </div>
          <div className='flex items-center justify-center mb-6'>
            {/* <p className='text-3xl text-white'>{formattedDate}</p> */}
          </div>
        </div>

        {/* DONE TABLE  */}
        <div className="shadow-2xl rounded-md w-[400px] h-[650px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
          <div className='mb-8 flex items-center justify-center border-b-[2px] border-b-white'>
            <h1 className='text-3xl text-white font-[Poppins] mb-5'>Done</h1>
          </div>
          <div className='flex items-center justify-evenly mb-7 border-b-[2px] pb-8'>
            <input type="text" className='w-[270px] h-[45px] rounded pl-2 outline-none border border-white' placeholder='Search Task'/>
            <img src={SearchIcon} alt="search icon" className='w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer'/>
          </div>
          <div className='flex items-center justify-center mb-6'>
            {/* <p className='text-3xl text-white'>{formattedDate}</p> */}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {addTask && 
          <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000099] flex items-center justify-center'>
            <motion.div
              className="home-card w-auto p-10 h-auto bg-white rounded relative flex flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: "0.5" }}
            >
              <h1 className='text-2xl font-[Poppins] font-bold'>ADD NEW TASK</h1>
              <input type="text" className='border-b-2 border-black w-96 h-10 pl-2 outline-none focus:border-blue-600 duration-700' value={formData.CreatedBy} name="CreatedBy" placeholder='Enter Your Name' onChange = {(e)=>setFormData({...formData, CreatedBy: e.target.value})} />

              <input type="text" value={formData.Title} className='border-b-2 border-black w-96 h-10 pl-2 outline-none focus:border-blue-600 duration-700' placeholder='Task' name="Title"
              onChange = {(e)=> setFormData({...formData, Title: e.target.value})}/>

              <textarea id="" cols="1" value={formData.Description} className='border-b-2 border-black w-96 h-10 pl-2 pt-2 outline-none focus:border-blue-600 duration-700' placeholder='Description' onChange = {(e)=>setFormData({...formData, Description: e.target.value})} name="Description"></textarea>

              <select id="" name="Priority" value={formData.Priority} className='w-96 outline-none border-b-2 border-black focus:border-blue-600' onChange = {(e)=>setFormData({...formData, Priority: e.target.value})}>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <div>
                <p className='mb-3 font-[Poppins]'>Enter a Deadline</p>
                <input type="date" className='border border-black px-4 py-2' value={formData.Deadline} onChange={(e)=>setFormData({...formData, Deadline: e.target.value})} />
              </div>

              <div className='flex gap-7'>
                <Button variant="success" onClick={handlePost} >Add</Button>
                <Button onClick={()=>{setAddTask(false)}} variant="danger">Close</Button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {updateTask && 
          <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000099] flex items-center justify-center'>
            <motion.div
              className="home-card w-auto p-10 h-auto bg-white rounded relative flex flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: "0.5" }}
            >
              <h1 className='text-2xl font-[Poppins] font-bold'>Update Task TASK</h1>

              <input type="text" className='border-b-2 border-black w-96 h-10 pl-2 outline-none focus:border-blue-600 duration-700' value={updatedTask.CreatedBy} name="CreatedBy" placeholder='Enter Your Name' onChange = {(e)=>setUpdatedTask({...updatedTask, CreatedBy: e.target.value})} />

              <input type="text" value={updatedTask.Title} className='border-b-2 border-black w-96 h-10 pl-2 outline-none focus:border-blue-600 duration-700' placeholder='Task' name="Title"
              onChange = {(e)=> setUpdatedTask({...updatedTask, Title: e.target.value})}/>

              <textarea id="" cols="1" value={updatedTask.Description} className='border-b-2 border-black w-96 h-10 pl-2 pt-2 outline-none focus:border-blue-600 duration-700' placeholder='Description' onChange = {(e)=>setUpdatedTask({...updatedTask, Description: e.target.value})} name="Description"></textarea>

              <select id="" name="Priority" value={updatedTask.Priority} className='w-96 outline-none border-b-2 border-black focus:border-blue-600' onChange = {(e)=>setUpdatedTask({...updatedTask, Priority: e.target.value})}>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
 
              <select name="" id="" value={updatedTask.Status} onChange={(e)=>setUpdatedTask({...updatedTask, Status: e.target.value})} className='w-96 outline-none border-b-2 border-black focus:border-blue-600'>
                <option value="ToDo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <div className='flex gap-7'>
                <Button onClick={()=>handleUpdate(itemId)} variant="info">Update</Button>
                <Button onClick={()=>{setUpdateTask(false)}} variant='danger'>Close</Button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
      {/* user info card */}
      <AnimatePresence>
        {userInfo && 
          <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000099] flex items-center justify-center'>
            <motion.div
              className=" home-card w-[600px] p-10 h-auto bg-white rounded relative flex flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: "0.5" }}
            >
              <h1 className='text-3xl font-[Poppins] font-bold italic underline '>INFO TASK</h1>

              <input  disabled={true}  type="text" className="card-input" value={updatedTask.CreatedBy} name="CreatedBy" placeholder='Enter Your Name' onChange = {(e)=>setUpdatedTask({...updatedTask, CreatedBy: e.target.value})} />

              <input   disabled={true}   type="text" value={updatedTask.Title} className='card-input' placeholder='Task' name="Title"
              onChange = {(e)=> setUpdatedTask({...updatedTask, Title: e.target.value})}/>

              <input    disabled={true}  id="" cols="1" value={updatedTask.Description} className='card-input' placeholder='Description' onChange = {(e)=>setUpdatedTask({...updatedTask, Description: e.target.value})} name="Description"></input>

              {/* <select id="" name="Priority" value={updatedTask.Priority} className='w-96 outline-none border-b-2 border-black focus:border-blue-600' onChange = {(e)=>setUpdatedTask({...updatedTask, Priority: e.target.value})}>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select> */}
              <input className='card-input ' type="text" disabled={true}  placeholder={updatedTask.Priority}/>
              

              {/* <select name="" id="" value={updatedTask.Status} onChange={(e)=>setUpdatedTask({...updatedTask, Status: e.target.value})} className='w-96 outline-none border-b-2 border-black focus:border-blue-600'>
                <option value="ToDo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select> */}
              <input className='card-input' type="text" disabled={true}  placeholder={updatedTask.Status}/>
              {/* <input  className="card-input text-center text-base " type="text" placeholder={formateddate} /> */}
              <Button className='w-[200px]' onClick={()=>{setUserInfo(false)}} variant='warning'>Close</Button>

            </motion.div>
            
          </div>
        }
      </AnimatePresence>
    </>
  )
}

export default App

