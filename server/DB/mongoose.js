const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const options = {
  user: 'test',
  pass: 'Qwe12345'
}
//var connection = mongoose.createConnection('mongodb://localhost:27017/TodoApp?poolSize=4');
//const connection = mongoose.createConnection('mongodb://test:Qwe12345@ds034797.mlab.com:34797/node-api-test');
const connection = mongoose.createConnection('mongodb://ds034797.mlab.com:34797/node-api-test', options);

module.exports = {
    connection
};