import { AcceptedName, ApplicationError } from '@/protocols';

export function invalidDataError(details: string[]): ApplicationInvalidateDataError {
  return {
    name: AcceptedName.InvalidDataError,
    message: 'Invalid data',
    details,
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};
