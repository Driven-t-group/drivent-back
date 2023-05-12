import { ApplicationError, AcceptedName } from '@/protocols';

export function badRequestError(): ApplicationError {
  return {
    name: AcceptedName.BadRequestError,
    message: 'Bad Request Error!',
  };
}
