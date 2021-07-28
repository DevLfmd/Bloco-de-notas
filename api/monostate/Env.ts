'use strict'

import { MonoStateInterface } from './MonoStateInterface';
import dotenv from 'dotenv';

/**
 * Classe monostate para enviroment
 */
export class Env implements MonoStateInterface {
    private static _instance: Env;
    private env: any;

    public constructor() {
        this.env = dotenv.config();
    };

    /**
     * Retorna instância ou cria e retorna
     * @return Promise<Env>
     */
    public async getInstance(): Promise<Env> {
        return new Promise((resolve, reject) => {
            if(Env._instance)
                resolve(Env._instance);
            else
                Env._instance = new Env();
                    
            resolve(Env._instance);
        }); 
    };
};