import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4000/task'
});

export const getOrCreateToDoList = async (listName) => {
  try {
    const res = await instance.get(`/list/${listName}`);
    if (res) {
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export const createTask = async (taskBody, listId) => {
  try {
    const sessionLocation = JSON.parse(sessionStorage.getItem('td-location'));

    if (sessionLocation?.lat && sessionLocation?.lng) {
      const { lat, lng } = sessionLocation;
      taskBody.Location = { lat, lng };
    }
    
    const res = await instance.post(`/${listId}`, taskBody);
    if (res) {
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export const updateTask = async (taskBody, listId) => {
  try {
    const res = await instance.put(`/${listId}/task/${taskBody.TaskID}`, taskBody);
    if (res) {
      return res.data; 
    }
  } catch (err) {
    console.error(err);
  }
}

export const deleteTask = async (taskId, listId) => {
    try {
      const res = await instance.delete(`/${listId}/task/${taskId}`);
      if (res) {
        return res.data;
      }
    } catch (err) {
      console.error(err);
    }
}

