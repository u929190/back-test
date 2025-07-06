
import React, { useState } from 'react';
import axios from 'axios';

import ResponseTable from '../components/ResponseTable';

const ProjectPage = () => {
  const [projectData, setProjectData] = useState({ schoolid: '', learnerid: '', projectname: '', description: '', category: '', status: '', badge: '', ethicalstatus: '', eventid: '' });
  const [supportingDocument, setSupportingDocument] = useState(null);
  const [projectId, setProjectId] = useState('');
  const [eventId, setEventId] = useState('');
  const [judgeId, setJudgeId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProjectDataChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };
  const handleSupportingDocumentChange = (e) => {
    setSupportingDocument(e.target.files[0]);
  };
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // send full data URL
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleProjectIdChange = (e) => {
    setProjectId(e.target.value);
  };

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  const handleJudgeIdChange = (e) => {
    setJudgeId(e.target.value);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let supportingDocumentURL = '';
      if (supportingDocument) {
        const base64 = await fileToBase64(supportingDocument);
        const docRes = await axios.post('http://localhost:3001/api/upload-document', { base64 });
        supportingDocumentURL = docRes.data.url || '';
      }
      const res = await axios.post('http://localhost:3001/api/projects', { ...projectData, supportingdocument: supportingDocumentURL, timeregistered: new Date().toISOString() }); // get current time
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllProjects = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/projects');
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleGetProjectById = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/projects/${projectId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/projects/${projectId}`, projectData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/projects/${projectId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleAllocateProjects = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/api/projects/allocate/${eventId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleGetAllocatedProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/projects/allocated/${judgeId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Endpoints</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Create Project</h2>
          <form onSubmit={handleCreateProject} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            {Object.keys(projectData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key} onChange={handleProjectDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            ))}
            <label className="block text-sm font-medium text-gray-700">Supporting Document</label>
            <input type="file" onChange={handleSupportingDocumentChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Create Project</button>
          </form>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Get All Projects</h2>
          <button onClick={handleGetAllProjects} className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Get All Projects</button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Project by ID</h2>
          <input type="text" placeholder="Project ID" onChange={handleProjectIdChange} className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <button onClick={handleGetProjectById} className="w-full p-3 bg-yellow-500 text-white rounded-md mb-2 hover:bg-yellow-600 transition-colors">Get Project by ID</button>
          <button onClick={handleDeleteProject} className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Delete Project</button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Update Project</h2>
          <form onSubmit={handleUpdateProject} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" placeholder="Project ID" onChange={handleProjectIdChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            {Object.keys(projectData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key} onChange={handleProjectDataChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            ))}
            <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">Update Project</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Allocate Projects</h2>
          <form onSubmit={handleAllocateProjects} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="text" placeholder="Event ID" onChange={handleEventIdChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Allocate Projects</button>
          </form>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Get Allocated Projects</h2>
          <input type="text" placeholder="Judge ID" onChange={handleJudgeIdChange} className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500" />
          <button onClick={handleGetAllocatedProjects} className="w-full p-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">Get Allocated Projects</button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center my-8">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      )}
      <ResponseTable data={response} />
      {error && <pre className="bg-red-100 p-4 rounded text-red-700">{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
};

export default ProjectPage;
