import { Schema, Types } from 'mongoose';

export const baseSchema = new Schema({
  created_by: {
    type: Types.ObjectId,
    ref: 'User',
  },
  updated_by: {
    type: Types.ObjectId,
    ref: 'User',
  },
});
