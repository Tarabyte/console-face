/*global require, __dirname, XMLHttpRequest*/
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
        function toUrl(name) {
            return [__dirname, 'faces', encodeURIComponent(getFileName(name))].join('/');
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