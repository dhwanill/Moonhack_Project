import mongoose, { Schema } from "mongoose";

const ResourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    club_id: {
      type: Schema.Types.ObjectId,
      ref: 'club',
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    available_quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    access_restriction: {
      type: String,
      required: true,
    },
    allowed_roles: [{
      type: String,
    }],
    attachments: [{
      type: String,
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
    bookings: [{
      type: Schema.Types.ObjectId,
      ref: 'ResourceBooking',
    }],
    // New fields added
    condition: {
      type: String,
      enum: ['new', 'good', 'fair', 'poor'], // Tracks the current condition of the resource
      default: 'new',
    },
    maintenance_schedule: {
      type: Date, // A date for when the resource needs maintenance
    },
    last_maintenance_date: {
      type: Date, // Tracks the last maintenance date
    },
    resource_code: {
      type: String,
      required: true,
      unique: true, // A unique code for each resource
    },
    resource_image: {
      type: String, // URL or path to an image of the resource
    },
    resource_notes: {
      type: String, // Any additional notes about the resource
      default: '',
    },
    is_active: {
      type: Boolean,
      default: true, // Flag to indicate whether the resource is currently active or not
    },
    usage_history: [{
      type: Schema.Types.ObjectId,
      ref: 'ResourceUsage', // Assuming ResourceUsage is a schema to track each instance of usage
    }],
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", ResourceSchema);

export default Resource;