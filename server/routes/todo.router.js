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

module.exports = todoRouter;