console.face = function(name){
    var face = getFace(name);
    face && face();
};

var facesCache = {};

function getFace(name) {
    var face = facesCache[name];
    if(!face){
        console.log('Need to load');    
    }
    
    return face;
}