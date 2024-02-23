import './App.css';
import { useEffect, useState } from 'react';
import PlanetCard from './components/PlanetCard';
const baseURL = 'https://swapi.dev/api/planets';

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    getData(page);
  }, [page]);

  const getData = async (page = 1) => {
    try {
      setIsLoading(true);
      let res = await fetch(`${baseURL}/?format=json&page=${page}`);
      res = await res.json();
      setData(res.results);
      setTotalPages(res.count);
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
  return (
    <div className="App">
      <h1>Planets Directory</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {(data && data.length > 0) ? data?.map((ele, index) =>
          <PlanetCard key={index} {...ele} />
        ) : null}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <button style={{ borderRadius: '5px', padding: '10px 14px' }} disabled={page <= 1} onClick={() => handlePageChange(-1)}>PRE</button>
        <button style={{ borderRadius: '5px', padding: '6px 10px', fontSize: '22px', color: 'red' }} disabled>{page}</button>
        <button style={{ borderRadius: '5px', padding: '10px' }} disabled={page >= Math.floor(totalPages / 10)} onClick={() => handlePageChange(1)}>NEXT</button>
      </div>
    </div>
  );
}

export default App;
