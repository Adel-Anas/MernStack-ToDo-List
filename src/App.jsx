/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import "./App.css";
import "./Scrollbar.css";
import AddLogo from "./assets/Add.png";
import SearchIcon from "./assets/Search-icon.png";
import Check from './assets/check.png';
import Delete from "./assets/delete.png";
import Modify from "./assets/modify.png";
import AddTask from "./components/AddTask.jsx";
import UpdateTask from "./components/UpdateTask.jsx";
import UserInfo from "./components/UserInfo.jsx";
import useGet from "./customHooks/useFetch.js";

function App() {
  const urlApi = 'http://localhost:4001/api/tasks';
  

  const [toDO]= useGet( urlApi, {status : 'ToDo'})
  const [inProgressItems] = useGet( urlApi, {status: 'In Progress'});
  const [doneItems] = useGet(urlApi, {status: "Done"})
  
  const [addTask, setAddTask] = useState(false);
  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState(""); 
  
  const [updatedTask, setUpdatedTask] = useState({
    Title: "",
    Description: "",
    Priority: "",
    Status: "ToDo",
    DeletedAt: null,
    CreatedBy: "",
    Deadline: "",
  });
  
  const filteredTasks = toDO.filter(
    (task) =>
      task.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.CreatedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const openCard = (item) => {
    setUpdatedTask(item);
    setShowUpdateCard(true);
  };
  const showInfoUser = (item) => {
    setUpdatedTask(item);
    setUserInfo(true);
  };
  const showAddTask = () => {
    setAddTask(true);
  };

  const handleStatusChange = async (id, currentStatus) => {
    console.log(`This is the Id` + id)
    console.log("This is The current Status" + currentStatus);
    try {
      let newStatus = '';
      currentStatus === "ToDo" ? newStatus = 'In Progress' : newStatus ='Done' 
      await axios.put(`http://localhost:4001/api/tasks/${id}`, {
        Status: newStatus,
      });
      alert(`Task status updated to ${newStatus}!`);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSoftDelete = async (id) => {
    try {
      await axios.put(`http://localhost:4001/api/tasks/softDelete/${id}`);
      alert("Item Deleted !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>

        <div className="flex items-center justify-evenly min-h-screen bg-[#192428]">

          {/* TO DO TABLE  */}
          <div className="  shadow overflow-hidden rounded-md w-[400px] min-h-[650px] mb-11 pt-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
            <div className="mb-8 flex items-center justify-center border-b-[2px] border-b-white">
              <h1 className="text-3xl text-white font-[Poppins] mb-5">To Do</h1>
            </div>

            <div className="flex items-center justify-evenly mb-7 border-b-[2px] pb-8">
              <input
                type="text"
                className="w-[270px] h-[45px] rounded pl-2 outline-none border border-white"
                placeholder="Search Task"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img
                src={SearchIcon}
                alt="search icon"
                className="w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer"
              />
              <img
                src={AddLogo}
                onClick={showAddTask}
                alt=""
                className="w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer"
              />
            </div>

            <div className="relative scroll overflow-hidden h-auto flex flex-col gap-6 items-center justify-center mb-6 cursor-pointer">
              <div className="flex flex-col gap-6 overflow-y-auto">
                {filteredTasks.map((item, index) => {
                  const bgColor = item.Priority === 'High' ? 'bg-red-600' : item.Priority === 'Medium' ? 'bg-orange-400' : 'bg-green-600'
                  return (
                    <div
                      className={`${bgColor} cursor-pointer bg-blue-500 w-80 h-auto py-3 flex flex-col gap-3 items-center justify-center rounded-md hover:opacity-70 duration-300`}
                      key={index}
                    >
                      <div>
                        <p
                          onClick={() => showInfoUser(item)}
                          className="text-white font-[Poppins] text-xl"
                          >
                          {item.Title}
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-end gap-3">         
                          <img src={Check} className="icons" onClick={() => handleStatusChange(item._id , item.Status)}/>    
                          <img
                            src={Modify}
                            alt=""
                            className="icons"
                            onClick={() => openCard(item)}
                          />
                          <img
                            src={Delete}
                            alt=""
                            className="icons"
                            onClick={() => handleSoftDelete(item._id)}
                          />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* IN PROGRESS TABLE  */}
          <div className="shadow-2xl rounded-md w-[400px] h-[650px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
            <div className="mb-8 flex items-center justify-center border-b-[2px] border-b-white">
              <h1 className="text-3xl text-white font-[Poppins] mb-5">
                In Progress
              </h1>
            </div>
            <div className="flex items-center justify-evenly mb-7 border-b-[2px] pb-8">
              <input
                type="text"
                className="w-[270px] h-[45px] rounded pl-2 outline-none border border-white"
                placeholder="Search Task"
              />
              <img
                src={SearchIcon}
                alt="search icon"
                className="w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer"
              />
            </div>
            <div className="relative scroll overflow-hidden h-auto flex flex-col gap-6 items-center justify-center mb-6 cursor-pointer">
              <div className="flex flex-col gap-6 overflow-y-auto">
                {inProgressItems.map((item, index) => {
                  const bgColor = item.Priority === 'High' ? 'bg-red-600' : item.Priority === 'Medium' ? 'bg-orange-400' : 'bg-green-600'
                  return (
                    <div
                      className={`${bgColor} cursor-pointer bg-blue-500 w-80 h-auto py-3 flex flex-col gap-3 items-center justify-center rounded-md hover:opacity-70 duration-300`}
                      key={index}
                    >
                      <div>
                        <p
                          onClick={() => showInfoUser(item)}
                          className="text-white font-[Poppins] text-xl"
                          >
                          {item.Title}
                        </p>
                        </div>
                        <div className="w-full flex items-center justify-end gap-3 pr-3">         
                          <img src={Check} className="icons" 
                            onClick={() => handleStatusChange(item._id ,item.Status)}
                          />    
                          <img
                            src={Modify}
                            alt=""
                            className="icons"
                            onClick={() => openCard(item)}
                          />
                          <img
                            src={Delete}
                            alt=""
                            className="icons"
                            onClick={() => handleSoftDelete(item._id)}
                          />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DONE TABLE  */}
          <div className="shadow-2xl rounded-md w-[400px] h-[650px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col overflow-hidden">
            <div className="mb-8 flex items-center justify-center border-b-[2px] border-b-white">
              <h1 className="text-3xl text-white font-[Poppins] mb-5">Done</h1>
            </div>
            <div className="flex items-center justify-evenly mb-7 border-b-[2px] pb-8">
              <input
                type="text"
                className="w-[270px] h-[45px] rounded pl-2 outline-none border border-white"
                placeholder="Search Task"
              />
              <img
                src={SearchIcon}
                alt="search icon"
                className="w-[35px] h-[35px] hover:scale-[1.05] duration-300 cursor-pointer"
              />
            </div>

            <div className="relative scroll overflow-hidden h-auto flex flex-col gap-6 items-center justify-center mb-6 cursor-pointer">
              <div className="flex flex-col gap-6 overflow-y-auto">
                {doneItems.map((item, index) => {
                  const bgColor = item.Priority === 'High' ? 'bg-red-600' : item.Priority === 'Medium' ? 'bg-orange-400' : 'bg-green-600'
                  return (
                    <div
                      className={`${bgColor} cursor-pointer bg-blue-500 w-80 h-auto py-3 flex flex-col gap-3 items-center justify-center rounded-md hover:opacity-70 duration-300`}
                      key={index}
                    >
                    <div>
                      <p
                        onClick={() => showInfoUser(item)}
                        className="text-white font-[Poppins] text-xl line-through"
                        >
                        {item.Title}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-end gap-3 pr-3">         
                      <img src={Check} className="icons" onClick={() => handleStatusChange(item._id , item.Status)}/>    
                      <img
                        src={Modify}
                        alt=""
                        className="icons"
                        onClick={() => openCard(item)}
                      />
                      <img
                        src={Delete}
                        alt=""
                        className="icons"
                        onClick={() => handleSoftDelete(item._id)}
                      />
                    </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* ADD TASK CARD  */}
        { addTask &&
          <AddTask url={urlApi} closeAddTask={setAddTask}/>
        }

        {/* UPDATE TASK CARD */}
        {showUpdateCard && 
          <UpdateTask  TaskInfo={updatedTask} closeCard={setShowUpdateCard} valueInput={setUpdatedTask}/>
        }

        {/* USER INFO CARD */}
        {userInfo && 
        <UserInfo Info={updatedTask} closeState={setUserInfo}/>
        }            
      </div>

    </>
  );
}

export default App;
