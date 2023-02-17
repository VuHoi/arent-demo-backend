import { Schema } from 'mongoose';
import { User } from '../modules/user/menu.model';

export const baseSchema = new Schema({
  created_by: {
    type: User,
  },
  updated_by: {
    type: User,
  },
});
