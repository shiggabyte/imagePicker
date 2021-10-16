const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Product = require('./routes/Product');
const User = require('./routes/User');

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use('/Users', User);
app.use('/Products', Product);

app.get('/', (req, res) => {
    res.send("Welcome to Image upload backend");
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});