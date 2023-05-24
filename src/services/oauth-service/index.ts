import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Session } from '@prisma/client';
import { exclude } from '@/utils/prisma-utils';
import { upsertUser } from '@/repositories/oauth-repository';
import sessionRepository from '@/repositories/session-repository';

export async function createUserOrSession(code: string) {
  const { client_id, client_secret } = process.env;

  const params = '?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code;

  console.log(client_id, client_secret);

  const token = await axios.get('https://github.com/login/oauth/access_token' + params, {
    headers: {
      Accept: 'application/json',
    },
  });

  const userData = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: 'Bearer ' + token.data.access_token,
    },
  });

  const oauthId = userData.data.id;

  const user = await upsertUser(oauthId);
  const session = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token: session,
  };
}

async function createSession(userId: number): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}
