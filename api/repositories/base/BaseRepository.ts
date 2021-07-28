'use strict'

import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';

import { Db, Collection, InsertOneWriteOpResult } from 'mongodb';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _collection: Collection;

  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName);
  };

  async create(item: T): Promise<boolean> {
    const result: InsertOneWriteOpResult<any> = await this._collection.insertOne(item);
    return !!result.result.ok;
  };

  update(id: string, item: T): Promise<boolean> {
    throw new Error('Método não implementado.');
  };
  delete(id: string): Promise<boolean> {
    throw new Error('Método não implementado.');
  };
  find(item: T): Promise<T[]> {
    throw new Error('Método não implementado.');
  };
  findOne(id: string): Promise<T> {
    throw new Error('Método não implementado.');
  };
};