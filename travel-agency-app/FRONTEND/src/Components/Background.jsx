import React from 'react';
import Background2 from '../Assets/Background2.jpg';

function Background() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <img 
        src={Background2} 
        alt="Travel Background" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
    </div>
  );
}

export default Background;
