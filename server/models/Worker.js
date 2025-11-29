const { Schema, model } = require("mongoose");

const WorkerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    // main skills
    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    // PROFILE SECTION
    profile: {
      title: { type: String, default: "" },
      bio: { type: String, default: "" },
      skills: { type: [String], default: [] }, // profile-specific skills
      image: { type: String, default: null }, // project image/links
    },

    // STATS SECTION
    stats: {
      completedProjects: { type: Number, default: 0 },
      avgResponseTime: { type: Number, default: 0 }, // minutes/hours
      totalEarnings: { type: Number, default: 0 },
      totalBookings: { type: Number, default: 0 },
      favoritesCount: { type: Number, default: 0 },
      ratingAverage: { type: Number, default: 0 },
      ratingCount: { type: Number, default: 0 },
    },

    // LOCATION
    location: {
      city: { type: String, default: null },
      state: { type: String, default: null },
      country: { type: String, default: null },
    },

    // WORK AVAILABILITY
    availability: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "available",
    },

    hourlyRate: {
      type: Number,
      default: 0,
    },

    profileImage: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      default: "worker",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexes
WorkerSchema.index({ email: 1 }, { unique: true });
WorkerSchema.index({ "location.city": 1 });

module.exports = model("Worker", WorkerSchema);
