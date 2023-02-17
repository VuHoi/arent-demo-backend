import { baseSchema } from '@/utils/baseSchema';
import mongoose, { Schema } from 'mongoose';
import { STATUS } from '../../config/constants';

const menuSchema = new Schema(
  {
    // slug
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // title to display
    title: {
      type: String,
      required: true,
      unique: true,
    },
    // field order to sort
    order: {
      type: Number,
      default: 0,
    },
    // type icon
    icon: {
      type: String,
    },
    // lever of menu
    level: {
      type: Number,
      default: 0,
    },
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
    collection: 'menus',
  },
);

export const MenuModel = mongoose.model('Menu', menuSchema);
