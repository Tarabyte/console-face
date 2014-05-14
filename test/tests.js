/*global describe, it, require*/
var t = require('assert');

require('../');
describe('console.face', function() {
    it('should be defined', function() {
        t.equal('function', typeof console.face);
        
    });
});
