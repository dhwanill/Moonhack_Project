import mongoose, { Schema } from "mongoose";

const ResourceBookingSchema = new Schema(
  {
    resource_id: {
      type: Schema.Types.ObjectId,
      ref: 'Resource',
      required: true,
    },
    requested_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
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
    approval_date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
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
    booking_code: {
      type: String,
      required: true,
      unique: true, // A unique code for each booking
    },
    is_confirmed: {
      type: Boolean,
      default: false, // Flag to indicate if the booking has been confirmed
    },
    confirmation_date: {
      type: Date, // The date the booking was confirmed
    },
    cancellation_reason: {
      type: String, // A reason for cancellation if the booking is canceled
    },
    feedback: {
      type: String, // Feedback provided for the resource or booking process
    },
    resource_condition_at_time_of_booking: {
      type: String,
      enum: ['new', 'good', 'fair', 'poor'], // Condition of the resource at the time of booking
    },
    additional_documents: [{
      type: Schema.Types.ObjectId,
      ref: 'Document', // Assuming Document schema to track uploaded files related to booking
    }],
    usage_history: [{
      type: Schema.Types.ObjectId,
      ref: 'ResourceUsage', // Assuming ResourceUsage schema is used to track how the resource is used
    }],
  },
  {
    timestamps: true,
  }
);

const ResourceBooking = mongoose.model("ResourceBooking", ResourceBookingSchema);

export default ResourceBooking;