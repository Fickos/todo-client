/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { createTask, updateTask } from "../service";
import { TaskDispatchContext } from "../context/TaskContext";
import { ACTION_TYPES } from "../context/Actions";
import { useParams } from "react-router-dom";


export default function CreateEditModal({ initTask, open, handleClose }) {
    const { id } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
      setContent(initTask?.Content ?? '');
    }, [initTask, open]);

    const taskDispatch = useContext(TaskDispatchContext);


    const handleSave = async () => {
      if (initTask?.TaskID) {
        const updateResult = await updateTask({ ...initTask, Content: content }, id);
        taskDispatch({
          type: ACTION_TYPES.EDIT,
          payload: { ...updateResult }
        });
      } else {
        const createResult = await createTask({ Content: content }, id);
        taskDispatch({
          type: ACTION_TYPES.ADD,
          payload: { ...createResult }
        });
      }
      handleClose();
    };

    return (
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ outline: "none" }}>
          <div className="modal-content">
            <h4>
              { initTask ? 'Edit item' : 'Add item' }
            </h4>
            <input type="text" onChange={(e) => setContent(e.target.value)} value={content} />
            <button onClick={handleSave}>Save</button>
          </div>
        </Box>
      </Modal>
    )
}