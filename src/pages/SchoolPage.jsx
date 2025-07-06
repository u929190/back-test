
import React, { useState } from 'react';
import axios from 'axios';

import ResponseTable from '../components/ResponseTable';

const SchoolPage = () => {
  const [schoolData, setSchoolData] = useState({ schoolname: '', region: '', district: '', province: '' });
  const [schoolId, setSchoolId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSchoolDataChange = (e) => {
    setSchoolData({ ...schoolData, [e.target.name]: e.target.value });
  };

  const handleSchoolIdChange = (e) => {
    setSchoolId(e.target.value);
  };

  const handleGetAllSchools = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/schools/names');
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleGetSchools = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/schools');
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleGetSchoolById = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/schools/${schoolId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleCreateSchool = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/schools', schoolData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleUpdateSchool = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/schools/${schoolId}`, schoolData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleDeleteSchool = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/schools/${schoolId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">School Endpoints</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Get All School Names</h2>
          <button onClick={handleGetAllSchools} className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Get Names</button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Get All Schools</h2>
          <button onClick={handleGetSchools} className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Get Schools</button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">School by ID</h2>
          <input type="text" placeholder="School ID" onChange={handleSchoolIdChange} className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <button onClick={handleGetSchoolById} className="w-full p-3 bg-yellow-500 text-white rounded-md mb-2 hover:bg-yellow-600 transition-colors">Get School by ID</button>
          <button onClick={handleDeleteSchool} className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Delete School</button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Create School</h2>
          <form onSubmit={handleCreateSchool} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            {Object.keys(schoolData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key.toLowerCase()} onChange={handleSchoolDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            ))}
            <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">Create School</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Update School</h2>
          <form onSubmit={handleUpdateSchool} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" placeholder="School ID" onChange={handleSchoolIdChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            {Object.keys(schoolData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key.toLowerCase()} onChange={handleSchoolDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            ))}
            <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Update School</button>
          </form>
        </div>
      </div>

      <ResponseTable data={response} />
      {error && <pre className="bg-red-100 p-4 rounded text-red-700">{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
};

export default SchoolPage;
