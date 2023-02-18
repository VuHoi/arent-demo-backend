import { baseSchema } from '@/utils/baseSchema';
import mongoose, { Schema } from 'mongoose';
import { STATUS } from '../../config/constants';
import { ColumnType } from './column.type';

const columnSchema = new Schema(
  {
    // title
    title: {
      type: String,
      index: true,
    },
    // image
    image: {
      type: String,
    },
    // is_recommened
    is_recommened: {
      type: Boolean,
    },
    // type
    type: {
      type: String,
      enum: ColumnType,
    },
    // hashtags
    tags: [
      {
        type: String,
      },
    ],
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
    collection: 'columns',
  },
);

export const ColumnModel = mongoose.model('Column', columnSchema);
