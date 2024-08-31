// src/components/BlacklistTable.js
import React from 'react';

const BlacklistTable = ({ results }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Blacklist</th>
          <th>Status</th>
          <th>Reason</th>
          <th>TTL</th>
          <th>Response Time</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.blacklist}</td>
            <td>{result.status}</td>
            <td>{result.reason || 'N/A'}</td>
            <td>{result.ttl || 'N/A'}</td>
            <td>{result.responseTime || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlacklistTable;
