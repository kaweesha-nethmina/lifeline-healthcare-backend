const supabase = require('../db');
const Notification = require('../models/Notification');

const notificationModel = new Notification(supabase);

// Get notifications for the logged-in user
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await notificationModel.getNotificationsByUser(userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { user_id, message, notification_type, status } = req.body;

    const notificationData = {
      user_id,
      message,
      notification_type,
      status: status || 'unread'
    };

    const data = await notificationModel.createNotification(notificationData);
    res.status(201).json({ message: 'Notification created successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update notification status
const updateNotificationStatus = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { status } = req.body;

    const data = await notificationModel.updateNotificationStatus(notificationId, status);
    res.status(200).json({ message: 'Notification status updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const data = await notificationModel.markAsRead(notificationId);
    res.status(200).json({ message: 'Notification marked as read', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const data = await notificationModel.deleteNotification(notificationId);
    res.status(200).json({ message: 'Notification deleted successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserNotifications,
  createNotification,
  updateNotificationStatus,
  markAsRead,
  deleteNotification
};