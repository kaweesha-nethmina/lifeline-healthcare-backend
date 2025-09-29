const supabase = require('../db');
const Insurance = require('../models/Insurance');
const { patientExists } = require('../utils/validationUtils');

const insuranceModel = new Insurance(supabase);

// Verify patient insurance status
const verifyInsuranceEligibility = async (req, res) => {
  try {
    const { patient_id, insurance_provider_user_id, insurance_provider_id } = req.body;
    
    // Must provide either insurance_provider_user_id or insurance_provider_id
    if (!insurance_provider_user_id && !insurance_provider_id) {
      return res.status(400).json({ 
        error: 'Must provide either insurance_provider_user_id or insurance_provider_id' 
      });
    }
    
    // Validate that the patient exists
    const patientExistsResult = await patientExists(patient_id);
    if (!patientExistsResult) {
      return res.status(400).json({ error: 'Patient not found' });
    }
    
    // Check if patient has insurance details
    const { data: patientData, error: patientError } = await supabase
      .from('patients')
      .select('insurance_details')
      .eq('id', patient_id)
      .single();
      
    if (patientError) return res.status(500).json({ error: patientError.message });
    
    let providerData;
    
    // If using user ID
    if (insurance_provider_user_id) {
      // Validate that the insurance provider exists (user with role 'provider')
      try {
        providerData = await insuranceModel.getProviderById(insurance_provider_user_id);
      } catch (providerError) {
        return res.status(400).json({ error: 'Insurance provider not found: ' + providerError.message });
      }
      
      // Check if the provider has a corresponding insurance provider record
      if (providerData.provider_record_missing) {
        return res.status(400).json({ 
          error: 'Insurance provider record not found for this user. Please ensure the provider is properly registered.' 
        });
      }
    } 
    // If using provider ID directly
    else if (insurance_provider_id) {
      try {
        providerData = await insuranceModel.getProviderByProviderId(insurance_provider_id);
      } catch (providerError) {
        return res.status(400).json({ error: 'Insurance provider not found: ' + providerError.message });
      }
    }
    
    // Simulate verification - in reality, this would involve external API calls
    const isEligible = !!patientData.insurance_details; // Simple check for demo
    
    res.status(200).json({ 
      eligible: isEligible, 
      patient_id, 
      insurance_provider: providerData.name,
      message: isEligible ? 'Patient is eligible for insurance coverage' : 'Patient is not eligible for insurance coverage'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle insurance claims
const processInsuranceClaim = async (req, res) => {
  try {
    const { patient_id, insurance_provider_user_id, insurance_provider_id, claim_amount } = req.body;
    
    // Must provide either insurance_provider_user_id or insurance_provider_id
    if (!insurance_provider_user_id && !insurance_provider_id) {
      return res.status(400).json({ 
        error: 'Must provide either insurance_provider_user_id or insurance_provider_id' 
      });
    }
    
    // Validate that the patient exists
    const patientExistsResult = await patientExists(patient_id);
    if (!patientExistsResult) {
      return res.status(400).json({ error: 'Patient not found' });
    }

    const claim_status = 'pending'; // Default status
    let providerEmail;

    // If using user ID
    if (insurance_provider_user_id) {
      // Validate that the insurance provider exists (user with role 'provider')
      const { data: providerUser, error: providerUserError } = await supabase
        .from('users')
        .select('email')
        .eq('id', insurance_provider_user_id)
        .eq('role', 'provider')
        .single();
        
      if (providerUserError || !providerUser) {
        return res.status(400).json({ error: 'Insurance provider not found' });
      }
      
      providerEmail = providerUser.email;
    }

    // Create the insurance claim
    let data;
    try {
      if (insurance_provider_user_id) {
        // Using user ID approach
        const claimData = {
          patient_id,
          provider_email: providerEmail,
          claim_status,
          claim_amount,
        };
        data = await insuranceModel.createClaim(claimData);
      } else {
        // Using provider ID directly
        const claimData = {
          patient_id,
          insurance_provider_id,
          claim_status,
          claim_amount,
        };
        data = await insuranceModel.createClaimWithProviderId(claimData);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    
    // In a real implementation, you would integrate with an insurance provider API
    // For now, we'll just mark the claim as approved
    
    let updatedData;
    try {
      updatedData = await insuranceModel.updateClaimStatus(data.id, 'approved');
    } catch (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.status(201).json({ 
      message: 'Insurance claim processed successfully', 
      data: updatedData,
      claim_status: 'approved'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get insurance providers (users with role 'provider' and their provider IDs)
const getInsuranceProviders = async (req, res) => {
  try {
    const data = await insuranceModel.getAllProviders();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get insurance claims for a patient
const getPatientInsuranceClaims = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    
    // Validate that the patient exists
    const patientExistsResult = await patientExists(patientId);
    if (!patientExistsResult) {
      return res.status(400).json({ error: 'Patient not found' });
    }
    
    const data = await insuranceModel.getPatientClaims(patientId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  verifyInsuranceEligibility,
  processInsuranceClaim,
  getInsuranceProviders,
  getPatientInsuranceClaims
};