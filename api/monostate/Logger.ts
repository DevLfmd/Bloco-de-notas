'use strict'

import { MonoStateInterface } from './MonoStateInterface';
import { debug } from 'debug';

/**
 * Tipagem de logs
 */
type Logs = {
    message: string;
    timestamp: string;
}[];

/**
 * Classe Monostate para logs.
 */
export class Logger implements MonoStateInterface {
    private static _instance: Logger;
    private logs: Logs = [];

    /**
     * Retorna instância ou cria e retorna
     * @return Promise<Logger>
     */
    public async getInstance(): Promise<Logger> {
        return new Promise((resolve, reject) => {
            if(Logger._instance) 
                resolve(Logger._instance)
            else
                Logger._instance = new Logger();
                
            resolve(Logger._instance);
        });    
    };

    /**
     * Retorna quantidade de logs
     * @returns number
     */
    public get count() {
        return this.logs.length;
    };

    /**
     * Lança novo log
     * @param message mensagem à ser lançada
     * @return void 
     */
    public log(message: string) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        debug(`${timestamp} - ${message}`);
    };
};