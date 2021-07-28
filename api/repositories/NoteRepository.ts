'use strict'

import { BaseRepository } from "./base/BaseRepository";
import { Note } from "../entities/Note";
import mongodb from 'mongodb';

export class NoteRepository extends BaseRepository<Note>{
    /**
     * Encontra todos registros.
     */
    public async findAll() {
        return new Promise(async (res, rej) => {
            await this._collection.find({}).toArray(function(err, result) {
                if (err) rej(err);
            
                res(result);
            });
        });
    };

    /**
     * Deleta registro
     * @param _id
     */
    public async destroyOne(id: string) {
        return await this._collection.deleteOne({ _id: new mongodb.ObjectID(id) });
    };
};