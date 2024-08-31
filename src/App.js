// src/App.js
import React, { useState } from 'react';
import DomainForm from './components/DomainForm';
import BlacklistTable from './components/BlacklistTable';
import fetchBlacklistData from './utils/fetchBlacklistData';
import './App.css';

function App() {
  const [results, setResults] = useState([]);

  const handleDomainSubmit = async (domain) => {
    const blacklistResults = await fetchBlacklistData(domain);
    setResults(blacklistResults);
  };

  return (
    <div className="App">
      <h1>Blacklist Checker</h1>
      <DomainForm onSubmit={handleDomainSubmit} />
      <BlacklistTable results={results} />
    </div>
  );
}

export default App;
