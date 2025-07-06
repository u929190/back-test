import React from 'react';

const ResponseTable = ({ data }) => {
  if (!data) return null;

  const renderTable = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return <p>No data to display.</p>;
    }

    const headers = Object.keys(items[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              {headers.map((header) => (
                <th key={header} className="py-2 px-4 border-b">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {headers.map((header) => (
                  <td key={header} className="py-2 px-4 border-b">{typeof item[header] === 'object' ? JSON.stringify(item[header]) : item[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Response</h2>
      {Array.isArray(data) ? renderTable(data) : <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default ResponseTable;
