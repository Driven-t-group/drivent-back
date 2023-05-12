import { AcceptedName, ApplicationError } from '@/protocols';

export function cannotListHotelsError(): ApplicationError {
  return {
    name: AcceptedName.CannotListHotelsError,
    message: 'Cannot list hotels!',
  };
}
