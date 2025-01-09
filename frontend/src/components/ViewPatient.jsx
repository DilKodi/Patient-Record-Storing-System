import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewPatient.css";

function ViewPatient() {
  const { id } = useParams(); // Get patient ID from the URL
  const navigate = useNavigate(); // To navigate back to the list
  const [patient, setPatient] = useState(null); // State to store patient details

  // Fetch the patient details by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/patient/${id}`)
      .then((response) => {
        console.log("Fetched patient data:", response.data); // Log the response
        setPatient(response.data.patient); // Access the nested patient object
      })
      .catch((error) => {
        console.error("There was an error fetching the patient details:", error);
      });
  }, [id]);

  // Back button click handler
  const handleBack = () => {
    navigate("/patientlist"); // Redirect to the patients list page
  };

  // Render loading or error message if patient is not found
  if (!patient) {
    return <div>Loading...</div>; // You can replace this with a spinner if needed
  }

  return (
    <div className="view-patient-container">
      <h1>Patient Details</h1>
      <div className="patient-info">
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Contact Number:</strong> {patient.contact_no}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>Date Added:</strong> {patient.date_added}</p>
        <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
        <p><strong>Status:</strong> {patient.status}</p>
      </div>
      <button className="back-btn" onClick={handleBack}>Back to Patient List</button>
    </div>
  );
}

export default ViewPatient;
