const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // Parseia o corpo da requisição como JSON
app.listen(3000, function() {
    console.log('Server is running on port: 3000')
});

const routes = require('./routes.js')

routes(app);

module.exports = app;