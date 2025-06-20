import mongoose, { Schema } from "mongoose";

const FeedbackSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attachments: [{
      type: String, // URLs or references to files attached to the feedback
    }],
    responses: [{
      type: String, // Responses to feedback, can be updated as the feedback is addressed
    }],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },

    // New fields added
    feedback_code: {
      type: String,
      required: true,
      unique: true, // A unique identifier for each feedback record
    },
    resolved_at: {
      type: Date, // The date the feedback was resolved
    },
    resolution_comments: {
      type: String, // Comments explaining how the feedback was resolved
    },
    is_resolved: {
      type: Boolean,
      default: false, // Indicates whether the feedback has been resolved
    },
    resolved_by: {
      type: Schema.Types.ObjectId,
      ref: 'User', // The user who resolved the feedback
    },
    follow_up_required: {
      type: Boolean,
      default: false, // Flag to indicate if any follow-up is needed
    },
    follow_up_date: {
      type: Date, // Date for the follow-up action (if required)
    },
    feedback_rating: {
      type: Number, // A rating field to capture user feedback on the resolution (1-5)
      min: 1,
      max: 5,
    },
    related_task_id: {
      type: Schema.Types.ObjectId,
      ref: 'Task', // If the feedback is related to a task
    },
    related_event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event', // If the feedback is related to an event
    },
    feedback_category: {
      type: String, // Categorize feedback based on type like "service", "feature request", etc.
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
