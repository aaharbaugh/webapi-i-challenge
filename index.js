// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();
const users = db;

server.use(express.json());

server.get('/', (req, res) => {
    res.send(db);
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if(!newUser.name || !newUser.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    } else {

        users.insert(newUser)
        .then(addedUser => {
            res.status(201).json(addedUser)
        })
        .catch( ({ code, message }) => {
            res.status(code).json({err: message});
        })
    }
})

server.get('/api/users', (req, res) => {

    users.find()
    .then(allUsers => {
        res.status(201).json(allUsers)
    })
    .catch( ({ code, message }) => {
        res.status(code).json({err: message});
    })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    users.findById(id)
    .then(singleUser => {
        res.status(201).json(singleUser)
    })
    .catch( ({ code, message }) => {
        res.status(code).json({err: message});
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    users.remove(id)
    .then(removedUser => {
        res.status(201).json(removedUser)
    })
    .catch( ({ code, message }) => {
        res.status(code).json({err: message});
    })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const doChange = true;
    if(!changes.name || !changes.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    }

    users.update(id, changes)
    .then(updatedUser => {
        res.status(201).json(updatedUser)
    })
    .catch( ({ code, message }) => {
        res.status(code).json({err: message});
    })
})

server.listen(9090, () =>
  console.log('Server running on http://localhost:9090')
);