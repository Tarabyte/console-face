/*global describe, it, require*/
var t = require('assert');
require('../');

var consoleWatcher = function() {
    var cache = [],
        log = console.log,    
       watcher = function() {
        cache.push([].slice.call(arguments, 0).join(''));
        log.apply(console, arguments);   
    };
    
    watcher.clear = function() {
        return cache.splice(0);
    };
    
    watcher.get = function() {
        return cache.slice(0);    
    };
    
    watcher.restore = function() {
        console.log = log;    
    };
    
    return watcher;
};

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
        console.log = consoleWatcher();
        console.face('troll');
        var data = console.log.get();
    
        t.equal(1, data.length, 'was called 1: ' + data.length);
        
        t.equal(troll, data[0], 'troll face logged');
        console.log.restore();
    });
    
    it('should use troll by default', function() {
        console.log = consoleWatcher();
        console.face();
        var data = console.log.get();
        
        t.equal(troll, data[0], 'troll face logged by defaut');
        console.log.restore();
    });
    
    it('should use troll for 404', function() {
        console.log = consoleWatcher();
        console.face('something im sure is not there' + Date.now());
        var data = console.log.get();
        
        t.equal(troll, data[0], 'troll face logged for images absent');
        console.log.restore();
    });
    
    it('should ignore case', function() {
        console.log = consoleWatcher();
        console.face('LoL');
        var data = console.log.get();
        
        t.equal(lol, data[0], 'lol loaded');
        console.log.restore();
    });
});
