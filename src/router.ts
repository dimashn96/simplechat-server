import * as express from 'express';
import {config} from './config';
import {DataBaseService} from './services/DataBaseService';

// Router
const router = express.Router();

// Add user
router.put('/user', (req, res) => {
    DataBaseService.addUser(req.body);
    res.sendStatus(201);
});

// Get user by name
router.get('/user/:name', (req, res) => {
    DataBaseService.getUser(req.params.name)
    .exec((err, users) => {
        if (err) throw err;
        res.send(users[0] || {});
    })
});

// Get users
router.get('/users', (req, res) => {
    DataBaseService.getUsers()
    .exec((err, users) => {
        if (err) throw err;
        res.send(users);
    })
});

// Get messages
router.get('/messages', (req, res) => {
    DataBaseService.getMessages()
    .exec((err, messages) => {
        if (err) throw err;
        res.send(messages);
    })
});

module.exports = router;
