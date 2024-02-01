/* eslint-disable no-unused-vars */
import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from 'react';
import Button from "../components/select";


function AddTask(url) {
  console.log(url)

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Priority: "",
    Status: "ToDo",
    DeletedAt: null,
    CreatedBy: "",
    Deadline: "",
  });

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url.url, formData);
      setFormData({
        Title: "",
        Description: "",
        Priority: "",
        Status: "",
        DeletedAt: null,
        CreatedBy: "",
      });
      url.closeAddTask(false);
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

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
                ADD NEW TASK
              </h1>
              <input
                type="text"
                className="border-b-2 border-black w-96 h-10 pl-2 outline-none focus:border-blue-600 duration-700"
                value={formData.CreatedBy}
                name="CreatedBy"
                placeholder="Enter Your Name"
                onChange={(e) =>
                  setFormData({ ...formData, CreatedBy: e.target.value })
                }
              />

              <input
                type="text"
                value={formData.Title}
                className="border-b-2 border-black w-96 h-10 pl-2 outline-none focus:border-blue-600 duration-700"
                placeholder="Task"
                name="Title"
                onChange={(e) =>
                  setFormData({ ...formData, Title: e.target.value })
                }
              />

              <textarea
                id=""
                cols="1"
                value={formData.Description}
                className="border-b-2 border-black w-96 h-10 pl-2 pt-2 outline-none focus:border-blue-600 duration-700"
                placeholder="Description"
                onChange={(e) =>
                  setFormData({ ...formData, Description: e.target.value })
                }
                name="Description"
              ></textarea>

              <select
                id=""
                name="Priority"
                value={formData.Priority}
                className="w-96 outline-none border-b-2 border-black focus:border-blue-600"
                onChange={(e) =>
                  setFormData({ ...formData, Priority: e.target.value })
                }
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <div>
                <p className="mb-3 font-[Poppins]">Enter a Deadline</p>
                <input
                  type="date"
                  className="border border-black px-4 py-2"
                  value={formData.Deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, Deadline: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-7">
                <Button variant="success" onClick={handlePost}>
                  Add
                </Button>
                <Button
                  onClick={() => {
                    url.closeAddTask(false);
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

export default AddTask;