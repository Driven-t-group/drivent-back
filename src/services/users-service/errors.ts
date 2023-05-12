import { AcceptedName, ApplicationError } from '@/protocols';

export function duplicatedEmailError(): ApplicationError {
  return {
    name: AcceptedName.DuplicatedEmailError,
    message: 'There is already an user with given email',
  };
}
