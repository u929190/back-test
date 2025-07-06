import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ConvenerPage from './pages/ConvenerPage';
import EventPage from './pages/EventPage';
import SchoolPage from './pages/SchoolPage';
import UploadPage from './pages/UploadPage';
import ProjectPage from './pages/ProjectPage';
import LearnerPage from './pages/LearnerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="convener" element={<ConvenerPage />} />
          <Route path="event" element={<EventPage />} />
          <Route path="school" element={<SchoolPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="learner" element={<LearnerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;