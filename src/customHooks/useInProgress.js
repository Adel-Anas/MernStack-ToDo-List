// useInProgressItems.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useInProgressItems = () => {
  const [inProgressItems, setInProgressItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/todo', {
          params: { status: 'InProgress' }, // Assuming you have a backend route that filters by status
        });
        setInProgressItems(response.data);
      } catch (error) {
        console.error('Error fetching In Progress items:', error);
      }
    };

    fetchData();
  }, []);

  return inProgressItems;
};

export default useInProgressItems;
