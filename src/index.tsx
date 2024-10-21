import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export default function App() {
  return <div>setting up project structure</div>;
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
