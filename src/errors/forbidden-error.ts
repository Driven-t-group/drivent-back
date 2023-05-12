import { ApplicationError } from '@/protocols';
import { AcceptedName } from '@/protocols';

export function forBiddenError(): ApplicationError {
  return {
    name: AcceptedName.ForBiddenError,
    message: 'Forbidden Error!',
  };
}
