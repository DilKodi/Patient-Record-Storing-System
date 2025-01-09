import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import './AddPatient.css';

function AddPatient() {
  const [name, setName] = useState(""); 
  const [age, setAge] = useState("");
  const [contact_no, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [date_added, setDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the auth token from localStorage
    const token = localStorage.getItem("auth_token");

    axios
      .post(
        "http://localhost:8000/api/add-patient",
        {
          name,
          age: parseInt(age, 10),
          contact_no,
          address,
          date_added,
          diagnosis,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the auth token to the Authorization header
          },
        }
      )
      .then((res) => {
        swal("Success", "Patient added successfully!", "success").then(() => {
          navigate("/patientlist");
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          swal("Unauthorized", "You are not authorized. Please log in again.", "error");
          navigate("/login");
        } else {
          swal("Error", "Failed to add the patient. Please try again!", "error");
        }
      });
  };

  return (
    <div className="addpatient-container">
      <h1>Add Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>Contact Number</label>
          <input type="number" value={contact_no} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Date Added</label>
          <input type="date" value={date_added} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Diagnosis</label>
          <input type="text" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
        </div>
        <div>
          <label>Status</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required /> 
        </div>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;
