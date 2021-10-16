const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const salt = 10;

router.get('/', async (req, res) => {
    try {
        let response = await User.sync();
        response = await User.findAll();
        res.send(response);
    } catch (err) {
        res.status(422).send(err.message);
    }
});

router.post('/store', async (req, res) => {
    try {
        const { username, password } = req.body;
        bcrypt.hash(password, salt, async (err, hash) => {
            const [user, created] = await User.findOrCreate({
                where: { username: username },
                defaults: {
                    username: username,
                    password: hash,
                },
            });
            created
                ? res.send({ username: user.username, id: user.id })
                : res.send({ message: 'Username Already Taken' });
        });
    } catch (err) {
        res.status(422).send(err.message);
    }
})
module.exports = router;
