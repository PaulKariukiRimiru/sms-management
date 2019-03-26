import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SmsSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
  message: {
    type: String,
    required: 'Provide a message',
  },
  status: {
    type: Boolean,
  },
});
