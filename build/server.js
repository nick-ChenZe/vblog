/**
 * Created by chenze on 16/6/30.
 */
var HTTP = require('http');
var FS = require('fs');
var URL = require('url');
var PATH = require('path');
var GET_CONTENT_TYPE = require('./contentType.js');
readFile = (src) => {return FS.readFileSync(src,'utf-8')};
makeServer = (dirpath,port) => {
    console.log('server is start at: 0.0.0.0:'+port);
    HTTP.createServer(function(req,res){
        var content = '',path,extname,type;
        extname = PATH.extname(req.url);
        type = extname.length == 0 ? 'text/html': GET_CONTENT_TYPE.getContentType(req.url);
        if(req.url == '/favicon.ico'){
            return;
        }else{
            if(extname.length == 0){
                path = PATH.join(dirpath,URL.parse(req.url,true).pathname,'index.html');
                try{
                    content = readFile(path);
               }catch(e){
                   res.writeHead(200,{'Content-Type':type});
                   content = e.toString();
               }
            }else{
                res.writeHead(200,{'Content-Type':type});
                content = 'not support';
            }
        }
        res.end(content);
    }).listen(port);
};
makeServer('./blog',3000);
exports.makeServer = makeServer;

//TODO Add Image Router