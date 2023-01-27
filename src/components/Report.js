import React, { useState, useMemo, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

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
    <button onClick={handleDownload}>Download CSV</button>
    {
        jsonData && jsonData.map((item, index) => (
            <div key={index}>
                <p>Number of movies</p><p>{item.movies}</p>
                <p>Number of users</p><p>{item.users}</p>
                <p>Number of comments</p><p>{item.comments}</p>
                <p>most active user</p><p>{item.best_user}</p>
                <p>best rated movie</p><p>{item.best_movie}</p>
                <p>Number of actors</p><p>{item.actors}</p>
                <p>Number of directors</p><p>{item.directors}</p>
                <p>Number of genres</p><p>{item.genres}</p>
            </div>
        ))
    }
    </>
  );
}

export default Report;