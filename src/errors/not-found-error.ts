import { AcceptedName, ApplicationError } from '@/protocols';

export function notFoundError(): ApplicationError {
  return {
    name: AcceptedName.NotFoundError,
    message: 'No result for this search!',
  };
}
