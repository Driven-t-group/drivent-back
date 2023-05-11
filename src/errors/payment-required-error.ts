import { AcceptedName, ApplicationError } from '@/protocols';

export function paymentRequiredError(): ApplicationError {
  return {
    name: AcceptedName.PaymentRequiredError,
    message: 'Payment required!',
  };
}
