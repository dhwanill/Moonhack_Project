import mongoose, { Schema } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    club_id: {
      type: Schema.Types.ObjectId,
      ref: 'club',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    target_audience: {
      type: String,
      required: true,
    },
    specific_roles: [{
      type: String, // Specific roles that should see this announcement (e.g., "admin", "participant")
    }],
    related_event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    attachments: [{
      type: String, // URL or reference to files attached to the announcement
    }],
    is_pinned: {
      type: Boolean,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    read_by: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },

    // New fields added
    announcement_code: {
      type: String,
      required: true,
      unique: true, // A unique code for each announcement
    },
    is_active: {
      type: Boolean,
      default: true, // Flag to indicate whether the announcement is still active and valid
    },
    pinned_date: {
      type: Date, // The date when the announcement was pinned (if applicable)
    },
    read_count: {
      type: Number,
      default: 0, // Keeps track of how many users have read the announcement
    },
    feedback: [{
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // User who provided the feedback
      },
      comment: {
        type: String, // Feedback/comment given by the user regarding the announcement
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    }],
    viewed_by: [{
      type: Schema.Types.ObjectId,
      ref: 'User', // Users who have viewed the announcement
    }],
    related_documents: [{
      type: Schema.Types.ObjectId,
      ref: 'Document', // Reference to documents that might be associated with the announcement
    }],
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

export default Announcement;