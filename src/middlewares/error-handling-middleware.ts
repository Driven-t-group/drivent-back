import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError } from '@/protocols';

const acceptedErrors = {
  CannotEnrollBeforeStartDateError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  },
  ConflictError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  },
  DuplicatedEmailError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  },
  InvalidCredentialsError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  },
  UnauthorizedError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  },
  NotFoundError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  },
  CannotListHotelsError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  },
  BadRequestError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  },
  ForBiddenError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  },
  CannotBookingError(err: ApplicationError, res: Response) {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  },
  PaymentRequiredError(err: ApplicationError, res: Response){
    return res.status(httpStatus.PAYMENT_REQUIRED).send({
      message: err.message 
    })
  },
  InternalServerError(_err: ApplicationError, res: Response) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'InternalServerError',
      message: 'Internal Server Error',
    });
  },
  InvalidDataError(err: ApplicationError, res: Response){

  },
  InvalidEmailError(err: ApplicationError, res: Response){
    
  }
}

export function handleApplicationErrors(
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  try {
    acceptedErrors[err.name](err, res)
  } catch (error) {
    acceptedErrors['InternalServerError'](err, res)
  }
}
