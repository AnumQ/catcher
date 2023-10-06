import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getData() {
  const response: AxiosResponse<Post> = await axios.get(
    "https://jsonplaceholder.typicode.com/psts/1"
  );

  // Check the status code to ensure a successful response
  if (response.status === 200) {
    //  setData(response.data);
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

function App() {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(new Error(err.message));
        } else {
          setError(new Error("Unknown error occured"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>An error occurred: {error.message}</p>
      </div>
    );
  }

  if (data) {
    return (
      <div>
        <h1>Data:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  return null;
}

export default App;
