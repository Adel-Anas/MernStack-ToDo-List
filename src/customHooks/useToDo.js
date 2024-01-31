// useTodoItems.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useTodoItems = () => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/tasks', {
          params: { status: 'ToDo' }, // Assuming you have a backend route that filters by status
        });
        setTodoItems(response.data);
      } catch (error) {
        console.error('Error fetching ToDo items:', error);
      }
    };

    fetchData();
  }, []);

  return todoItems;
};

export default useTodoItems;
