import mongoose, { Schema } from "mongoose";

const clubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    established_date: {
      type: Date,
      required: true,
    },
    social_links: {
      type: Object,
      required: true,
    },
    is_active: {
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
    memberships: [{
      type: Schema.Types.ObjectId,
      ref: 'Membership',
    }],
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event',
    }],
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }],
    resources: [{
      type: Schema.Types.ObjectId,
      ref: 'Resource',
    }],
    credits: [{
      type: Schema.Types.ObjectId,
      ref: 'Credit',
    }],
    announcements: [{
      type: Schema.Types.ObjectId,
      ref: 'Announcement',
    }],
    documentation: [{
      type: Schema.Types.ObjectId,
      ref: 'Documentation',
    }],
    // New fields to be added
    department: {
      type: String,
      required: true,
    },
    head_of_chapter: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Assuming the head is a User
      required: true,
    },
    chapter_location: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    website_url: {
      type: String,
      required: true,
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    meetings: [{
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
    }],
  },
  {
    timestamps: true,
  }
);

export const Club = mongoose.model("Club", clubSchema);