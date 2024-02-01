/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/select";


function UserInfo({Info, closeState}) {
  return (
    <>
      <AnimatePresence>
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000099] flex items-center justify-center">
            <motion.div
              className=" home-card w-[600px] p-10 h-auto bg-white rounded relative flex flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: "0.5" }}
            >
              <h1 className="text-3xl font-[Poppins] font-bold italic underline ">
                INFO TASK
              </h1>
              <input
                disabled={true}
                type="text"
                className="card-input"
                value={Info.CreatedBy}
                name="CreatedBy"
                placeholder="Enter Your Name"
              />

              <input
                disabled={true}
                type="text"
                value={Info.Title}
                className="card-input"
                name="Title"
              />

              <input
                disabled={true}
                id=""
                cols="1"
                value={Info.Description}
                className="card-input"
                placeholder="Description"      
                name="Description"
              ></input>

              <input
                className="card-input "
                type="text"
                disabled={true}
                placeholder={Info.Priority}
              />

              <input
                className="card-input"
                type="text"
                disabled={true}
                placeholder={Info.Status}
              />
              <Button
                className="w-[200px]"
                onClick={() => {
                  closeState(false)
                }}
                variant="warning"
              >
                Close
              </Button>
            </motion.div>
          </div>
      </AnimatePresence>
    </>
  );
}

export default UserInfo;