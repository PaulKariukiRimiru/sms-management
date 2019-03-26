import * as mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  name: {
    type: String,
    required: 'Provide a contact name',
  },
  phonenumber: {
    type: String,
    required: 'Provide a phone number',
  },
});

ContactSchema.plugin(uniqueValidator);
