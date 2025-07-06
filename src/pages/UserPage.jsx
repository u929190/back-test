
import React, { useState } from 'react';
import axios from 'axios';

import ResponseTable from '../components/ResponseTable';

const UserPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [learnerData, setLearnerData] = useState({ firstName: '', lastName: '', email: '', contact: '', altContact: '', dob: '', gender: '', race: '', disabilityType: '', password: '', province: '', region: '', schoolName: '', grade: '', disabilityDescription: '', Role: 'learner' });
  const [teacherData, setTeacherData] = useState({ firstName: '', lastName: '', email: '', contact: '', altContact: '', dob: '', gender: '', race: '', password: '', disability: '', province: '', region: '', schoolName: '', Role: 'teacher' });
  const [judgeData, setJudgeData] = useState({ title: '', firstName: '', lastName: '', email: '', password: '', contact: '', altContact: '', dob: '', gender: '', race: '', institution: '', qualification: '', province: '', region: '', years: '', expoForums: '', judgeExperience: '', categories: '', Role: 'judge' });
  const [learnerPhoto, setLearnerPhoto] = useState(null);
  const [teacherPhoto, setTeacherPhoto] = useState(null);
  const [judgePhoto, setJudgePhoto] = useState(null);
  const [judgeDocument, setJudgeDocument] = useState(null);
  // File to base64 helper
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleLearnerPhotoChange = (e) => setLearnerPhoto(e.target.files[0]);
  const handleTeacherPhotoChange = (e) => setTeacherPhoto(e.target.files[0]);
  const handleJudgePhotoChange = (e) => setJudgePhoto(e.target.files[0]);
  const handleJudgeDocumentChange = (e) => setJudgeDocument(e.target.files[0]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLearnerChange = (e) => {
    setLearnerData({ ...learnerData, [e.target.name]: e.target.value });
  };

  const handleTeacherChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  const handleJudgeChange = (e) => {
    setJudgeData({ ...judgeData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/user/login', loginData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleLearnerSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = '';
      if (learnerPhoto) {
        const base64 = await fileToBase64(learnerPhoto);
        const photoRes = await axios.post('http://localhost:3001/api/upload-photo', { base64 });
        photoUrl = photoRes.data.url || '';
      }
      const res = await axios.post('http://localhost:3001/api/user/register/learner', { ...learnerData, photo: photoUrl });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = '';
      if (teacherPhoto) {
        const base64 = await fileToBase64(teacherPhoto);
        const photoRes = await axios.post('http://localhost:3001/api/upload-photo', { base64 });
        photoUrl = photoRes.data.url || '';
      }
      const res = await axios.post('http://localhost:3001/api/user/register/teacher', { ...teacherData, photo: photoUrl });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  const handleJudgeSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = '';
      let documentUrl = '';
      if (judgePhoto) {
        const base64 = await fileToBase64(judgePhoto);
        const photoRes = await axios.post('http://localhost:3001/api/upload-photo', { base64 });
        photoUrl = photoRes.data.url || '';
      }
      if (judgeDocument) {
        const base64 = await fileToBase64(judgeDocument);
        const docRes = await axios.post('http://localhost:3001/api/upload-document', { base64 });
        documentUrl = docRes.data.url || '';
      }
      const res = await axios.post('http://localhost:3001/api/user/register/judge', { ...judgeData, photo: photoUrl, document: documentUrl });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Endpoints</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Login</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <input type="email" name="email" placeholder="Email" onChange={handleLoginChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Login</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Register Learner</h2>
          <form onSubmit={handleLearnerSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            {Object.keys(learnerData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key} onChange={handleLearnerChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            ))}
            <label className="block text-sm font-medium text-gray-700">Learner Photo</label>
            <input type="file" accept="image/*" onChange={handleLearnerPhotoChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Register Learner</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Register Teacher</h2>
          <form onSubmit={handleTeacherSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            {Object.keys(teacherData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key} onChange={handleTeacherChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            ))}
            <label className="block text-sm font-medium text-gray-700">Teacher Photo</label>
            <input type="file" accept="image/*" onChange={handleTeacherPhotoChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            <button type="submit" className="w-full p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors">Register Teacher</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Register Judge</h2>
          <form onSubmit={handleJudgeSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            {Object.keys(judgeData).map((key) => (
              <input key={key} type="text" name={key} placeholder={key} onChange={handleJudgeChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            ))}
            <label className="block text-sm font-medium text-gray-700">Judge Photo</label>
            <input type="file" accept="image/*" onChange={handleJudgePhotoChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <label className="block text-sm font-medium text-gray-700">Judge Document</label>
            <input type="file" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" onChange={handleJudgeDocumentChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">Register Judge</button>
          </form>
        </div>
      </div>

      <ResponseTable data={response} />
      {error && <pre className="bg-red-100 p-4 rounded text-red-700">{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
};

export default UserPage;
