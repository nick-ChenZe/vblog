const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
/*
* compress image only support {.png|.jpg}
*/
exports.minImage = function(entry,output) {
    output = output || './api/images';
    imagemin([entry], output, {
        plugins: [
            imageminMozjpeg(),
            imageminPngquant({quality: '65-80'})
        ]
    })
}

