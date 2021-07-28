'use strict'

import { Logger } from '../monostate/Logger';
import { Database } from '../monostate/Database';
import { Env } from '../monostate/Env';

/**
 * Função factory para retornar
 * instancias do monostate
 */
export class MonoStateFactory {
    public static async create(type: string): Promise<any> {
        return (type === 'Database') ? (
            await new Database().getInstance()
        ) : (type === 'Env') ? (
            await new Env().getInstance()
        ) : (type === 'Logger') ? ( 
            await new Logger().getInstance()
        ) : (null);
    };
};