import { baseSchema } from '@/utils/baseSchema';
import mongoose, { Schema } from 'mongoose';

const exerciseSchema = new Schema(
  {
    // title
    title: {
      type: String,
      index: true,
    },
    // duration
    duration: {
      type: Number,
    },
    // kcal
    kcal: {
      type: Number,
    },
    ...baseSchema.obj,
  },
  {
    timestamps: true, // Automatically field createdAt and updatedAt
    collection: 'exercises',
  },
);

export const ExerciseModel = mongoose.model('Exercise', exerciseSchema);
