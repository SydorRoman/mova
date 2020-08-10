const { DataStore } = require('notarealdb');
const store = new DataStore('../db');

module.exports = {
  liked: store.collection('liked'),
  history: store.collection('history')
}