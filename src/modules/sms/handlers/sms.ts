import { Request, Response } from 'express';
import { Either } from 'fp-ts/lib/Either';

import { createSms, getSms, updateSmsStatus } from 'src/controllers/Sms';
import { ResponseBody, ResponseStatus } from 'src/modules/interfaces';

export const createSmsHandler = async (req: Request, res: Response) => {
  const result = await createSms(req.body);

  handleControllerResult(result, res);
};

export const getSmsHandler = async (req: Request, res: Response) => {
  const result = await getSms(req.query.id);

  handleControllerResult(result, res);
};

export const updateSmsStatusHandler = async (req: Request, res: Response) => {
  const result = await updateSmsStatus(req.query.id);

  handleControllerResult(result, res);
};

const handleControllerResult = (result: Either<any, {}>, res: Response) => {
  if (result.isRight()) {
    const response: ResponseBody = {
      status: ResponseStatus.success,
      data: result.value,
    };

    res.json(response);
  } else {
    const response: ResponseBody = {
      status: ResponseStatus.failed,
      data: result.value,
    };

    res.status(400).send(response);
  }
};
