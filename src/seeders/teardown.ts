import mongoose from 'mongoose';

import { createContactModel } from 'src/controllers/Contact';
import { createSmsModel } from 'src/controllers/Sms';
import { info } from 'src/utils/logs';

export const tearDownData = async () => {
  const contactModel = createContactModel();
  const smsModel = createSmsModel();

  await smsModel.deleteMany({})
  .then((value) => {
    if (value.ok) {
      info('sms data deleted');
      return;
    }
    info('sms data not deleted');
  })
  .catch((err) => info(err));

  await contactModel.deleteMany({})
    .then((value) => {
      if (value.ok) {
        info('contact data deleted');
        return;
      }
      info('contact data not deleted');
    })
    .catch((err) => info(err));

  await mongoose.disconnect();
};
