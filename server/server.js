const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {connection} = require('./DB/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });
    todo.save()
    .then( (doc) => {
        res.send(doc);
    })
    .catch( (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find()
    .then( (doc) => {
        res.send({
            doc
        });
    })
    .catch( (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {
    
    const id = req.params.id;
    if(!ObjectID.isValid(id))
    {
       return res.status(400).send('Object ID is invalid!');
    }
   
    Todo.findById(req.params.id)
    .then( (doc) => {
          !doc ? res.status(404).send() : res.send(doc);
    })
    .catch( (e) => {
        res.status(400).send(e);
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});