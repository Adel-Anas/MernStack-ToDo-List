import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import './App.css';
import AddLogo from './assets/Add.png';
import SearchIcon from './assets/Search-icon.png';
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

  useEffect(()=>{
    getData();
  }, [])

  return ( 
    <>
      <div className="bg-[#465178] flex items-center justify-center pt-20 gap-8">
        {/* TO DO TABLE  */}
        <div className="shadow-2xl rounded-md w-[480px] h-[800px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
          <div className='mb-8 flex items-center justify-center border-b-[2px] border-b-white'>
            <h1 className='text-3xl text-white font-[Poppins] mb-5'>To Do</h1>
          </div>
          <div className='flex items-center justify-evenly mb-7 border-b-[2px] pb-8'>
            <input type="text" className='w-[320px] h-[45px] rounded pl-2 outline-none border border-white' placeholder='Search Task'/>
            <img src={SearchIcon} alt="search icon" className='w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer'/>
            <img src={AddLogo} onClick={showAddTask} alt="" className='w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer'/>
          </div>
           <div className='flex flex-col gap-6 items-center justify-center mb-6' >
              {fetchedData.map((item, index)=>{
                return (
                  <div  className='bg-blue-500 w-80 h-auto py-3 flex flex-col gap-2 items-center justify-center rounded-md' key={index}>
                    <p className='text-white font-[Poppins] text-lg'>{item.Title}</p>
                    <div className='w-full flex items-center justify-end pr-5'>
                     <p className='text-sm text-white font-[Poppins]'>Priority: {item.Priority}</p>
                    </div>
                  </div> 
                    )
                  })}
            </div>
        </div>

        {/* IN PROGRESS TABLE  */}
        <div className="shadow-2xl rounded-md w-[480px] h-[800px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
          <div className='mb-8 flex items-center justify-center border-b-[2px] border-b-white'>
            <h1 className='text-3xl text-white font-[Poppins] mb-5'>In Progress</h1>
          </div>
          <div className='flex items-center justify-evenly mb-7 border-b-[2px] pb-8'>
            <input type="text" className='w-[320px] h-[45px] rounded pl-2 outline-none border border-white' placeholder='Search Task'/>
            <img src={SearchIcon} alt="search icon" className='w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer'/>
          </div>
          <div className='flex items-center justify-center mb-6'>
            {/* <p className='text-3xl text-white'>{formattedDate}</p> */}
          </div>
        </div>

        {/* DONE TABLE  */}
        <div className="shadow-2xl rounded-md w-[480px] h-[800px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
          <div className='mb-8 flex items-center justify-center border-b-[2px] border-b-white'>
            <h1 className='text-3xl text-white font-[Poppins] mb-5'>Done</h1>
          </div>
          <div className='flex items-center justify-evenly mb-7 border-b-[2px] pb-8'>
            <input type="text" className='w-[320px] h-[45px] rounded pl-2 outline-none border border-white' placeholder='Search Task'/>
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
              className="home-card w-auto p-16 h-auto bg-white rounded relative flex flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: "0.5" }}
            >
              <h1 className='text-2xl font-[Poppins] font-bold'>ADD NEW TASK</h1>
              <input type="text" className='border-b-2 border-black w-72 h-10 pl-2 outline-none focus:border-blue-600 duration-700' value={formData.CreatedBy} name="CreatedBy" placeholder='Enter Your Name' onChange = {(e)=>setFormData({...formData, CreatedBy: e.target.value})} />

              <input type="text" value={formData.Title} className='border-b-2 border-black w-72 h-10 pl-2 outline-none focus:border-blue-600 duration-700' placeholder='Task' name="Title"
              onChange = {(e)=> setFormData({...formData, Title: e.target.value})}/>

              <textarea id="" cols="1" value={formData.Description} className='border-b-2 border-black w-72 h-10 pl-2 pt-2 outline-none focus:border-blue-600 duration-700' placeholder='Description' onChange = {(e)=>setFormData({...formData, Description: e.target.value})} name="Description"></textarea>

              <select id="" name="Priority" value={formData.Priority} className='w-72 outline-none border-b-2 border-black focus:border-blue-600' onChange = {(e)=>setFormData({...formData, Priority: e.target.value})}>
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
                <button onClick={handlePost} className=' w-28 h-10 rounded bg-black text-white font-[Poppins] hover:scale-105 duration-500'>Add</button>
                <button onClick={()=>{setAddTask(false)}} className='w-28 h-10 rounded bg-red-600 text-white font-[Poppins] hover:scale-105 duration-500'>Close</button>
              </div>
            </motion.div>
          </div>
        }
  </AnimatePresence>
    </>
  )
}

export default App

