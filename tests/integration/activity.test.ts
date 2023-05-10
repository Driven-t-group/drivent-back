import httpStatus from 'http-status';
import supertest from 'supertest';
import { TicketStatus } from '@prisma/client';
import * as factory from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /event/dates', () => {
  it('should respond with status 200 and dates', async () => {
    const event = await factory.createEvent();

    const user = await factory.createUser();
    const token = await generateValidToken(user);
    const enrollment = await factory.createEnrollmentWithAddress(user);
    const ticketType = await factory.createTicketTypeWithHotel();
    const ticket = await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const payment = await factory.createPayment(ticket.id, ticketType.price);

    const response = await server.get('/event/dates');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        //to implement
      },
    ]);
  });
});

describe('GET /event/dates/:dateId', () => {
  it('should respond with status 200 and array of events for the date', async () => {
    const event = await factory.createEvent();

    const response = await server.get('/event/dates/{DATE_HERE}');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        //to implement
      },
    ]);
  });
});

describe('POST /event/subscribe/:eventId', () => {
  it('should respond with status 200', async () => {
    const event = await factory.createEvent();

    const response = await server.post('/event/subscribe/${event.id}');

    expect(response.status).toBe(httpStatus.OK);
  });
});
