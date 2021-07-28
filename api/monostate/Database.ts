'use strict'

import { Db, MongoClient, MongoError } from 'mongodb';
import { MonoStateInterface } from './MonoStateInterface';
import dotenv from 'dotenv';

/**
 * Classe monostate para dar boot na conexão com banco
 */
export class Database implements MonoStateInterface {
    private static _instance: Database;
    private _database: Db;
    private _dbClient: MongoClient;

    /**
     * Cria e ou retorna nova instância
     * @return Promise<Database>
     */
    public async getInstance(): Promise<Database> {
        return new Promise(async (resolve, reject) => {
            const { parsed }: any = dotenv.config();

            if(Database._instance)
                resolve(Database._instance);
            else
                Database._instance = new Database();

            Database._instance._dbClient = await MongoClient.connect(
                `${parsed.DB_CONNECTION}://${parsed.DB_HOST}`, { 
                    useUnifiedTopology: true 
                }
            );
            
            Database._instance._dbClient.connect((error: MongoError) => {
                if(error) reject(error);
                    
                Database._instance._database = Database._instance._dbClient.db(parsed.DB_DATABASE);
                resolve(Database._instance);
            });
        });
    };

    /**
     * Retorna conexão
     * @return Db
     */
    get db(): Db {
        return Database._instance._database;
    };

    /**
     * Retorna client
     * @return dbClient
     */
    get client(): MongoClient {
        return Database._instance._dbClient;
    };
};