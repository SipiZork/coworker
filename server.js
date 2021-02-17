const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/check', require('./routes/api/check'));
// app.use('/api/holiday', require('./routes/api/holiday'));
// app.use('/api/title', require('./routes/api/title'));

app.get('/', (req, res) => {
  res.send('API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));