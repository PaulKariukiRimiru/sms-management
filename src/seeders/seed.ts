import faker from 'faker';
import { createContact, createContactModel } from 'src/controllers/Contact';
import { createSms } from 'src/controllers/Sms';

export const seedData = async () => {
  const contactData = [
    {
      name: 'test 1',
      phonenumber: '0724000000',
    },
    {
      name: 'test 2',
      phonenumber: '0724000001',
    },
  ];

  const contactModel = createContactModel();

  const results = await Promise.all(
    contactData.map(async (location) => await createContact(location)),
  );

  const ids: string[] = [];
  if (results.every((trans) => trans.isRight())) {
    await contactModel.find()
      .then(async (locs) => {
        return await Promise.all(
          locs.map(async (loc: any) => {
            ids.push(loc.id);
            return await createSms({
              sender: loc.id,
              receiver: faker.random.arrayElement(locs)._id,
              message: faker.lorem.sentence(),
            });
          }),
        );
      })
      .catch((err) => err.message);
  }

  return ids;
};
