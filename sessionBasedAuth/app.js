const express = require('express');
const sessionConfig = require('./config/session');
const connectDB = require('./config/db');
const authRoute = require('./route/authRoute');
const tokenAuthRoute = require('./route/tokenAuthRoute');
const tokenAuth = require('./middleware/tokenAuth');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(sessionConfig);

// Session-based Auth Routes
app.use('/api/auth', require ('./route/authRoute'));

// Token-based Auth Routes
app.use('/api/auth', tokenAuthRoute);

// Protected Routes (Token-based)
app.use('/api/todos', tokenAuth, require ('./route/todoRoute'));

module.exports = app; 

