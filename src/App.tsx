import React from 'react';
import Header from './components/Header';
import FolderChooser from './components/FolderChooser';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        <FolderChooser />
      </main>
    </div>
  );
};

export default App;