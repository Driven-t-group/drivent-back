import { AcceptedName, ApplicationError } from '@/protocols';

export function invalidCredentialsError(): ApplicationError {
  return {
    name: AcceptedName.InvalidCredentialsError,
    message: 'email or password are incorrect',
  };
}
