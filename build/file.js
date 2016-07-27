/**
 * Created by chenze on 16/7/3.
 */
var fs = require("fs");
var path = require('path');
function mkNestFileSync(url,buffer,cb,mode){
    url = path.resolve(url);
    var pathArr = url.split('/');
    var str = '';
    if(cb && typeof cb != 'function'){
        mode = cb;
    }
    mode = mode || 0o777;
    cb = cb || function(){};

    function inner(pathArr,mode,cb){
        var v = pathArr.shift();
        var len = pathArr.length;
        if(len > -1){
            if(v.split('.').length > 1){
                str = str +'/'+ v;
                fs.writeFile(str,buffer, function (e) {
                    if(e) console.log(e);
                });
            }else{
                str = str + v + '/';
                fs.stat(str,function(result){
                    if(!!result){
                        fs.mkdir(str,mode);
                    }
                    inner(pathArr,mode,cb);
                })
            }
        }else{
            cb();
        }
    }
    inner(pathArr,mode,cb);
}
exports.mkNestFileSync = mkNestFileSync;