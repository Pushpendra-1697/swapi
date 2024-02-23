import './App.css';
import { useEffect, useState } from 'react';
const baseURL = 'https://swapi.dev/api/planets';

const totalPages = 6;
function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    getData(page);
  }, [page]);

  const getData = async (page = 1) => {
    try {
      setIsLoading(true);
      let res = await fetch(`${baseURL}/?format=json&page=${page}`);
      res = await res.json();
      setData(res.results);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  };
  const handlePageChange = (val) => {
    const value = page + val;
    setPage(value);
  };

  if (isLoading) {
    return <h1>Loading...</h1>
  };
  if (isError) {
    return <h1>Errror....</h1>
  };
  console.log(data);
  return (
    <div className="App">

      <div>
        <button disabled={page <= 1} onClick={() => handlePageChange(-1)}>PRE</button>
        <button disabled>{page}</button>
        <button disabled={page >= totalPages} onClick={() => handlePageChange(1)}>NEXT</button>
      </div>
    </div>
  );
}

export default App;
