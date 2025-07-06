
import React, { useState } from 'react';
import axios from 'axios';

import ResponseTable from '../components/ResponseTable';

const UploadPage = () => {
  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);

    try {
      const res = await axios.post('http://localhost:3001/api/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('document', document);

    try {
      const res = await axios.post('http://localhost:3001/api/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Endpoints</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Upload Photo</h2>
          <form onSubmit={handlePhotoUpload} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="file" onChange={handlePhotoChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Upload Photo</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Upload Document</h2>
          <form onSubmit={handleDocumentUpload} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="file" onChange={handleDocumentChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Upload Document</button>
          </form>
        </div>
      </div>

      <ResponseTable data={response} />
      {error && <pre className="bg-red-100 p-4 rounded text-red-700">{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
};

export default UploadPage;
