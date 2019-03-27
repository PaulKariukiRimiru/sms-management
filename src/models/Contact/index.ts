import * as mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  name: {
    type: String,
    required: 'Provide a contact name',
    match: [/^[a-zA-Z]/, 'provide a valid namw'],
  },
  phonenumber: {
    type: String,
    unique: 'Please ensure that the phone number is unique',
    required: 'Provide a phone number',
    match: [/^[0-9]*$/, 'Provide a valid phone number'],
    minlength: [9, 'Provide a valid phone number'],
    maxlength: [13, 'Provide a valid phone number'],
  },
});

ContactSchema.plugin(uniqueValidator);
