import * as mongoose from 'mongoose';
import { SmsSchema } from 'src/models/Sms';

import { left, right } from 'fp-ts/lib/Either';
import { SmsCreateDetails } from './interfaces';

const createContactModel = () => mongoose.model('Sms', SmsSchema);

/**
 * Controller to create an sms
 *
 * @param  {SmsCreateDetails} contactDetails
 * @return Promise<Either<any, {}>>
 */
export const createSms = async (contactDetails: SmsCreateDetails) =>  {
  const smsModel = createContactModel();

  const newSms = new smsModel(contactDetails);

  return await smsModel.create(newSms)
    .then((sms: any | null) => {
      if (sms) {
        return right(sms);
      }

      return left({
        message: 'sms not found',
      });
    })
    .catch((err) => left(err));
};

/**
 * Controller to fetch sms for a particular account
 *
 * @param  {string} id
 * @return Promise<Either<any, {}>>
 */
export const getSms = async (id: string) =>  {
  const smsModel = createContactModel();

  return await smsModel.find({ $or: [{ sender: id }, { receiver: id} ] })
    .then((sms: any | null) => {
      if (sms) {
        return right(sms);
      }

      return left({
        message: 'sms not found',
      });
    })
    .catch((err) => left(err));
};

/**
 * Controller to delete sms
 *
 * @param  {string} sender
 * @return Promise<Either<any, {}>>
 */
export const deleteSms = async (sender: string) =>  {
  const smsModel = createContactModel();

  return await smsModel.deleteMany({ sender })
    .then((status) => {
      if (status.ok) {
        return smsModel.updateMany({ receiver: sender }, { receiver: null })
          .then((raw) => {
            return right({
              message: 'contact has been deleted',
            });
          })
          .catch((err) => left(err));
      }

      return left('Deletion failed');
    })
    .catch((err) => left(err));
};

/**
 * Controller to update the status of an sms
 *
 * @param  {string} id
 * @return Promise<Either<any, {}>>
 */
export const updateSmsStatus = async (id: string) =>  {
  const smsModel = createContactModel();

  return await smsModel.findOneAndUpdate({ _id: id }, { status: true })
    .then((sms: any | null) => {
      if (sms) {
        return right(sms);
      }

      return left({
        message: 'sms not found',
      });
    })
    .catch((err) => left(err));
};
