import express from 'express';
import axios from 'axios';

import { upsertUser, createSession } from '@/repositories/oauth-repository';

export async function createUserOrSession(code: string) {
  const { client_id, client_secret } = process.env;

  const params = '?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code;

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
}
