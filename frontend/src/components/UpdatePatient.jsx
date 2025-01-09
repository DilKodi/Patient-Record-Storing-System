import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  
import "./UpdatePatient.css";

function UpdatePatient() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    contact_no: "",
    address: "",
    date_added: "",
    diagnosis: "",
    status: "",
  });
  const [error, setError] = useState(null);

  // Function to format date from dd.MM.yyyy to yyyy-MM-dd
  function formatDateForInput(date) {
    if (!date || !date.includes(".")) {
      // Return an empty string if date is undefined or not in the expected format
      return "";
    }
    const [day, month, year] = date.split(".");
    return `${year}-${month}-${day}`;
  }

  // Function to revert date from yyyy-MM-dd to dd.MM.yyyy
  function revertDateForBackend(date) {
    if (!date || !date.includes("-")) {
      // Return an empty string if date is undefined or not in the expected format
      return "";
    }
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  }

  // Fetch patient details by ID
  useEffect(() => {
    console.log("Fetching patient details for ID:", id);
    axios
      .get(`http://localhost:8000/api/patient/${id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data.patient) {
          const fetchedPatient = response.data.patient;

          // Format date_added for the input field
          fetchedPatient.date_added = formatDateForInput(fetchedPatient.date_added);

          setPatient(fetchedPatient);
        } else {
          setError("Invalid API response. Please check the backend.");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching patient details:", error);
        setError("Failed to fetch patient details. Please try again.");
      });
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value || "", // Prevent undefined values
    }));
  };

  // Handle form submission (update patient details)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Revert date_added to dd.MM.yyyy before submitting
    const updatedPatient = {
      ...patient,
      date_added: revertDateForBackend(patient.date_added),
    };

    axios
      .put(`http://localhost:8000/api/update-patient/${id}`, updatedPatient)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Patient details updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(`/patientlist`); 
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "There was an issue updating the patient details.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        console.error("There was an error updating the patient:", error);
      });
  };

  return (
    <div className="update-patient-container">
      <h1>Update Patient Details</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={patient.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={patient.age || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact_no"
            value={patient.contact_no || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={patient.address || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date Added:</label>
          <input
            type="date"
            name="date_added"
            value={patient.date_added || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Diagnosis:</label>
          <input
            type="text"
            name="diagnosis"
            value={patient.diagnosis || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={patient.status || "Normal"}
            onChange={handleChange}
          >
            <option value="Normal">Normal</option>
            <option value="Critical">Critical</option>
            <option value="Chronic">Chronic</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UpdatePatient;
