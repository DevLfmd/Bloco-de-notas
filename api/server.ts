'use strict'

import { debug } from 'debug';
import app from './start/kernel';

const env = require('dotenv').config();

app.listen(env.parsed.PORT, () => {
  debug(`Servidor online na porta: ${env.parsed.PORT}`);
});