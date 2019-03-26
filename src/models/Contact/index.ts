import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  name: {
    type: String,
    required: 'Provide a receiver address',
  },
  phonenumber: {
    type: String,
    required: 'Provide a sender address',
  },
});
