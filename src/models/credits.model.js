import mongoose, { Schema } from "mongoose";
import User from "./user.model";
import Club from "./club.model";
import Event from "./event.model";
import Task from "./task.model";
import CreditUsage from "./creditusage.model";
import Document from "./document.model";



const CreditSchema = new Schema(
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
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    task_id: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    approved_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approved_at: {
      type: Date,
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
    credit_code: {
      type: String,
      required: true,
      unique: true, // A unique code for each credit transaction
    },
    credit_date: {
      type: Date,
      default: Date.now, // The date the credit was awarded
    },
    expiry_date: {
      type: Date, // The date the credit expires (if applicable)
    },
    is_active: {
      type: Boolean,
      default: true, // Flag to indicate whether the credit is still valid
    },
    usage_history: [{
      type: Schema.Types.ObjectId,
      ref: 'CreditUsage', // Assuming CreditUsage schema to track how the credit was used
    }],
    transaction_id: {
      type: String, // A transaction ID for tracking credits in financial systems or external systems
    },
    associated_documents: [{
      type: Schema.Types.ObjectId,
      ref: 'Document', // Assuming Document schema to track any related documents for credit approval
    }],
    is_redeemed: {
      type: Boolean,
      default: false, // Flag to track if the credit has been redeemed
    },
    redemption_date: {
      type: Date, // The date the credit was redeemed (if applicable)
    },
  },
  {
    timestamps: true,
  }
);

const Credit = mongoose.model("Credit", CreditSchema);

export default Credit;