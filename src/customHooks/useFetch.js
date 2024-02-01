import axios from 'axios';
import { useEffect, useState } from 'react';

const useGet = (url, query, method = "GET") => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, {
          params : query,
          method
        });
        setTodoItems(response.data);
      } catch (error) {
        console.error(`Error fetching ToDo items: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return [todoItems];
};

export default useGet;
