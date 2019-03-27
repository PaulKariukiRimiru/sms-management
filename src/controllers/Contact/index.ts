import { left, right } from 'fp-ts/lib/Either';
import * as mongoose from 'mongoose';

import { ContactSchema } from 'src/models/Contact';
import { deleteSms } from '../Sms';

import { ContactCreateDetails, ContactUpdateDetails } from './interface';


export const createContactModel = () => mongoose.model('Contact', ContactSchema);

/**
 * Controller to create a contact
 *
 * @param  {ContactCreateDetails} contactDetails
 * @return Promise<Either<any, {}>>
 */
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

/**
 * Controller to update a contact
 *
 * @param  {string} id
 * @param  {ContactUpdateDetails} contactDetails
 * @return Promise<Either<any, {}>>
 */
export const updateContact = async (id: string, contactDetails: ContactUpdateDetails) => {
  const contactModel = createContactModel();

  return contactModel.findOneAndUpdate({ _id: id }, contactDetails, { runValidators: true })
    .then((contact: any | null) => {
      if (contact) {
        return right(contact);
      }

      return left({
        message: 'contact was not found',
      });
    })
    .catch((err) => left(err));
};

/**
 * Controller to delete a contact
 *
 * @param  {string} id
 * @return Promise<Either<any, {}>>
 */
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

/**
 * Controller to fetch contacts
 *
 * @param  {string} id
 * @return Promise<Either<any, {}>>
 */
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
