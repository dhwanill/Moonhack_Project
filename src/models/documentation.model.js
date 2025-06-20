import mongoose, { Schema } from "mongoose";

const DocumentationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
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
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    tags: [{
      type: String, // Tags that help categorize the documentation
    }],
    attachments: [{
      type: String, // URLs or references to files attached to the documentation
    }],
    version: {
      type: Number,
      required: true,
    },
    access_level: {
      type: String,
      required: true,
    },
    contributors: [{
      type: String, // Users who contributed to the documentation
    }],
    approved_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approved_at: {
      type: Date,
      required: true,
    },
    is_archived: {
      type: Boolean,
      required: true,
    },
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
    last_edited_by: {
      type: Schema.Types.ObjectId,
      ref: 'User', // The user who last edited the documentation
    },
    last_edited_at: {
      type: Date, // The date when the documentation was last edited
    },
    related_task_ids: [{
      type: Schema.Types.ObjectId,
      ref: 'Task', // Related tasks that the documentation may reference
    }],
    related_feedback_ids: [{
      type: Schema.Types.ObjectId,
      ref: 'Feedback', // If there are any feedbacks associated with the documentation
    }],
    document_status: {
      type: String, // A status field (e.g., "draft", "review", "published")
      required: true,
      default: 'draft',
    },
    approval_status: {
      type: String, // Can be used for tracking if it's "approved", "pending", or "rejected"
      default: 'pending',
    },
    feedbacks_received: [{
      type: Schema.Types.ObjectId,
      ref: 'Feedback', // References to feedback received on the document
    }],
    document_revision_notes: [{
      type: String, // Notes regarding the revisions made to the documentation
    }],
    document_history: [{
      version: { type: Number },
      updated_at: { type: Date },
      updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
      changes: { type: String }, // A summary of the changes made in the revision
    }],
    is_public: {
      type: Boolean, // Whether the document is publicly accessible or not
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Documentation = mongoose.model('Documentation', DocumentationSchema);

export default Documentation;