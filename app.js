var input = require('./input');
var bfs = require('./bfs');

input.Read()
    .then(input.Parse)
    .then(bfs)
    .then((route) => {
        console.log(route);
    })
    .catch((err) => { console.log(err); });
