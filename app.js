var input = require('./input');

input.Read()
    .then(input.Parse)
    .catch((err) => { console.log(err); });
