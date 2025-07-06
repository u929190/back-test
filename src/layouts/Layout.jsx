import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">API Tester</h1>
        </div>
        <ul className="p-2">
          <li><Link to="/" className="flex items-center p-3 text-gray-600 hover:bg-gray-200 rounded-md"><span className="material-icons mr-3">home</span>Home</Link></li>
          <li><Link to="/user" className="flex items-center p-3 text-gray-600 hover:bg-gray-200 rounded-md"><span className="material-icons mr-3">person</span>User</Link></li>
          <li><Link to="/convener" className="flex items-center p-3 text-gray-600 hover:bg-gray-200 rounded-md"><span className="material-icons mr-3">group</span>Convener</Link></li>
          <li><Link to="/event" className="flex items-center p-3 text-gray-600 hover:bg-gray-200 rounded-md"><span className="material-icons mr-3">event</span>Event</Link></li>
          <li><Link to="/school" className="flex items-center p-3 text-gray-600 hover:bg-gray-200 rounded-md"><span className="material-icons mr-3">school</span>School</Link></li>
          <li><Link to="/upload" className="flex items-center p-3 text-gray-600 hover:bg-gray-200 rounded-md"><span className="material-icons mr-3">cloud_upload</span>Upload</Link></li>
          <li><Link to="/project" className="flex items-center p-3 text-gray-600 hover:bg-gray-200 rounded-md"><span className="material-icons mr-3">assignment</span>Project</Link></li>
          <li><Link to="/learner" className="flex items-center p-3 text-gray-600 hover:bg-gray-200 rounded-md"><span className="material-icons mr-3">face</span>Learner</Link></li>
        </ul>
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;