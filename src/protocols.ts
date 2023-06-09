import { Payment, Ticket } from '@prisma/client';

export enum AcceptedName {
  CannotEnrollBeforeStartDateError = 'CannotEnrollBeforeStartDateError',
  ConflictError = 'ConflictError',
  DuplicatedEmailError = 'DuplicatedEmailError',
  InvalidCredentialsError = 'InvalidCredentialsError',
  UnauthorizedError = 'UnauthorizedError',
  NotFoundError = 'NotFoundError',
  CannotListHotelsError = 'CannotListHotelsError',
  BadRequestError = 'BadRequestError',
  ForBiddenError = 'ForBiddenError',
  CannotBookingError = 'CannotBookingError',
  InternalServerError = 'InternalServerError',
  PaymentRequiredError = 'PaymentRequiredError',
  InvalidDataError = 'InvalidDataError',
  InvalidEmailError = 'InvalidEmailError',
}

export type ApplicationError = {
  name: AcceptedName;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

export type InputTicketBody = {
  ticketTypeId: number;
};
