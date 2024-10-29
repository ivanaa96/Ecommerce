import React from 'react';

import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="loader-container">
      <div className="loader" aria-label="loading"></div>
    </div>
  );
}

export default Loader;
