class Emergency {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get all available emergency resources
  async getAvailableResources() {
    const { data, error } = await this.supabase
      .from('emergency_resources')
      .select('*')
      .eq('status', 'available')
      .order('resource_type', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  // Create emergency resource
  async createResource(resourceData) {
    const { data, error } = await this.supabase
      .from('emergency_resources')
      .insert([resourceData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get all emergency cases
  async getAllCases() {
    const { data, error } = await this.supabase
      .from('emergency_cases')
      .select(`
        *,
        patients (
          user_id
        ),
        emergency_resources (
          resource_type,
          location
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Create emergency case
  async createCase(caseData) {
    const { data, error } = await this.supabase
      .from('emergency_cases')
      .insert([caseData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update emergency case
  async updateCase(caseId, updateData) {
    const { data, error } = await this.supabase
      .from('emergency_cases')
      .update(updateData)
      .eq('id', caseId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update resource status
  async updateResourceStatus(resourceId, status) {
    const { data, error } = await this.supabase
      .from('emergency_resources')
      .update({ status })
      .eq('id', resourceId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = Emergency;