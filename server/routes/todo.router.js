const express = require('express')
const todoRouter = express.Router();
const pool = require('../modules/pool.js')

todoRouter.post('/', (req, res) => {
    console.log(req.body)
    let newTask = req.body;
    let queryText = `
        INSERT INTO "todo" ("task", "complete", "notes")
        VALUES ($1, $2, $3);`
    let queryValues = [
        newTask.item, 
        newTask.complete, 
        newTask.note
    ]
    pool.query(queryText, queryValues).then(results => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500)
    })
})

todoRouter.get('/', (req, res) => {
    console.log('in get')
    let queryText = 'SELECT * FROM "todo" ORDER BY "task";';

    pool.query(queryText).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500)
    })
})

todoRouter.put('/:id', (req,res) => {
    const id = req.params.id;
    queryText =`
        UPDATE "todo"
        SET "complete" = TRUE
        WHERE "id" = $1;`
    pool.query(queryText, [id]).then(result => {
        res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500);
    })
})

todoRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    const queryText =`
        DELETE FROM "todo"
        WHERE "id" = $1;`
    pool.query(queryText, [id]).then(result => {
        res.sendStatus(200);
    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = todoRouter;