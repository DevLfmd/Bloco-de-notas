'use strict'

import express from 'express';
import { MonoStateFactory } from '../factory/MonoStateFactory';
import { corsConfig } from '../config/cors';
import { bodyParser } from '../config/bodyParser';

import routes from './routes';
import compression from 'compression';
import cors from 'cors';

const app = express();

(async (app) => {
  const logger = await MonoStateFactory.create('Logger');
  const database = await MonoStateFactory.create('Database');
  const env = await MonoStateFactory.create('Env');
  
  app.use(compression())
    .use(cors(corsConfig))
    .use(bodyParser)
    .set('db', database)
    .set('logger', logger)
    .set('env', env.env.parsed)
    .use('/api', routes)
})(app);

export default app;