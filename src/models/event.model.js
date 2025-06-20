import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    club_id: {
      type: Schema.Types.ObjectId,
      ref: 'club',
      required: true,
    },
    event_type: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    banner_image: {
      type: String,
      required: true,
    },
    registration_required: {
      type: Boolean,
      required: true,
    },
    registration_deadline: {
      type: Date,
      required: true,
    },
    max_participants: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    organizers: [{
      type: String,
    }],
    speakers: [{
      type: String,
    }],
    agenda: [{
      type: String,
    }],
    feedback: {
      type: Object,
      required: false,
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
    registrations: [{
      type: Schema.Types.ObjectId,
      ref: 'Registration',
    }],
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }],
    resource_bookings: [{
      type: Schema.Types.ObjectId,
      ref: 'ResourceBooking',
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
    event_image_gallery: [{
      type: String,
    }],
    event_registration_form: {
      type: Schema.Types.ObjectId,
      ref: 'Form', // Assuming a 'Form' schema to handle event-specific registration forms
    },
    event_venue: {
      type: String,
      required: true,
    },
    event_category: {
      type: String,
      enum: ['conference', 'workshop', 'seminar', 'webinar', 'recruitment', 'quiz', 'competition'], // You can extend this list as needed
      required: true,
    },
    sponsors: [{
      type: String,
    }],
    event_promotion: {
      type: Object,
      required: true, // Can include social media, emails, etc.
    },
    additional_resources: [{
      type: Schema.Types.ObjectId,
      ref: 'Resource', // Assuming a 'Resource' schema to manage event-related resources
    }],
    event_feedback_form: {
      type: Schema.Types.ObjectId,
      ref: 'Form', // Assuming a 'Form' schema for post-event feedback
    },
    attendees: [{
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to users who are attending the event
    }],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;