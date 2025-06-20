import mongoose, { Schema } from "mongoose";

const MembershipSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    club_id: {
      type: Schema.Types.ObjectId,
      ref: 'club',
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    join_date: {
      type: Date,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
    },
    total_credits: {
      type: Number,
      required: true,
    },
    achievements: [{
      type: String,
    }],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    // New fields to be added
    membership_start_date: {
      type: Date,
      required: true,
    },
    membership_end_date: {
      type: Date,
      required: false, // Not always required (can be null for ongoing memberships)
    },
    tasks_assigned: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }],
    feedbacks: [{
      type: Schema.Types.ObjectId,
      ref: 'Feedback',
    }],
    documents: [{
      type: Schema.Types.ObjectId,
      ref: 'Document',
    }],
    membership_type: {
      type: String,
      enum: ['full', 'part-time', 'temporary'], // You can change this list based on your use case
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Membership = mongoose.model("Membership", MembershipSchema);