import React from 'react';
import './Welcome.css'; 
import { Link } from "react-router-dom";

function Welcome() {
  // Retrieve the doctor's name from local storage
  const doctorName = localStorage.getItem('auth_fname');

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Hello, Dr. {doctorName}</h1>
      </header>
      <main className="welcome-main">
        <p>Welcome to the Patient Record System!</p>
        <p>Manage your patients' records efficiently and securely.</p>
        <div className="button-group">
          <Link to="/add">
            <button className="action-button">Add New Patient</button>
          </Link>
          <Link to="/patientlist">
            <button className="action-button">View Patients</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Welcome;
