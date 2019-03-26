import dotenv from 'dotenv';

import { createContactHandler, deleteContactHandler, getContactHandler, updateContactHandler } from './handers/contact';

dotenv.config();

const { BASE_URL } = process.env;

export default [
  {
    path: `${BASE_URL}/contact`,
    method: 'post',
    handler: createContactHandler,
  },
  {
    path: `${BASE_URL}/contact`,
    method: 'put',
    handler: updateContactHandler,
  },
  {
    path: `${BASE_URL}/contact`,
    method: 'delete',
    handler: deleteContactHandler,
  },
  {
    path: `${BASE_URL}/contact`,
    method: 'get',
    handler: getContactHandler,
  },
];
