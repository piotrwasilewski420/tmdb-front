import React, { useState, useMemo, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import NavProfile from '../features/user/NavProfile';

const fileName = "people.csv";

function Report() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    axiosInstance.get('/admin/report')
      .then(res => setJsonData(res.data))
  }, []);

  const csvData = useMemo(() => {
    if (!jsonData) return null;
    const keys = Object.keys(jsonData[0]);
    const rows = jsonData.map(row => keys.map(key => row[key]).join(','));
    const csv = [keys.join(','), ...rows].join('\n');
    return csv;
  }, [jsonData]);

  const handleDownload = () => {
    if (!csvData) return;
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <NavProfile />
      <div className=' flex justify-center mt-20'>
        <div className='flex flex-col items-center w-1/3 bg-white rounded-md shadow-card p-4'>
          <h1 className='text-4xl font-semibold'>Report</h1>
          <button className='bg-gray-500 text-white text-lg font-bold hover:cursor-pointer hover:bg-gray-800 duration-200 rounded p-2 mt-8' onClick={handleDownload}>Download CSV</button>
          {
              jsonData && jsonData.map((item, index) => (
                  <div className='flex flex-col items-center mt-8' key={index}>
                      <p className='text-2xl'>Number of movies</p><p className='mb-2 text-lg font-semibold'>{item.movies}</p>
                      <p className='text-2xl'>Number of users</p><p className='mb-2 text-lg font-semibold'>{item.users}</p>
                      <p className='text-2xl'>Number of comments</p><p className='mb-2 text-lg font-semibold'>{item.comments}</p>
                      <p className='text-2xl'>most active user</p><p className='mb-2 text-lg font-semibold'>{item.best_user}</p>
                      <p className='text-2xl'>best rated movie</p><p className='mb-2 text-lg font-semibold'>{item.best_movie}</p>
                      <p className='text-2xl'>Number of actors</p><p className='mb-2 text-lg font-semibold'>{item.actors}</p>
                      <p className='text-2xl'>Number of directors</p><p className='mb-2 text-lg font-semibold'>{item.directors}</p>
                      <p className='text-2xl'>Number of genres</p><p className='mb-2 text-lg font-semibold'>{item.genres}</p>
                  </div>
              ))
          }
        </div>
      </div>
    </>
  );
}

export default Report;