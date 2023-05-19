const express = require('express');
const { verifyToken } = require('../services/token.service');

const authRoutes = require('./auth');
const userRoutes = require('./user');
const interestRoutes = require('./interest');
const stanceRoutes = require('./stance');

const app = express();

app.use('/auth', authRoutes);
app.use('/user', verifyToken, userRoutes);
app.use('/interests', verifyToken, interestRoutes);
app.use('/stance', verifyToken, stanceRoutes);

module.exports = app;
