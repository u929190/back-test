import React, { useState } from 'react';
import axios from 'axios';

import ResponseTable from '../components/ResponseTable';

const ConvenerPage = () => {
  const [eventId, setEventId] = useState('');
  const [updateData, setUpdateData] = useState({ eventid: '', oldjudgeid: '', newjudgeid: '', category: '' });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  const handleUpdateDataChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleGetAllConveners = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3001/api/conveners/event/${eventId}/conveners`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleAppointSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/api/conveners/appoint/${eventId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/conveners/updateConvener', updateData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Convener Endpoints</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Get All Conveners for an Event</h2>
          <form onSubmit={handleGetAllConveners} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" name="eventId" placeholder="Event ID" onChange={handleEventIdChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Get Conveners</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Automate Convener Appointment</h2>
          <form onSubmit={handleAppointSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" name="eventId" placeholder="Event ID" onChange={handleEventIdChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Appoint</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Update Convener Category</h2>
          <form onSubmit={handleUpdateSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" name="eventid" placeholder="Event ID" onChange={handleUpdateDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input type="text" name="oldjudgeid" placeholder="Old Judge ID" onChange={handleUpdateDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input type="text" name="newjudgeid" placeholder="New Judge ID" onChange={handleUpdateDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input type="text" name="category" placeholder="Category" onChange={handleUpdateDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Update</button>
          </form>
        </div>
      </div>

      <ResponseTable data={response} />
      {error && <pre className="bg-red-100 p-4 rounded text-red-700">{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
};

export default ConvenerPage;