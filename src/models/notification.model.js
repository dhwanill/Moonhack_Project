import mongoose, { Schema } from 'mongoose';

// Notification Schema
const NotificationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Reference to the user the notification is for
    },
    title: {
      type: String,
      required: true, // Title of the notification
    },
    message: {
      type: String,
      required: true, // Message content of the notification
    },
    type: {
      type: String,
      required: true, // Type of notification (e.g., "info", "warning", "alert")
    },
    related_to: {
      type: Schema.Types.Mixed, // Could be related to an event, task, feedback, etc.
      required: true,
    },
    is_read: {
      type: Boolean,
      required: true, // Whether the notification has been read or not
      default: false, // Default is unread
    },
    read_at: {
      type: Date, // Timestamp when the notification was read
    },
    created_at: {
      type: Date,
      default: Date.now, // Timestamp when the notification was created
    },

    // New fields
    priority: {
      type: String, 
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    related_event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event', // Reference to an event (if applicable)
    },
    related_task_id: {
      type: Schema.Types.ObjectId,
      ref: 'Task', // Reference to a task (if applicable)
    },
    sent_by: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the user who sent the notification (if applicable)
    },
    notification_category: {
      type: String, // To categorize the notifications, e.g., "system", "user", "reminder"
      enum: ['system', 'user', 'reminder', 'alert'],
      required: true,
    },
    action_url: {
      type: String, // An optional URL for users to take action when they click the notification (e.g., event link)
    },
    expiration_date: {
      type: Date, // Expiry date for the notification (if it should be removed after a certain period)
    },
  },
  {
    timestamps: true, // Automatically creates 'created_at' and 'updated_at' fields
  }
);

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;