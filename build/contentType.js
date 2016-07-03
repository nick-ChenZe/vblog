/**
 * Created by chenze on 16/7/1.
 */
var path = require('path');
funGetContentType = function (filePath) {
    var contentType = "",
    ext=path.extname(filePath);

    switch(ext){
        case ".html":
            contentType= "text/html";
            break;
        case ".js":
            contentType="text/javascript";
            break;
        case ".css":
            contentType="text/css";
            break;
        case ".gif":
            contentType="image/gif";
            break;
        case ".jpg":
            contentType="image/jpeg";
            break;
        case ".png":
            contentType="image/png";
            break;
        case ".ico":
            contentType="image/icon";
            break;
        case ".manifest":
            contentType = "text/cache-manifest";
            break;
        default:
            contentType="application/octet-stream";
    }
    return contentType;
};
exports.getContentType = funGetContentType;