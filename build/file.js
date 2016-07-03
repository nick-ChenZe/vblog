/**
 * Created by chenze on 16/7/3.
 */
var fs = require("fs");

function mkNestFileSync(url,buffer,cb){
    var pathArr = url.split('/');
    var str = '';
    var mode = mode || 0o777; // file mode is need to optional?
    cb = cb || function(){};

    function inner(pathArr,mode,cb){
        var v = pathArr.shift();
        if(v){
            if(v.split('.').length > 1){
                str = str + v;
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
mkNestFileSync('a/b/c/index.html','123');
exports.mkNestFileSync = mkNestFileSync;
