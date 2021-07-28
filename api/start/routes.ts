'use strict'

import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { NotesController } from '../app/controllers/http/NotesController';

const Route = express.Router();

Route.get('/notas', async (req: Request, res: Response, next: NextFunction) => (
    await new NotesController()
        .index(req, res, next)
));

Route.post('/notas/criar', async (req: Request, res: Response, next: NextFunction) => (
    await new NotesController()
        .store(req, res, next)
));

Route.delete('/notas/excluir/:id', async (req: Request, res: Response, next: NextFunction) => (
    await new NotesController()
        .destroy(req, res, next)
));

export default Route;