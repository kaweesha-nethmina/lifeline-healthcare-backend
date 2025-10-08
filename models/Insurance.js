class Insurance {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get all insurance providers with their insurance provider IDs
  async getAllProviders() {
    // First get all users with role 'provider'
    const { data: users, error: usersError } = await this.supabase
      .from('users')
      .select('id, name, email')
      .eq('role', 'provider')
      .order('name', { ascending: true });

    if (usersError) throw new Error(usersError.message);
    
    // For each user, get their corresponding insurance provider record
    const providers = [];
    for (const user of users) {
      const { data: provider, error: providerError } = await this.supabase
        .from('insurance_providers')
        .select('id')
        .eq('contact_info', user.email)
        .single();
        
      if (!providerError && provider) {
        providers.push({
          user_id: user.id,
          provider_id: provider.id,
          name: user.name,
          email: user.email
        });
      } else {
        // If no insurance provider record exists, we can still return the user info
        // but indicate that no provider record exists yet
        providers.push({
          user_id: user.id,
          provider_id: null,
          name: user.name,
          email: user.email,
          provider_record_missing: true
        });
      }
    }
    
    return providers;
  }

  // Get a single insurance provider by user ID
  async getProviderById(userId) {
    // First get the user
    const { data: user, error: userError } = await this.supabase
      .from('users')
      .select('id, name, email')
      .eq('id', userId)
      .eq('role', 'provider')
      .single();

    // Handle the case where no user is found or the user doesn't have the provider role
    if (userError) {
      // Check if it's because no rows were found
      if (userError.code === 'PGRST116') {
        // Check if the user exists at all (but might not have provider role)
        const { data: anyUser, error: anyUserError } = await this.supabase
          .from('users')
          .select('id, name, email, role')
          .eq('id', userId)
          .single();
          
        if (anyUserError) {
          // User doesn't exist at all
          throw new Error(`User with ID ${userId} not found`);
        } else {
          // User exists but doesn't have provider role
          throw new Error(`User with ID ${userId} does not have the 'provider' role. Current role: ${anyUser.role}`);
        }
      } else {
        // Some other error occurred
        throw new Error('Error looking up user: ' + userError.message);
      }
    }
    
    if (!user) {
      throw new Error(`User with ID ${userId} not found or does not have the 'provider' role`);
    }
    
    // Then get the corresponding insurance provider record
    const { data: provider, error: providerError } = await this.supabase
      .from('insurance_providers')
      .select('id')
      .eq('contact_info', user.email)
      .single();
      
    if (providerError) {
      // If no insurance provider record exists, return user info with null provider_id
      return {
        user_id: user.id,
        provider_id: null,
        name: user.name,
        email: user.email,
        provider_record_missing: true
      };
    }
    
    return {
      user_id: user.id,
      provider_id: provider.id,
      name: user.name,
      email: user.email
    };
  }

  // Get a single insurance provider by provider ID
  async getProviderByProviderId(providerId) {
    const { data: provider, error: providerError } = await this.supabase
      .from('insurance_providers')
      .select('id, name, contact_info')
      .eq('id', providerId)
      .single();

    if (providerError) {
      throw new Error(`Insurance provider with ID ${providerId} not found`);
    }
    
    // Try to find the corresponding user
    const { data: user, error: userError } = await this.supabase
      .from('users')
      .select('id')
      .eq('email', provider.contact_info)
      .eq('role', 'provider')
      .single();
      
    return {
      provider_id: provider.id,
      name: provider.name,
      contact_info: provider.contact_info,
      user_id: user ? user.id : null
    };
  }

  // Get patient insurance claims with provider info
  async getPatientClaims(patientId) {
    const { data, error } = await this.supabase
      .from('insurance_claims')
      .select(`
        *,
        insurance_providers (
          name
        )
      `)
      .eq('patient_id', patientId)
      .order('claim_date', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Create insurance claim (mapping user ID to insurance provider ID)
  async createClaim(claimData) {
    // Map user ID to insurance provider ID
    const { data: provider, error: providerError } = await this.supabase
      .from('insurance_providers')
      .select('id')
      .eq('contact_info', claimData.provider_email)
      .single();
      
    if (providerError) throw new Error('Insurance provider record not found for email: ' + claimData.provider_email);
    
    // Create claim with the correct insurance provider ID
    const { data, error } = await this.supabase
      .from('insurance_claims')
      .insert([{
        patient_id: claimData.patient_id,
        insurance_provider_id: provider.id,
        claim_status: claimData.claim_status,
        claim_amount: claimData.claim_amount
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Create insurance claim using provider ID directly
  async createClaimWithProviderId(claimData) {
    // Verify that the provider exists
    const { data: provider, error: providerError } = await this.supabase
      .from('insurance_providers')
      .select('id')
      .eq('id', claimData.insurance_provider_id)
      .single();
      
    if (providerError) throw new Error('Insurance provider with ID ' + claimData.insurance_provider_id + ' not found');
    
    // Create claim with the provided insurance provider ID
    const { data, error } = await this.supabase
      .from('insurance_claims')
      .insert([{
        patient_id: claimData.patient_id,
        insurance_provider_id: claimData.insurance_provider_id,
        claim_status: claimData.claim_status,
        claim_amount: claimData.claim_amount
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update insurance claim status
  async updateClaimStatus(claimId, status) {
    const { data, error } = await this.supabase
      .from('insurance_claims')
      .update({ claim_status: status })
      .eq('id', claimId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = Insurance;