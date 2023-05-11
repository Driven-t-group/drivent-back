import { AcceptedName, ApplicationError } from '@/protocols';

export function cannotBookingError(): ApplicationError {
  return {
    name: AcceptedName.CannotBookingError,
    message: 'Cannot booking this room! Overcapacity!',
  };
}
