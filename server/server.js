const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {connection} = require('./DB/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id))
    {
       return res.status(400).send('Object ID is invalid!');
    }

    Todo.findByIdAndRemove(id)
    .then( (doc) => {
          !doc ? res.status(404).send() : res.send(doc);
    })
    .catch( (e) => {
        res.status(400).send(e);
    })
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id))
    {
       return res.status(400).send('Object ID is invalid!');
    }

    const body = _.pick(req.body, ['text', 'completed']);

    if(_.isBoolean(body.completed) && body.completed)
    {
        body.completedAt = new Date().getTime();
    }
    else
    {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then( (doc) => {
          !doc ? res.status(404).send() : res.send(doc);
    })
    .catch( (e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log('Started on port ' + port);
});