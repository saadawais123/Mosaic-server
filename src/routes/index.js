const express = require('express');
const { verifyToken } = require('../services/token.service');

const authRoutes = require('./auth');
const userRoutes = require('./user');

const app = express();

app.use('/auth', authRoutes);
app.use('/user', verifyToken, userRoutes);

module.exports = app;
