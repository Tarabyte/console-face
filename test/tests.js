/*global describe, it, require*/
var t = require('assert');
require('../');

var consoleWatcher = console.log = (function(log) {
    var cache = [], 
       watcher = function() {
        cache.push([].slice.call(arguments, 0).join(''));
        log.apply(this, arguments);   
    };
    
    watcher.clear = function() {
        return cache.splice(0);
    };
    
    watcher.get = function() {
        return cache.slice(0);    
    };    
    
    return watcher;
}(console.log.bind(console)));

var troll = [           "░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░░",
                        "░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░",
                        "░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░",
                        "░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░",
                        "░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░",
                        "█░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█",
                        "█░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█",
                        "░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░",
                        "░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░",
                        "░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░",
                        "░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░",
                        "░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░",
                        "░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░",
                        "░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░",
                        "░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░"
                    ].join('\r\n'),
    lol = [             "░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░░░░░",
                        "░░░░░░▄▄█▀▀░░░░░░░░░░░░▀██▄▄▄▄▄░░░░░░",
                        "░░░░▄█▀░▄▄█▀▀▀▀░░░░░░░░░░░░▄█████▄░░░",
                        "░░▄█▀▄▄█▀░▄▀▀▀▀█▄░░░░░░░░▄▀▀░░▄██▄░░░",
                        "░▄▀░▀▀▀░▄▀░░░░░░░█░░░░░░█░░░░░▀▀░█░░░",
                        "░█░░░░░░█░▄▄▄░░░░█▄░░░░░█░░░░░░░▄█▄░░",
                        "█▀░░░░░▀█▄▀█▀░░░░█░░░░░░▀▄▄▄▄▄▄██▄█░░",
                        "█░░░░░░░░▀▀▄▄▄▄▄▀░░░░░░░░░▄▀░░▄▄░▀█▄░",
                        "█░░░░░░░░░░░░░░░░░░░░▄░▀▀█▀░█▀░▀▀▄░█░",
                        "█░░░░░░░░░░░░░░░░░░░░░░░█▀░█▀▀▀▀██░▀█",
                        "█░░░░░░░░░░░░░░░░░░░░░░░█░▄█▀▀▀▀▀███░",
                        "█░░░░░░░░░░░░░░░░░░░░░░░█░██░░░░░█░█░",
                        "▀█░░░░░░░░░░░░░░░░░░░░░░████░░░░█▀█▀░",
                        "░█░░░░░░░░░░░░░░░░░░░░░░███▀░░░░█░█░░",
                        "░░█░░░░░░░░░░░░░░░░░░░░░█░█░░░░░█░░█░",
                        "░░▀▄░░░░░░░░░░░░░░░░░░░▄▀░█▀▀▀▄░▀▄░█░",
                        "░░░▀▄░░░░░░░░░░░░▄▄░░░░█░░█▄▄▄▄█▄█░█░",
                        "░░░░▀▄░░░░░░░░░░░░░▀▀▄░█░░█▄██▀▄█░░█░",
                        "░░░░░▀█░░░░░░░░░░░░░░░▀█░░█▄░░▀█▀░▄▀░"].join('\r\n');

describe('console.face', function() {
    it('should be defined', function() {
        t.equal('function', typeof console.face);        
    });
    
    it('should run console.log', function() {
        consoleWatcher.clear();
        console.face('troll');
        var data = consoleWatcher.get();
    
        t.equal(1, data.length, 'was called 1: ' + data.length);
        
        t.equal(troll, data[0], 'troll face logged');
    });
    
    it('should use troll by default', function() {
        consoleWatcher.clear();
        console.face();
        var data = consoleWatcher.get();
        
        t.equal(troll, data[0], 'troll face logged by defaut');
    });
    
    it('should use troll for 404', function() {
        consoleWatcher.clear();
        console.face('something im sure is not there' + Date.now());
        var data = consoleWatcher.get();
        
        t.equal(troll, data[0], 'troll face logged for images absent');
    });
    
    it('should ignore case', function() {
        consoleWatcher.clear();
        console.face('LoL');
        var data = consoleWatcher.get();
        
        t.equal(lol, data[0], 'lol loaded');
    });
});
