const supabase = require('../db');
const Patient = require('../models/Patient');
const Insurance = require('../models/Insurance');

const patientModel = new Patient(supabase);
const insuranceModel = new Insurance(supabase);

// Get patient profile
const getPatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await patientModel.getProfile(userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update patient profile
const updatePatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      date_of_birth, 
      gender, 
      phone_number, 
      address, 
      insurance_details, 
      medical_history, 
      emergency_contact, 
      preferred_location 
    } = req.body;
    
    // Update patient-specific fields in the patients table
    const patientUpdateData = {
      date_of_birth,
      gender,
      phone_number,
      address,
      insurance_details,
      medical_history,
      emergency_contact,
      // Add the preferred location field if provided
      ...(preferred_location && { preferred_location: preferred_location }),
      updated_at: new Date()
    };

    const patientData = await patientModel.updateProfile(userId, patientUpdateData);
    
    // Also update user fields in the users table
    const userUpdateData = {
      date_of_birth,
      gender,
      phone_number,
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
    
    // Update user profile with patient information
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update(userUpdateData)
      .eq('id', userId)
      .select()
      .single();
      
    if (userError) {
      console.error('Error updating user profile:', userError);
      // Continue with response even if user update fails
    }
    
    res.status(200).json({ 
      message: 'Profile updated successfully', 
      patientData,
      userData: userData || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all doctors with user details
const getAllDoctors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select(`
        id,
        user_id,
        specialty,
        qualification,
        schedule,
        users (
          name,
          email,
          profile_picture_url
        )
      `)
      .order('specialty', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    
    // Format the response to include user details at the same level
    const formattedData = data.map(doctor => ({
      id: doctor.id,
      user_id: doctor.user_id,
      name: doctor.users?.name || null,
      email: doctor.users?.email || null,
      profile_picture_url: doctor.users?.profile_picture_url || null,
      specialty: doctor.specialty,
      qualification: doctor.qualification,
      schedule: doctor.schedule
    }));
    
    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all insurance providers
const getAllInsuranceProviders = async (req, res) => {
  try {
    const data = await insuranceModel.getAllProviders();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doctor_id, appointment_date, location } = req.body;
    
    // First, get the patient's ID from the patients table
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (patientError) return res.status(500).json({ error: patientError.message });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    // Get doctor information to determine location if not provided
    let appointmentLocation = location;
    if (!appointmentLocation) {
      const { data: doctor, error: doctorError } = await supabase
        .from('doctors')
        .select('schedule')
        .eq('id', doctor_id)
        .single();
        
      if (!doctorError && doctor?.schedule) {
        // Try to extract location from doctor's schedule
        const schedule = doctor.schedule.toLowerCase();
        if (schedule.includes('hospital') || schedule.includes('clinic')) {
          const locationMatch = schedule.match(/(hospital|clinic)[^,.;]*/gi);
          if (locationMatch) {
            appointmentLocation = locationMatch[0].trim();
          }
        }
      }
    }

    const appointmentData = {
      patient_id: patient.id,  // Use patient.id, not userId
      doctor_id,
      appointment_date,
      // Add location to the appointment data if provided
      ...(location && { location: location })
    };

    const data = await patientModel.bookAppointment(appointmentData);
    
    // Add location info to response
    const responseData = {
      ...data,
      location: location || null
    };
    
    res.status(201).json({ message: 'Appointment booked successfully', data: responseData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointment history
const getAppointmentHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // First, get the patient's ID from the patients table
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (patientError) return res.status(500).json({ error: patientError.message });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const data = await patientModel.getAppointmentHistory(patient.id);  // Use patient.id, not userId
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointmentId = req.params.id;
    const { doctor_id, appointment_date, location, status } = req.body;
    
    // First, get the patient's ID from the patients table
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (patientError) return res.status(500).json({ error: patientError.message });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    // Prepare update data
    const updateData = {
      updated_at: new Date()
    };
    
    // Only include fields that are provided in the request
    if (doctor_id !== undefined) updateData.doctor_id = doctor_id;
    if (appointment_date !== undefined) updateData.appointment_date = appointment_date;
    if (location !== undefined) updateData.location = location;
    if (status !== undefined) updateData.status = status;

    const data = await patientModel.updateAppointment(appointmentId, patient.id, updateData);
    res.status(200).json({ message: 'Appointment updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointmentId = req.params.id;
    
    // First, get the patient's ID from the patients table
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (patientError) return res.status(500).json({ error: patientError.message });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const data = await patientModel.deleteAppointment(appointmentId, patient.id);
    res.status(200).json({ message: 'Appointment deleted successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get medical records
const getMedicalRecords = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // First, get the patient's ID from the patients table
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (patientError) return res.status(500).json({ error: patientError.message });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const data = await patientModel.getMedicalRecords(patient.id);  // Use patient.id, not userId
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get vital signs for the patient
const getVitalSigns = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // First, get the patient's ID from the patients table
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (patientError) return res.status(500).json({ error: patientError.message });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const data = await patientModel.getVitalSigns(patient.id);  // Use patient.id, not userId
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPatientProfile,
  updatePatientProfile,
  getAllDoctors,
  getAllInsuranceProviders,
  bookAppointment,
  getAppointmentHistory,
  updateAppointment,
  deleteAppointment,
  getMedicalRecords,
  getVitalSigns
};