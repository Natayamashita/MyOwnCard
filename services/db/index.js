const mongoose = require('mongoose');
const port = 'mongodb://127.0.0.1:27017/card-creator';

try {
    mongoose.connect(port);
    console.log('running on port: ' + port)
} catch(err) {
    console.log('Erro ao tentar se connectar com o banco: ' + port)
}

module.exports = mongoose;