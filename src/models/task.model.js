import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    club_id: {
      type: Schema.Types.ObjectId,
      ref: 'club',
      required: true,
    },
    assigned_to: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    completed_date: {
      type: Date,
    },
    attachments: [{
      type: String,
    }],
    comments: [{
      type: String,
    }],
    credits_awarded: {
      type: Number,
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
    credits: [{
      type: Schema.Types.ObjectId,
      ref: 'Credit',
    }],
    // New fields added
    task_type: {
      type: String,
      enum: ['administrative', 'technical', 'design', 'logistics'], // Example categories for tasks
      required: true,
    },
    estimated_time: {
      type: Number, // Time in hours
      required: true,
    },
    task_link: {
      type: String, // If the task is related to an external link or platform
    },
    feedback: [{
      type: Schema.Types.ObjectId,
      ref: 'Feedback', // Assuming Feedback schema is used to track feedback on tasks
    }],
    priority_level: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    is_urgent: {
      type: Boolean,
      default: false, // Flag to mark whether the task is urgent
    },
    related_resources: [{
      type: Schema.Types.ObjectId,
      ref: 'Resource', // Link to the resources used for the task
    }],
    subtasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task', // Allows nesting of subtasks
    }],
    dependencies: [{
      type: Schema.Types.ObjectId,
      ref: 'Task', // Tasks that need to be completed before this task can start
    }],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;