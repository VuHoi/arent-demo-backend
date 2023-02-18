import { baseSchema } from '@/utils/baseSchema';
import mongoose, { Schema } from 'mongoose';

const diarySchema = new Schema(
  {
    // title
    title: {
      type: String,
      index: true,
    },
    // description
    description: {
      type: String,
    },
    ...baseSchema.obj,
  },
  {
    timestamps: true, // Automatically field createdAt and updatedAt
    collection: 'diary',
  },
);

export const DiaryModel = mongoose.model('Diary', diarySchema);
