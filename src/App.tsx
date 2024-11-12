import React from 'react';
import Player from './components/Player';
import './winamp.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Player />
    </div>
  );
}

export default App;