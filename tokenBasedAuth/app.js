const express = require('express');

const authRegRoutes = require('./routes/authRegRoutes');
const authLogRoutes = require('./routes/authLogRoute');
const authRoutes = require('./routes/authRoute');
const todoRoutes = require('./routes/todoRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRegRoutes);
app.use('/api/auth', authLogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;