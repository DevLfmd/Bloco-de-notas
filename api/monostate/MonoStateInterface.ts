'use strict'

import { Database } from './Database';
import { Env } from './Env';
import { Logger } from './Logger'; 

export interface MonoStateInterface {
    getInstance(): Promise<Database | Env | Logger>;
};