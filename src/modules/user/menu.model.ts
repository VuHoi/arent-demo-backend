import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically field createdAt and updatedAt
    collection: 'users',
  },
);

export const User = mongoose.model('User', userSchema);
