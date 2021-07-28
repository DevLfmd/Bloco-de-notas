'use strict'

import { Db } from 'mongodb';

const note_migration = async(db: Db) => {
    db.createCollection("notes", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["subject", "text"],
                properties: {
                    subject: {
                        bsonType: "string",
                        description: "Assunto"
                    },
                    text: {
                        bsonType: "string",
                        description: "Descrição de assunto"
                    }
                }
            }
        }
    });
};