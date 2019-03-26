import { Request, Response } from 'express';
import { Either } from 'fp-ts/lib/Either';

import { createContact, deleteContact, getContact, updateContact } from 'src/controllers/Contact';
import { ContactUpdateDetails } from 'src/controllers/Contact/interface';
import { ResponseBody, ResponseStatus } from 'src/modules/interfaces';

/**
 * Handler triggered by POST /contact
 *
 * @param  {Request} req
 * @param  {Response} res
 * @return {void}
 */
export const createContactHandler = async (req: Request, res: Response) => {
  const result = await createContact(req.body);

  handleControllerResult(result, res);
};

/**
 * Handler triggered by PUT /contact
 *
 * @param  {Request} req
 * @param  {Response} res
 * @return {void}
 */
export const updateContactHandler = async (req: Request, res: Response) => {
  const result = await updateContact(req.query.id, req.body);

  handleControllerResult(result, res);
};

/**
 * Handler triggered by DELETE /contact
 *
 * @param  {Request} req
 * @param  {Response} res
 * @return {void}
 */
export const deleteContactHandler = async (req: Request, res: Response) => {
  const result = await deleteContact(req.query.id);

  handleControllerResult(result, res);
};

/**
 * Handler triggered by GET /contact
 *
 * @param  {Request} req
 * @param  {Response} res
 * @return {void}
 */
export const getContactHandler = async (req: Request, res: Response) => {
  const result = await getContact(req.query.id);

  handleControllerResult(result, res);
};

/**
 * Processes the result returned by the handler
 *
 * @param  {Either<any, {}>} result
 * @param  {Response} res
 * @return {void}
 */
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
