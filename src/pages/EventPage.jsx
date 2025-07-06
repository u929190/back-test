
import React, { useState } from 'react';
import axios from 'axios';

import ResponseTable from '../components/ResponseTable';

const EventPage = () => {
  const [eventData, setEventData] = useState({ type: '', name: '', startdate: '', enddate: '', regopendate: '', regclosedate: '', starttime: '', endtime: '', region: '', venue: '' });
  const [eventId, setEventId] = useState('');
  const [attendeeData, setAttendeeData] = useState({ eventId: '', userId: '' });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleEventDataChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  const handleAttendeeDataChange = (e) => {
    setAttendeeData({ ...attendeeData, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/events', eventData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleGetAllEvents = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/events');
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/events/${eventId}`, eventData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/events/${eventId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleGetEventById = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/events/${eventId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleAttendEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/api/events/attend`, attendeeData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleGetEventAttendees = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/events/${eventId}/attendees`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Endpoints</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Create Event</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            {Object.keys(eventData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key} onChange={handleEventDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            ))}
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Create Event</button>
          </form>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Get All Events</h2>
          <button onClick={handleGetAllEvents} className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Get All Events</button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Event by ID</h2>
          <input type="text" placeholder="Event ID" onChange={handleEventIdChange} className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <button onClick={handleGetEventById} className="w-full p-3 bg-yellow-500 text-white rounded-md mb-2 hover:bg-yellow-600 transition-colors">Get Event by ID</button>
          <button onClick={handleDeleteEvent} className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Delete Event</button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Update Event</h2>
          <form onSubmit={handleUpdateEvent} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" placeholder="Event ID" onChange={handleEventIdChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            {Object.keys(eventData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key} onChange={handleEventDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            ))}
            <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">Update Event</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Attend Event</h2>
          <form onSubmit={handleAttendEvent} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" placeholder="Event ID" onChange={handleAttendeeDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" name="userId" placeholder="User ID" onChange={handleAttendeeDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Attend Event</button>
          </form>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Get Event Attendees</h2>
          <input type="text" placeholder="Event ID" onChange={handleEventIdChange} className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500" />
          <button onClick={handleGetEventAttendees} className="w-full p-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">Get Attendees</button>
        </div>
      </div>

      <ResponseTable data={response} />
      {error && <pre className="bg-red-100 p-4 rounded text-red-700">{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
};

export default EventPage;
