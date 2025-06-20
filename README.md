# **Project Name: Mongoose Schema Design**

## **Description**
This project provides the Mongoose schema for an event management system with various entities, including Users, Chapters, Memberships, Events, Tasks, Resources, and more. The schema is designed to handle user interactions, event registrations, resource bookings, task assignments, and credit tracking in a scalable manner.

---

## **Features**

- **User Management**: Stores user profiles, skills, interests, roles, and feedback.
- **Chapter Management**: Handles multiple chapters with detailed information about each chapter, their resources, events, and tasks.
- **Event Management**: Supports event creation, registration, feedback, and participation tracking.
- **Task Management**: Allows task assignment, tracking, and award of credits.
- **Resource Management**: Manages resources, bookings, and access restrictions.
- **Credit System**: Tracks user credits across events and tasks.
- **Announcements**: Manages announcements and documents related to events and chapters.
- **Feedback System**: Handles feedback submission and response tracking.

---

## **Schema Overview**

The following schemas are implemented in the Mongoose model:

### **1. User Schema**
- **Attributes**: `email`, `display_name`, `profile_url`, `college`, `department`, `skills`, `interests`, `role`, and more.
- **Relationships**: References `Membership`, `Event`, `Registration`, `Task`, and other entities.

### **2. Chapter Schema**
- **Attributes**: `name`, `description`, `logo`, `established_date`, `social_links`, `is_active`, `created_by`, and more.
- **Relationships**: References `Membership`, `Event`, `Resource`, `Credit`, and others.

### **3. Membership Schema**
- **Attributes**: `user_id`, `chapter_id`, `role`, `position`, `join_date`, `total_credits`, and more.
- **Relationships**: References `User`, `Chapter`, and others.

### **4. Event Schema**
- **Attributes**: `title`, `description`, `event_type`, `start_date`, `end_date`, `registration_required`, `location`, `banner_image`, and more.
- **Relationships**: References `Chapter`, `User`, `Task`, `ResourceBooking`, `Feedback`, and others.

### **5. Registration Schema**
- **Attributes**: `user_id`, `event_id`, `registration_date`, `status`, `attended`, and more.
- **Relationships**: References `User`, `Event`, and others.

### **6. Task Schema**
- **Attributes**: `title`, `description`, `assigned_to`, `status`, `priority`, `due_date`, `start_date`, `completed_date`, and more.
- **Relationships**: References `User`, `Event`, `Chapter`, and others.

### **7. Resource Schema**
- **Attributes**: `name`, `description`, `quantity`, `available_quantity`, `status`, `location`, and more.
- **Relationships**: References `Chapter` and `User`.

### **8. ResourceBooking Schema**
- **Attributes**: `resource_id`, `requested_by`, `event_id`, `purpose`, `quantity`, `start_time`, `end_time`, and more.
- **Relationships**: References `Resource`, `User`, `Event`, and others.

### **9. Credit Schema**
- **Attributes**: `user_id`, `chapter_id`, `event_id`, `task_id`, `type`, `points`, `description`, and more.
- **Relationships**: References `User`, `Event`, `Task`, and others.

### **10. Announcement Schema**
- **Attributes**: `title`, `content`, `chapter_id`, `target_audience`, `related_event_id`, `is_pinned`, and more.
- **Relationships**: References `Chapter`, `Event`, and `User`.

### **11. Documentation Schema**
- **Attributes**: `title`, `content`, `type`, `tags`, `version`, `access_level`, and more.
- **Relationships**: References `Chapter`, `Event`, `User`.

### **12. Feedback Schema**
- **Attributes**: `user_id`, `title`, `description`, `category`, `status`, and more.
- **Relationships**: References `User`, `Event`, and others.

### **13. Notification Schema**
- **Attributes**: `user_id`, `title`, `message`, `type`, `is_read`, and more.
- **Relationships**: References `User`.

---

## **Getting Started**

### **Prerequisites**
- Node.js installed on your machine.
- MongoDB instance or MongoDB Atlas connection.

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/project-name.git
