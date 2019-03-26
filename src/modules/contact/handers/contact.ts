import { Request, Response } from 'express';
import { Either } from 'fp-ts/lib/Either';

import { createContact, deleteContact, getContact, updateContact } from 'src/controllers/Contact';
import { ContactUpdateDetails } from 'src/controllers/Contact/interface';
import { ResponseBody, ResponseStatus } from 'src/modules/interfaces';

export const createContactHandler = async (req: Request, res: Response) => {
  const result = await createContact(req.body);

  handleControllerResult(result, res);
};

export const updateContactHandler = async (req: Request, res: Response) => {
  const result = await updateContact(req.query.id, req.body);

  handleControllerResult(result, res);
};

export const deleteContactHandler = async (req: Request, res: Response) => {
  const result = await deleteContact(req.query.id);

  handleControllerResult(result, res);
};

export const getContactHandler = async (req: Request, res: Response) => {
  const result = await getContact(req.query.id);

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
