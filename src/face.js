/*global require, __dirname, XMLHttpRequest, window*/
console.face = function(name){
    getFace(name)();
};

var facesCache = {},
    folder = 'faces',
    defaultName = 'troll',
    getFileName = function(name) {
        return name.replace(/\s+/g, '_').toLowerCase() + '.txt';
    },
    transport = typeof window === 'undefined' ? //node env
    (function(){
        function toPath(name) {
            return path.join(__dirname, folder, getFileName(name));
        }
        
        var fs = require('fs'), 
            path = require('path');
        
        return function(name) {
            var src;
            try {
                src = fs.readFileSync(toPath(name), {encoding: 'utf-8'});
            }
            finally {
                return src ? compiler(src) : troll;    
            }
            
        };
    }()): //browser
    (function(){
        var separator = '/';
        
        function toUrl(name) {
            var base = window.location.pathname.split(separator), parts = [];
            base.pop();
            base = base.concat(__dirname.split(/\/|\\/), [folder]);
            
            base.forEach(function(part) {
                if(!part) { 
                    return;    
                }
                if(part === '.') { //current dir
                    return;    
                }
                
                if(part === '..') { //parent
                    return parts.pop();    
                }
                
                return parts.push(part);
            });
            
            parts.push(getFileName(name));
            
            return parts.join(separator);
        }
        
        return function(name) {
            var request = new XMLHttpRequest();
            request.open('GET', toUrl(name), false);
            request.send(null);

            return request.status === 200 ? compiler(request.responseText) : troll;
        };
    }()),
    compiler = function(src) {
        return function() {
            console.log(src);
        };        
    },
    troll;

function getFace(name) {
    var face = facesCache[name||defaultName];
    if(!face){
        facesCache[name] = face = transport(name);
    }
    
    return face;
}

troll = getFace(defaultName);