/**
 * Created by chenze on 16/7/16.
 */

//TODO convert to Promise
//TODO abstract setting to config.yml
const yaml = require('js-yaml');
const fs   = require('fs');
const file = require('./lib/file.js');
const hljs = require('highlight.js');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const Reg = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/;
const md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});
var _data = {};
var _list = [];
var _photo = [];
/*
* parse yaml file
*/
function yamlToPhoto(path) {
    try {
        return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        console.log(`[Load ${path} Error]: ${e}`);
    }
}
/*
* compress image only support {.png|.jpg}
*/
function minImage(entry,output) {
    output = output || './api/images';
    imagemin([entry], output, {
        plugins: [
            imageminMozjpeg(),
            imageminPngquant({quality: '65-80'})
        ]
    })
}

fs.readdir(__dirname+'/post',function (err,data) {
    if(err){console.log(`[Read Directory Error]: ${err}`)}
    _data.blog = [];
    var id = 0;
    data.forEach(function(v){
        var path = __dirname +'/post/' +v;
        var text,meta,content;
        text = Reg.exec(fs.readFileSync(path, 'utf8'));
        try{
            meta = yaml.safeLoad(text[2]);
            meta.id = id;
            _list.push(meta);
            content = md.render(text[3]);
            file.mkNestFileSync(`./api/${id}.json`,JSON.stringify({meta,content}));
        }catch(e){
            console.log(`[Read Markdown Error]:In ${v}: ${e}`);
        }
        id++;
    });
    yamlToPhoto('./photo/photo.yml').forEach((v,k,arr)=>{
        v.id = k;
        minImage('./photo/images/*.{jpg,png}')
        if(k == arr.length-1){
            file.mkNestFileSync(`./api/photoList.json`,JSON.stringify(arr));
        }
    });
    file.mkNestFileSync(`./api/list.json`,JSON.stringify(_list));
});
