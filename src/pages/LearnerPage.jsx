import React, { useState } from 'react';
import axios from 'axios';

import ResponseTable from '../components/ResponseTable';

const LearnerPage = () => {
  const [learnerData, setLearnerData] = useState({ userid: '', grade: '', disability: '', disabilityinfo: '', schoolid: '' });
  const [learnerId, setLearnerId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleLearnerDataChange = (e) => {
    setLearnerData({ ...learnerData, [e.target.name]: e.target.value });
  };

  const handleLearnerIdChange = (e) => {
    setLearnerId(e.target.value);
  };

  const handleGetAllLearners = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/learners');
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleGetLearnerById = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/learners/${learnerId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleCreateLearner = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/learners', learnerData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleUpdateLearner = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/learners/${learnerId}`, learnerData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleDeleteLearner = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/learners/${learnerId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Learner Endpoints</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Get All Learners</h2>
          <button onClick={handleGetAllLearners} className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Get Learners</button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Learner by ID</h2>
          <input type="text" placeholder="Learner ID" onChange={handleLearnerIdChange} className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <button onClick={handleGetLearnerById} className="w-full p-3 bg-yellow-500 text-white rounded-md mb-2 hover:bg-yellow-600 transition-colors">Get Learner by ID</button>
          <button onClick={handleDeleteLearner} className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Delete Learner</button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Create Learner</h2>
          <form onSubmit={handleCreateLearner} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            {Object.keys(learnerData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key.toLowerCase()} onChange={handleLearnerDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            ))}
            <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">Create Learner</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Update Learner</h2>
          <form onSubmit={handleUpdateLearner} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" placeholder="Learner ID" onChange={handleLearnerIdChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            {Object.keys(learnerData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key.toLowerCase()} onChange={handleLearnerDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            ))}
            <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Update Learner</button>
          </form>
        </div>
      </div>

      <ResponseTable data={response} />
      {error && <pre className="bg-red-100 p-4 rounded text-red-700">{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
};

export default LearnerPage;
