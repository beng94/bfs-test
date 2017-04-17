process.env.NODE_ENV = 'test';

var expect = require('chai').expect;

var input = require('../input');
var bfs = require('../bfs');
var cases = require('./cases');

function _runTestCase(casee) {
    describe(casee.name, (done) => {
        it("should return correct output", (done) => {
            input.Parse(casee.input)
                .then(bfs)
                .then((route) => {
                    expect(route).to.equal(casee.output);
                    done();
                })
                .catch((err) => done(err));
        });
    });
}

for(var i = 0; i < cases.length; i++) {
    _runTestCase(cases[i]);
}
