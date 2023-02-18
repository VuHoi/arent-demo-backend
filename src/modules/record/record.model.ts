import { baseSchema } from '@/utils/baseSchema';
import mongoose, { Schema } from 'mongoose';
import { STATUS } from '../../config/constants';

const recordSchema = new Schema(
  {
    // weight
    weight: {
      type: Number,
      required: true,
    },

    // blueLine in the graph
    // blueLine: {
    //   type: Number,
    //   required: true,
    // },

    // status is enabled or disabled
    status: {
      type: String,
      enum: STATUS,
      default: STATUS.ENABLED,
    },
    ...baseSchema.obj,
  },
  {
    timestamps: true, // Automatically field createdAt and updatedAt
    collection: 'records',
  },
);

export const RecordModel = mongoose.model('Record', recordSchema);
