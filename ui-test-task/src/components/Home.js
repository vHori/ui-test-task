import React, { useState, useEffect } from 'react';
import Banks from './Banks';
import Pagination from './Pagination';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Home = () => {
  let { pageNumber } = useParams();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [banksPerPage, setBanksPerPage] = useState(3);

  useEffect(() => {
    const fetchBanks = async () => {
      const res = await axios.get('https://2c2p.mocklab.io/v1/banks');
      setBanks(res.data);
      setLoading(false);
    };
    fetchBanks();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const indexOfLastBank = currentPage * banksPerPage;
  const indexOfFirstBank = indexOfLastBank - banksPerPage;
  const currentBanks = Object.values(banks)[0].slice(indexOfFirstBank, indexOfLastBank);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
      <div className='container mt-5'>
        <h1 className='text-primary mb-3'>UI Test</h1>
        <a className='button' href='/v1/banks/create'>Create Bank</a>
        <Banks banks={currentBanks} loading={loading} />
        <Pagination
          banksPerPage={banksPerPage}
          totalBanks={Object.values(banks)[0].length}
          paginate={paginate}
        />
      </div>
  );
};

export default Home;