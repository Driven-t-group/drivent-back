import { AcceptedName, ApplicationError } from '@/protocols';

export function cannotEnrollBeforeStartDateError(): ApplicationError {
  return {
    name: AcceptedName.CannotEnrollBeforeStartDateError,
    message: 'Cannot enroll before event start date!',
  };
}
