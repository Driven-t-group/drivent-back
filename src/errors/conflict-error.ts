import { AcceptedName, ApplicationError } from '@/protocols';

export function conflictError(message: string): ApplicationError {
  return {
    name: AcceptedName.ConflictError,
    message,
  };
}
