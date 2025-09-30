class Notification {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get all notifications for a user
  async getNotificationsByUser(userId) {
    const { data, error } = await this.supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Create a new notification
  async createNotification(notificationData) {
    const { data, error } = await this.supabase
      .from('notifications')
      .insert([notificationData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update notification status
  async updateNotificationStatus(id, status) {
    const { data, error } = await this.supabase
      .from('notifications')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Mark notification as read
  async markAsRead(id) {
    return await this.updateNotificationStatus(id, 'read');
  }

  // Delete a notification
  async deleteNotification(id) {
    const { data, error } = await this.supabase
      .from('notifications')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = Notification;