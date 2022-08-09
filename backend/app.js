//config
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const jobRouter = require('./routes/jobRouter');
const userRouter = require('./routes/userRouter');
const seekerRouter = require('./routes/seekerRouter');
const employerRouter = require('./routes/employerRouter');
const utilRouter = require('./routes/utilRouter');

//app
const app = express();
mongoose.connect('mongodb://localhost:27017/jobPortal', { useNewUrlParser: true });

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//route
app.use('/jobs', jobRouter);
app.use('/users', userRouter);
app.use('/employers', employerRouter);
app.use('/seekers', seekerRouter);
app.use('/utils', utilRouter);

app.use((req, res, next) => {
    next(new Error('Route Not Found'));
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err });
});

app.listen(3000, () => { console.log("listening on 3000") });