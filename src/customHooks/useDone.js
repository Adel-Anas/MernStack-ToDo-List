// useDoneItems.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useDoneItems = () => {
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/todo', {
          params: { status: 'Done' }, // Assuming you have a backend route that filters by status
        });
        setDoneItems(response.data);
      } catch (error) {
        console.error('Error fetching Done items:', error);
      }
    };

    fetchData();
  }, []);

  return doneItems;
};

export default useDoneItems;
