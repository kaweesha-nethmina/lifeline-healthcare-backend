const supabase = require('../db');
const MedicalRecord = require('../models/MedicalRecord');

const medicalRecordModel = new MedicalRecord(supabase);

// Get doctor profile with user details including profile picture
const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.id;
    
    const { data, error } = await supabase
      .from('doctors')
      .select(`
        *,
        users (
          id,
          email,
          name,
          role,
          profile_picture_url,
          phone_number,
          date_of_birth,
          gender,
          address,
          emergency_contact,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', doctorId)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    
    // Restructure the response to include user details at the top level
    const formattedData = {
      id: data.id,
      user_id: data.user_id,
      specialty: data.specialty,
      qualification: data.qualification,
      schedule: data.schedule,
      location: data.location,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user: {
        id: data.users.id,
        email: data.users.email,
        name: data.users.name,
        role: data.users.role,
        profile_picture_url: data.users.profile_picture_url,
        phone_number: data.users.phone_number,
        date_of_birth: data.users.date_of_birth,
        gender: data.users.gender,
        address: data.users.address,
        emergency_contact: data.users.emergency_contact,
        created_at: data.users.created_at,
        updated_at: data.users.updated_at
      }
    };
    
    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { 
      specialty, 
      qualification, 
      schedule, 
      location,
      phone_number,
      date_of_birth,
      gender,
      address,
      emergency_contact
    } = req.body;
    
    // Update doctor-specific fields in the doctors table
    const doctorUpdateData = {
      specialty,
      qualification,
      schedule,
      updated_at: new Date()
    };
    
    // Add location to update data if provided
    if (location !== undefined) {
      doctorUpdateData.location = location;
    }

    const { data: doctorData, error: doctorError } = await supabase
      .from('doctors')
      .update(doctorUpdateData)
      .eq('user_id', doctorId)
      .select()
      .single();

    if (doctorError) return res.status(500).json({ error: doctorError.message });
    
    // Also update user fields in the users table
    const userUpdateData = {
      phone_number,
      date_of_birth,
      gender,
      address,
      emergency_contact,
      updated_at: new Date()
    };
    
    // Remove undefined fields
    Object.keys(userUpdateData).forEach(key => {
      if (userUpdateData[key] === undefined) {
        delete userUpdateData[key];
      }
    });
    
    // Update user profile with doctor information
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update(userUpdateData)
      .eq('id', doctorId)
      .select()
      .single();
      
    if (userError) {
      console.error('Error updating user profile:', userError);
      // Continue with response even if user update fails
    }
    
    res.status(200).json({ 
      message: 'Profile updated successfully', 
      doctorData,
      userData: userData || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View patient medical records
const getPatientMedicalRecords = async (req, res) => {
  try {
    const patientId = req.params.id;
    const doctorId = req.user.id;
    
    console.log(`Doctor (user_id: ${doctorId}) trying to access patient (id: ${patientId}) medical records`);
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    
    console.log(`Doctor record found with id: ${doctor.id}`);

    // Verify that the patient has an appointment with this doctor
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctor.id)  // Use doctor.id, not doctorId
      .neq('status', 'cancelled');
      
    console.log(`Appointment query result:`, appointment);
    console.log(`Appointment query error:`, appointmentError);
      
    if (appointmentError) return res.status(500).json({ error: appointmentError.message });
    if (!appointment || appointment.length === 0) {
      return res.status(403).json({ error: 'Access denied. No appointment found with this patient.' });
    }

    const { data, error } = await supabase
      .from('medical_records')
      .select('*')
      .eq('patient_id', patientId)
      .order('record_date', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create medical record for patient
const createMedicalRecord = async (req, res) => {
  try {
    const patientId = req.params.id;
    const doctorId = req.user.id;
    const { diagnosis, treatment_plan, prescriptions } = req.body;
    
    console.log(`Doctor (user_id: ${doctorId}) trying to create medical record for patient (id: ${patientId})`);
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    
    console.log(`Doctor record found with id: ${doctor.id}`);

    // Verify that the patient has an appointment with this doctor
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctor.id)  // Use doctor.id, not doctorId
      .neq('status', 'cancelled');
      
    console.log(`Appointment query result:`, appointment);
    console.log(`Appointment query error:`, appointmentError);
      
    if (appointmentError) return res.status(500).json({ error: appointmentError.message });
    if (!appointment || appointment.length === 0) {
      return res.status(403).json({ error: 'Access denied. No appointment found with this patient.' });
    }

    const { data, error } = await supabase
      .from('medical_records')
      .insert([
        {
          patient_id: patientId,
          doctor_id: doctor.id,  // Use doctor.id, not doctorId
          diagnosis,
          treatment_plan,
          prescriptions
        }
      ])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    
    res.status(201).json({ message: 'Medical record created successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific medical record by ID
const getMedicalRecordById = async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const doctorId = req.user.id;
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    
    // Get the medical record
    const record = await medicalRecordModel.getMedicalRecordById(recordId);
    
    // Verify that this medical record belongs to a patient this doctor has treated
    // (i.e., there's an appointment between this doctor and the patient)
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', record.patient_id)
      .eq('doctor_id', doctor.id)
      .neq('status', 'cancelled');
      
    if (appointmentError) return res.status(500).json({ error: appointmentError.message });
    if (!appointment || appointment.length === 0) {
      return res.status(403).json({ error: 'Access denied. No appointment found with this patient.' });
    }
    
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a medical record
const updateMedicalRecord = async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const doctorId = req.user.id;
    const { diagnosis, treatment_plan, prescriptions } = req.body;
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    
    // Get the medical record to verify ownership
    const record = await medicalRecordModel.getMedicalRecordById(recordId);
    
    // Verify that this medical record belongs to a patient this doctor has treated
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', record.patient_id)
      .eq('doctor_id', doctor.id)
      .neq('status', 'cancelled');
      
    if (appointmentError) return res.status(500).json({ error: appointmentError.message });
    if (!appointment || appointment.length === 0) {
      return res.status(403).json({ error: 'Access denied. No appointment found with this patient.' });
    }
    
    // Prepare update data
    const updateData = {
      updated_at: new Date()
    };
    
    // Only include fields that are provided in the request
    if (diagnosis !== undefined) updateData.diagnosis = diagnosis;
    if (treatment_plan !== undefined) updateData.treatment_plan = treatment_plan;
    if (prescriptions !== undefined) updateData.prescriptions = prescriptions;
    
    const data = await medicalRecordModel.updateMedicalRecord(recordId, updateData);
    res.status(200).json({ message: 'Medical record updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a medical record
const deleteMedicalRecord = async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const doctorId = req.user.id;
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    
    // Get the medical record to verify ownership
    const record = await medicalRecordModel.getMedicalRecordById(recordId);
    
    // Verify that this medical record belongs to a patient this doctor has treated
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', record.patient_id)
      .eq('doctor_id', doctor.id)
      .neq('status', 'cancelled');
      
    if (appointmentError) return res.status(500).json({ error: appointmentError.message });
    if (!appointment || appointment.length === 0) {
      return res.status(403).json({ error: 'Access denied. No appointment found with this patient.' });
    }
    
    // First delete all prescriptions associated with this medical record
    await medicalRecordModel.deletePrescriptionByMedicalRecord(recordId);
    
    const data = await medicalRecordModel.deleteMedicalRecord(recordId);
    res.status(200).json({ message: 'Medical record deleted successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointment schedule
const getAppointmentSchedule = async (req, res) => {
  try {
    const doctorId = req.user.id;
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        patient_id,
        doctor_id,
        appointment_date,
        status,
        created_at,
        updated_at,
        patients (
          id,
          user_id,
          date_of_birth,
          gender,
          phone_number,
          address,
          insurance_details,
          medical_history,
          emergency_contact,
          users (
            id,
            email,
            name,
            role,
            profile_picture_url,
            phone_number,
            date_of_birth,
            gender,
            address,
            emergency_contact,
            created_at,
            updated_at
          )
        )
      `)
      .eq('doctor_id', doctor.id)  // Use doctor.id, not doctorId
      .order('appointment_date', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    
    // Format the response to include patient details with profile picture
    const formattedData = data.map(appointment => ({
      id: appointment.id,
      patient_id: appointment.patient_id,
      doctor_id: appointment.doctor_id,
      appointment_date: appointment.appointment_date,
      status: appointment.status,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
      patient: {
        id: appointment.patients?.id || null,
        user_id: appointment.patients?.user_id || null,
        name: appointment.patients?.users?.name || null,
        email: appointment.patients?.users?.email || null,
        date_of_birth: appointment.patients?.date_of_birth || null,
        gender: appointment.patients?.gender || null,
        phone_number: appointment.patients?.users?.phone_number || appointment.patients?.phone_number || null,
        address: appointment.patients?.users?.address || appointment.patients?.address || null,
        insurance_details: appointment.patients?.insurance_details || null,
        medical_history: appointment.patients?.medical_history || null,
        emergency_contact: appointment.patients?.users?.emergency_contact || appointment.patients?.emergency_contact || null,
        profile_picture_url: appointment.patients?.users?.profile_picture_url || null,
        created_at: appointment.patients?.users?.created_at || appointment.patients?.created_at || null,
        updated_at: appointment.patients?.users?.updated_at || appointment.patients?.updated_at || null
      }
    }));
    
    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all patients who have booked appointments with this doctor
const getDoctorPatients = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorUserId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    // Get all patients who have appointments with this doctor
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        patients (
          id,
          user_id,
          date_of_birth,
          gender,
          phone_number,
          address,
          insurance_details,
          medical_history,
          emergency_contact,
          created_at,
          updated_at,
          users (
            id,
            email,
            name,
            role,
            profile_picture_url,
            phone_number,
            date_of_birth,
            gender,
            address,
            emergency_contact,
            created_at,
            updated_at
          )
        )
      `)
      .eq('doctor_id', doctor.id)
      .neq('status', 'cancelled')  // Exclude cancelled appointments
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    
    // Extract unique patients from appointments and format the response
    const uniquePatients = {};
    data.forEach(appointment => {
      const patient = appointment.patients;
      if (patient && patient.id && !uniquePatients[patient.id]) {
        // Restructure the response to include user details at the top level
        uniquePatients[patient.id] = {
          id: patient.id,
          user_id: patient.user_id,
          date_of_birth: patient.date_of_birth,
          gender: patient.gender,
          phone_number: patient.phone_number,
          address: patient.address,
          insurance_details: patient.insurance_details,
          medical_history: patient.medical_history,
          emergency_contact: patient.emergency_contact,
          created_at: patient.created_at,
          updated_at: patient.updated_at,
          user: {
            id: patient.users.id,
            email: patient.users.email,
            name: patient.users.name,
            role: patient.users.role,
            profile_picture_url: patient.users.profile_picture_url,
            phone_number: patient.users.phone_number,
            date_of_birth: patient.users.date_of_birth,
            gender: patient.users.gender,
            address: patient.users.address,
            emergency_contact: patient.users.emergency_contact,
            created_at: patient.users.created_at,
            updated_at: patient.users.updated_at
          }
        };
      }
    });
    
    // Convert the object to an array
    const patientsArray = Object.values(uniquePatients);
    
    res.status(200).json(patientsArray);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all medical records for all patients of this doctor
const getAllMedicalRecords = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorUserId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    // Get all medical records for patients who have appointments with this doctor
    const { data, error } = await supabase
      .from('medical_records')
      .select(`
        *,
        patients (
          id,
          user_id,
          users (
            name,
            email
          )
        ),
        doctors (
          id,
          user_id,
          users (
            name
          )
        )
      `)
      .eq('doctor_id', doctor.id)
      .order('record_date', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    
    // Format the response to include patient and doctor names
    const formattedData = data.map(record => ({
      ...record,
      patient_name: record.patients?.users?.name || null,
      patient_email: record.patients?.users?.email || null,
      doctor_name: record.doctors?.users?.name || null
    }));
    
    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get detailed patient information for a specific patient
const getPatientDetails = async (req, res) => {
  try {
    const patientId = req.params.id;
    const doctorUserId = req.user.id;
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorUserId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    // Verify that the patient has an appointment with this doctor
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctor.id)
      .neq('status', 'cancelled');
      
    if (appointmentError) return res.status(500).json({ error: appointmentError.message });
    if (!appointment || appointment.length === 0) {
      return res.status(403).json({ error: 'Access denied. No appointment found with this patient.' });
    }

    // Get patient profile with all details
    const { data: patientData, error: patientError } = await supabase
      .from('patients')
      .select(`
        *,
        users (
          id,
          email,
          name,
          role,
          profile_picture_url,
          phone_number,
          date_of_birth,
          gender,
          address,
          emergency_contact,
          created_at,
          updated_at
        )
      `)
      .eq('id', patientId)
      .single();

    if (patientError) return res.status(500).json({ error: patientError.message });

    // Get patient's medical records
    const { data: medicalRecords, error: recordsError } = await supabase
      .from('medical_records')
      .select(`
        id,
        diagnosis,
        treatment_plan,
        prescriptions,
        record_date,
        updated_at,
        doctors (
          users (
            name
          )
        )
      `)
      .eq('patient_id', patientId)
      .eq('doctor_id', doctor.id)
      .order('record_date', { ascending: false });

    if (recordsError) return res.status(500).json({ error: recordsError.message });

    // Get patient's vital signs recorded by nurses
    const { data: vitalSigns, error: vitalsError } = await supabase
      .from('nurse_vitals')
      .select(`
        id,
        vital_signs,
        recorded_at,
        updated_at,
        users (
          name
        )
      `)
      .eq('patient_id', patientId)
      .order('recorded_at', { ascending: false });

    // Note: We don't return the vitals error as it's not critical and may be empty

    // Format the response
    const formattedPatientData = {
      id: patientData.id,
      user_id: patientData.user_id,
      name: patientData.users?.name || null,
      email: patientData.users?.email || null,
      date_of_birth: patientData.date_of_birth,
      age: patientData.date_of_birth ? Math.floor((new Date() - new Date(patientData.date_of_birth).getTime()) / 3.15576e+10) : null,
      gender: patientData.gender,
      phone_number: patientData.users?.phone_number || patientData.phone_number,
      address: patientData.users?.address || patientData.address,
      emergency_contact: patientData.users?.emergency_contact || patientData.emergency_contact,
      insurance_details: patientData.insurance_details,
      medical_history: patientData.medical_history,
      profile_picture_url: patientData.users?.profile_picture_url || null,
      created_at: patientData.created_at,
      updated_at: patientData.updated_at,
      medical_records: medicalRecords.map(record => ({
        id: record.id,
        diagnosis: record.diagnosis,
        treatment_plan: record.treatment_plan,
        prescriptions: record.prescriptions,
        record_date: record.record_date,
        updated_at: record.updated_at,
        doctor_name: record.doctors?.users?.name || null
      })),
      vital_signs: vitalSigns ? vitalSigns.map(vital => ({
        id: vital.id,
        vital_signs: vital.vital_signs,
        recorded_at: vital.recorded_at,
        updated_at: vital.updated_at,
        nurse_name: vital.users?.name || null
      })) : []
    };

    res.status(200).json(formattedPatientData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointment details by patient ID
const getAppointmentDetailsByPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const doctorUserId = req.user.id;
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorUserId)
      .single();
      
    if (doctorError) return res.status(500).json({ error: doctorError.message });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    // Verify that the patient has an appointment with this doctor
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctor.id)
      .neq('status', 'cancelled');
      
    if (appointmentError) return res.status(500).json({ error: appointmentError.message });
    if (!appointment || appointment.length === 0) {
      return res.status(403).json({ error: 'Access denied. No appointment found with this patient.' });
    }

    // Get appointment details with patient and doctor information
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        patient_id,
        doctor_id,
        appointment_date,
        status,
        created_at,
        updated_at,
        patients (
          id,
          user_id,
          date_of_birth,
          gender,
          phone_number,
          address,
          insurance_details,
          medical_history,
          emergency_contact,
          users (
            id,
            email,
            name,
            role,
            profile_picture_url,
            phone_number,
            date_of_birth,
            gender,
            address,
            emergency_contact
          )
        ),
        doctors (
          id,
          user_id,
          specialty,
          qualification,
          schedule,
          users (
            id,
            email,
            name,
            role,
            profile_picture_url,
            phone_number,
            date_of_birth,
            gender,
            address,
            emergency_contact
          )
        )
      `)
      .eq('patient_id', patientId)
      .eq('doctor_id', doctor.id)
      .order('appointment_date', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    
    // Format the response
    const formattedData = data.map(appointment => ({
      id: appointment.id,
      patient_id: appointment.patient_id,
      doctor_id: appointment.doctor_id,
      appointment_date: appointment.appointment_date,
      status: appointment.status,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
      patient: {
        id: appointment.patients?.id || null,
        user_id: appointment.patients?.user_id || null,
        name: appointment.patients?.users?.name || null,
        email: appointment.patients?.users?.email || null,
        date_of_birth: appointment.patients?.date_of_birth || null,
        gender: appointment.patients?.gender || null,
        phone_number: appointment.patients?.users?.phone_number || appointment.patients?.phone_number || null,
        address: appointment.patients?.users?.address || appointment.patients?.address || null,
        insurance_details: appointment.patients?.insurance_details || null,
        medical_history: appointment.patients?.medical_history || null,
        emergency_contact: appointment.patients?.users?.emergency_contact || appointment.patients?.emergency_contact || null,
        profile_picture_url: appointment.patients?.users?.profile_picture_url || null
      },
      doctor: {
        id: appointment.doctors?.id || null,
        user_id: appointment.doctors?.user_id || null,
        name: appointment.doctors?.users?.name || null,
        email: appointment.doctors?.users?.email || null,
        specialty: appointment.doctors?.specialty || null,
        qualification: appointment.doctors?.qualification || null,
        schedule: appointment.doctors?.schedule || null,
        phone_number: appointment.doctors?.users?.phone_number || null,
        address: appointment.doctors?.users?.address || null,
        profile_picture_url: appointment.doctors?.users?.profile_picture_url || null
      }
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getDoctorProfile,
  updateDoctorProfile,
  getPatientMedicalRecords,
  createMedicalRecord,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
  getAppointmentSchedule,
  getDoctorPatients,
  getAllMedicalRecords,
  getPatientDetails,
  getAppointmentDetailsByPatient
};