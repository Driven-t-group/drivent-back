import httpStatus from 'http-status';
import supertest from 'supertest';
import { TicketStatus } from '@prisma/client';
import * as factory from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /activity/dates', () => {
  it('should respond with status 200 and dates', async () => {
    const user = await factory.createUser();
    const token = await generateValidToken(user);
    const enrollment = await factory.createEnrollmentWithAddress(user);
    const ticketType = await factory.createTicketTypeWithHotel();
    const ticket = await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const payment = await factory.createPayment(ticket.id, ticketType.price);

    const activities = await factory.createActivities();

    const response = await server.get('/activity/dates').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(['2023-05-10', '2023-05-11']);
  });

  it('should respond with status 404 when there are no activities', async () => {
    const user = await factory.createUser();
    const token = await generateValidToken(user);
    const enrollment = await factory.createEnrollmentWithAddress(user);
    const ticketType = await factory.createTicketTypeWithHotel();
    const ticket = await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const payment = await factory.createPayment(ticket.id, ticketType.price);

    const response = await server.get('/activity/dates').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 402 when user does not have a ticket', async () => {
    const user = await factory.createUser();
    const token = await generateValidToken(user);
    const enrollment = await factory.createEnrollmentWithAddress(user);

    const activities = await factory.createActivities();

    const response = await server.get('/activity/dates').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
  });

  it('should respond with status 402 when user has a ticket but it is not paid', async () => {
    const user = await factory.createUser();
    const token = await generateValidToken(user);
    const enrollment = await factory.createEnrollmentWithAddress(user);
    const ticketType = await factory.createTicketTypeWithHotel();
    const ticket = await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

    const activities = await factory.createActivities();

    const response = await server.get('/activity/dates').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
  });

  it('should respond with status 403 when user has a ticket but it is remote', async () => {
    const user = await factory.createUser();
    const token = await generateValidToken(user);
    const enrollment = await factory.createEnrollmentWithAddress(user);
    const ticketType = await factory.createTicketTypeRemote();
    const ticket = await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const payment = await factory.createPayment(ticket.id, ticketType.price);

    const activities = await factory.createActivities();

    const response = await server.get('/activity/dates').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });
});

describe('GET /activity/dates/:dateId', () => {
  it('should respond with status 200 and array of activities for the date', async () => {
    const user = await factory.createUser();
    const token = await generateValidToken(user);
    const enrollment = await factory.createEnrollmentWithAddress(user);
    const ticketType = await factory.createTicketTypeWithHotel();
    const ticket = await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const payment = await factory.createPayment(ticket.id, ticketType.price);

    const activity = await factory.createActivity();

    const activityDate = activity.startsAt.toISOString().split('T')[0];

    const response = await server.get('/activity/dates/' + activityDate).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe('POST /activity/subscribe/:activityId', () => {
  it('should respond with status 200', async () => {
    const user = await factory.createUser();
    const token = await generateValidToken(user);
    const enrollment = await factory.createEnrollmentWithAddress(user);
    const ticketType = await factory.createTicketTypeWithHotel();
    const ticket = await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const payment = await factory.createPayment(ticket.id, ticketType.price);

    const activity = await factory.createActivity();

    const response = await server.post('/activity/subscribe/' + activity.id).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});
