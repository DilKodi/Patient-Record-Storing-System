<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use App\Events\PatientUpdated;

class PatientController extends Controller
{
    //add new patient
    public function addPatient(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'age' => 'required|integer',
            'contact_no' => 'required|string',
            'address' => 'required|string',
            'date_added' => 'required|date',
            'diagnosis' => 'required|string',
            'status' => 'required|string',
        ]);

        $patient = new Patient;
        $patient->name = $request->name;
        $patient->age = $request->age;
        $patient->contact_no = $request->contact_no;
        $patient->address = $request->address;
        $patient->date_added = $request->date_added;
        $patient->diagnosis = $request->diagnosis;
        $patient->status = $request->status;
        $patient->save();

        return response()->json([
            'message' => 'Patient added successfully',
            'patient' => $patient
        ], 201);
    }

    public function updatePatient(Request $request, $id)
{
    $patient = Patient::find($id);

    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }

    // Validate the input fields (you can add more validation rules if needed)
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'age' => 'required|integer',
        'contact_no' => 'required|string',
        'address' => 'required|string',
        'date_added' => 'required|date',
        'diagnosis' => 'required|string',
        'status' => 'required|string',
    ]);

    // Update the patient record
    $patient->update($validatedData);

    // Broadcast the patient update event
    event(new PatientUpdated($patient));

    return response()->json(['message' => 'Patient updated successfully']);
}


    //delete patient
    public function deletePatient($id)
    {
        $patient = Patient::find($id);
        $patient->delete();

        return response()->json([
            'message' => 'Patient deleted successfully'
        ], 200);
    }

    //get all patients
    public function getPatients()
    {
        $patients = Patient::all();

        return response()->json([
            'patients' => $patients
        ], 200);
    }

    //get single patient
    public function getPatient($id)
    {
        $patient = Patient::find($id);

        return response()->json([
            'patient' => $patient
        ], 200);
    }
}
