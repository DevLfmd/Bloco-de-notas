'use strict'

import { Request, Response, NextFunction } from 'express';
import { Note } from '../../../entities/Note';
import { NoteRepository } from '../../../repositories/NoteRepository';

export class NotesController {
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async index(req: Request, res: Response, next: NextFunction) {
        const { db } = req.app.get('db');
        
        const repository = new NoteRepository(db, 'notes');
        const notes = await repository.findAll();
        
        return res.json({ notes });
    };

    /**
     * Criação de nota
     * @param req 
     * @param res 
     * @param next 
     */
    public async store(req: Request, res: Response, next: NextFunction) {
        const { db } = req.app.get('db');
        const { subject, text } = req.body.note;

        const new_note = new Note(subject, text);
        const repository = new NoteRepository(db, 'notes');
        await repository.create(new_note);

        return res.json({ subject, text });
    };

    /**
     * Excluir nota
     * @param req 
     * @param res 
     * @param next 
     */
    public async destroy(req: Request, res: Response, next: NextFunction) {
        const { db } = req.app.get('db');
        const { id } = req.params;
        const repository = new NoteRepository(db, 'notes');
        console.log(await repository.destroyOne(id));
        console.log(id)
    };
};