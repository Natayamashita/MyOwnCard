const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require(`body-parser`);

app.use(cors());
app.listen(3000, function() {
    console.log('Server is running on port: 3000')
});

app.use(express.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

const routes = require('./routes.js')

routes(app);

module.exports = app;