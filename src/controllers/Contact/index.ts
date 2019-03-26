import { left, right } from 'fp-ts/lib/Either';
import * as mongoose from 'mongoose';

import { ContactSchema } from 'src/models/Contact';
import { deleteSms } from '../Sms';

import { ContactCreateDetails, ContactUpdateDetails } from './interface';


const createContactModel = () => mongoose.model('Contact', ContactSchema);

export const createContact = async (contactDetails: ContactCreateDetails) =>  {
  const contactModel = createContactModel();

  const newContact = new contactModel(contactDetails);

  return await contactModel.create(newContact)
    .then((contact: any | null) => {
      if (contact) {
        return right(contact);
      }

      return left({
        message: 'contact not found',
      });
    })
    .catch((err) => left(err));
};

export const updateContact = async (id: string, contactDetails: ContactUpdateDetails) => {
  const contactModel = createContactModel();

  return contactModel.findById(id)
    .then(async (contact: any | null) => {
      if (contact) {
        Object.assign(contact, contactDetails);

        contact.save();

        return right({
          message: 'contact has been updated',
          data: contact,
        });
      }

      return left({
        message: 'contact not found',
      });
    })
    .catch((err) => left(err));
};

export const deleteContact = async (id: string) => {
  const contactModel = createContactModel();

  return contactModel.findByIdAndDelete(id)
    .then((contact: any | null) => {
      if (contact) {

        return deleteSms(id);
      }

      return left({
        message: 'contact not found',
      });
    })
    .catch((err) => left(err));
};

export const getContact = async (id: string) => {
  const contactModel = createContactModel();

  if (id) {
    return contactModel.findById(id)
      .then((contact: any | null) => {
        if (contact) {
          return right(contact);
        }
        return left('Contact not found');
      })
    .catch((err) => left(err));
  }

  return contactModel.find()
    .then((contacts) => {
      return right(contacts);
    })
    .catch((err) => left(err));
};
