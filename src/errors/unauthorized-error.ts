import { AcceptedName, ApplicationError } from '@/protocols';

export function unauthorizedError(): ApplicationError {
  return {
    name: AcceptedName.UnauthorizedError,
    message: 'You must be signed in to continue',
  };
}
