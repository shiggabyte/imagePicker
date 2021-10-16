const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const fs = require('fs');
const uuidv4 = require('uuid');
const DIR = "../public";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.get('/', (req, res) => {
    let response = Product.sync();
    response = Product.findAll();
    res.send(response);
});
router.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        console.log(req.file) // Here you will get the file 
        return res.status(200).send('Done');
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let result = `Your name is ${id}`;
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;
