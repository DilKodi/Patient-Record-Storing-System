import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PatientList.css";
import Swal from 'sweetalert2';


function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  // Fetch all patients
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/patients")
      .then(response => {
        console.log("API Response:", response.data); // Log the response
        // Extract patients array from the response
        setPatients(response.data.patients); // Update the state with the patients array
      })
      .catch(error => {
        console.error("Error fetching patients:", error); // Log any errors
      });
  }, []);
  

// Delete a patient

function deletePatient(id) {
  if (window.confirm("Are you sure you want to delete this patient?")) {
    axios
      .delete(`http://localhost:8000/api/delete-patient/${id}`)
      .then(() => {
        setPatients(patients.filter((patient) => patient.id !== id));
        // Show SweetAlert for successful deletion
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The patient record has been deleted successfully.',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        console.error(error);
        // Show SweetAlert for error in deletion
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error deleting the patient record.',
          confirmButtonText: 'Try Again'
        });
      });
  }
}


  return (
    <div className="patient-list-container">
      <h1>Patient Records</h1>
      <button className="add-patient-btn" onClick={() => navigate("/add")}>
        Add New Patient
      </button>
      <div className="table-container">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Date Added</th>
              <th>Diagnosis</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(patients) && patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.contact_no}</td>
                  <td>{patient.address}</td>
                  <td>{patient.date_added}</td>
                  <td>{patient.diagnosis}</td>
                  <td>{patient.status}</td>
                  <td>
                    <button onClick={() => navigate(`/view/${patient.id}`)}>View</button>
                    <button onClick={() => navigate(`/update/${patient.id}`)}>Update</button>
                    <button onClick={() => deletePatient(patient.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No patient records available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;
