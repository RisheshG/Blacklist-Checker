// src/components/DomainForm.js
import React, { useState } from 'react';

const DomainForm = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value) => {
    // Regular expression for domain name validation
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // Regular expression for IP address validation
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (domainPattern.test(value) || ipPattern.test(value)) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(input)) {
      setError('');
      onSubmit(input);
    } else {
      setError('Invalid input. Please enter a valid domain name or IP address.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter domain name or IP address"
      />
      <button type="submit">Check Blacklist</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default DomainForm;
