import mongoose, { Schema } from "mongoose";

const RegistrationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    registration_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    attended: {
      type: Boolean,
      required: true,
    },
    attended_at: {
      type: Date,
    },
    feedback: {
      type: Object,
      required: true,
    },
    certificate: {
      type: Object,
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
    // New fields to be added
    payment_status: {
      type: String,
      enum: ['paid', 'pending', 'failed'], // You can adjust based on your needs
      default: 'pending',
    },
    payment_date: {
      type: Date,
    },
    registration_code: {
      type: String, // You could use this for generating unique registration codes or links
      required: true,
      unique: true,
    },
    registration_notes: {
      type: String,
      default: '',
    },
    is_verified: {
      type: Boolean,
      default: false, // If the registration is verified by an admin or organizer
    },
    additional_documents: [{
      type: Schema.Types.ObjectId,
      ref: 'Document', // Assuming a 'Document' schema to handle uploaded documents
    }],
    event_session: {
      type: String, // If the event has multiple sessions, you can track which session the user is attending
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration;