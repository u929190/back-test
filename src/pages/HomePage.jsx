import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">API Tester</h1>
        <p className="text-lg text-gray-600">Select an endpoint from the navigation to get started.</p>
      </div>
    </div>
  );
};

export default HomePage;