import { ApplicationError, AcceptedName } from '@/protocols';

export function forBiddenError(): ApplicationError {
  return {
    name: AcceptedName.ForBiddenError,
    message: 'Forbidden Error!',
  };
}
