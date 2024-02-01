import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/select";

function UpdateTask(TaskInfo) {
  const Info = {...TaskInfo}
  const handleUpdate = async (id) => {
    console.log(id)
    try{
      await axios.put(`http://localhost:4001/api/tasks/${id}`, Info.TaskInfo)
      alert("Data Updated")
      Info.closeCard(false)
      window.location.reload()
    }catch(err){
      console.error(err)
    }
  }
  return (
    <>
      <AnimatePresence>
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000099] flex items-center justify-center">
            <motion.div
              className="home-card w-auto p-10 h-auto bg-white rounded relative flex flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: "0.5" }}
            >
              <h1 className="text-2xl font-[Poppins] font-bold">
                Update Task TASK
              </h1>

              <input
                type="text"
                className="border-b-2 border-black w-96 h-10 pl-2 outline-none focus:border-blue-600 duration-700"
                value={Info.TaskInfo.CreatedBy}
                name="CreatedBy"
                placeholder="Enter Your Name"
                onChange={(e) =>
                  Info.valueInput({ ...Info.TaskInfo, CreatedBy: e.target.value })
                }
              />

              <input
                type="text"
                value={Info.TaskInfo.Title}
                className="border-b-2 border-black w-96 h-10 pl-2 outline-none focus:border-blue-600 duration-700"
                placeholder="Task"
                name="Title"
                onChange={(e) =>
                  Info.valueInput({ ...Info.TaskInfo, Title: e.target.value })
                }
              />

              <textarea
                id=""
                cols="1"
                value={Info.TaskInfo.Description}
                className="border-b-2 border-black w-96 h-10 pl-2 pt-2 outline-none focus:border-blue-600 duration-700"
                placeholder="Description"
                onChange={(e) =>
                  Info.valueInput({
                    ...Info.TaskInfo,
                    Description: e.target.value,
                  })
                }
                name="Description"
              ></textarea>

              <select
                id=""
                name="Priority"
                value={Info.TaskInfo.Priority}
                className="w-96 outline-none border-b-2 border-black focus:border-blue-600"
                onChange={(e) =>
                  Info.valueInput({ ...Info.TaskInfo, Priority: e.target.value })
                }
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select
                name=""
                id=""
                value={Info.TaskInfo.Status}
                onChange={(e) =>
                  Info.valueInput({ ...Info.TaskInfo, Status: e.target.value })
                }
                className="w-96 outline-none border-b-2 border-black focus:border-blue-600"
              >
                <option value="ToDo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <div className="flex gap-7">
                <Button onClick={() => handleUpdate(Info.TaskInfo._id)} variant="info">
                  Update
                </Button>
                <Button
                  onClick={() => {
                    Info.closeCard(false);
                  }}
                  variant="danger"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
      </AnimatePresence>
    </>
  );
}

export default UpdateTask;