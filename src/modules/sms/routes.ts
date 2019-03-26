import dotenv from 'dotenv';

import { createSmsHandler, getSmsHandler, updateSmsStatusHandler } from './handlers';

dotenv.config();

const { BASE_URL } = process.env;

export default [
  {
    path: `${BASE_URL}/sms`,
    method: 'post',
    handler: createSmsHandler,
  },
  {
    path: `${BASE_URL}/sms`,
    method: 'get',
    handler: getSmsHandler,
  },
  {
    path: `${BASE_URL}/sms`,
    method: 'put',
    handler: updateSmsStatusHandler,
  },
];
