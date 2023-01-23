import React from 'react';
import './Unauthorized.css';

export default function Unauthorized() {
  return (
    <div className="unauthorized">
      <h1 className="unauthorized__title">Unauthorized</h1>
      <p className="unauthorized__message">
        You are not authorized to view this page. Please log in or contact the administrator for access.
      </p>
    </div>
  );
}
