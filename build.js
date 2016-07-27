/**
 * Created by chenze on 16/7/16.
 */
"use strict"
//TODO convert to Promise or gulp
//TODO abstract setting to config.yml
const _ = require("lodash");
const yaml = require('js-yaml');
const fs   = require('fs');
const file = require('./lib/file.js');
const hljs = require('highlight.js');
// const imagemin = require('imagemin');
// const imageminMozjpeg = require('imagemin-mozjpeg');
// const imageminPngquant = require('imagemin-pngquant');
const Reg = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/;
// const md = require('markdown-it')({
//     html: true,
//     highlight: function (str, lang) {
//         if (lang && hljs.getLanguage(lang)) {
//             try {
//                 return `<pre class="hljs" lang=${lang}><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
//             } catch (__) {}
//         }

//         return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
//     }
// });
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
/*
* generate html snapshot
*/
function htmlSubstring(s, n) {
    var m, r = /<([^>\s]*)[^>]*>/g,
        stack = [],
        lasti = 0,
        result = '';

    //for each tag, while we don't have enough characters
    while ((m = r.exec(s)) && n) {
        //get the text substring between the last tag and this one
        var temp = s.substring(lasti, m.index).substr(0, n);
        //append to the result and count the number of characters added
        result += temp;
        n -= temp.length;
        lasti = r.lastIndex;

        if (n) {
            result += m[0];
            if (m[1].indexOf('/') === 0) {
                //if this is a closing tag, than pop the stack (does not account for bad html)
                stack.pop();
            } else if (m[1].lastIndexOf('/') !== m[1].length - 1) {
                //if this is not a self closing tag than push it in the stack
                stack.push(m[1]);
            }
        }
    }

    //add the remainder of the string, if needed (there are no more tags in here)
    result += s.substr(lasti, n);

    //fix the unclosed tags
    while (stack.length) {
        result += '</' + stack.pop() + '>';
    }

    return result;

}

/*
* generate post or photo id
*/
function generateId(title,date){
    title = title || '';
    var d = new Date(date),result = '';
    var _title = title[title.length-1];
    var _date = ''+d.getFullYear()+d.getMonth()+d.getDate();
    Array.from(_title+_date).forEach(v=>{
        result += v.codePointAt();
    })
    return result;
}
fs.readdir(__dirname+'/post',function (err,data) {
    if(err){console.log(`[Read Directory Error]: ${err}`)}
    _data.blog = [];
    data.forEach(function(v){
        var path = __dirname +'/post/' +v;
        var text,meta,content;
        text = Reg.exec(fs.readFileSync(path, 'utf8'));
        try{
            meta = yaml.safeLoad(text[2]);
            meta.id = generateId(meta.title,meta.date);
            content = md.render(text[3]);
            // meta.snapshot = content.replace(/(<([^>]+)>)/ig,'').substring(0,200);
            meta.snapshot = htmlSubstring(content,200);
            _list.push(meta);
            file.mkNestFileSync(`./api/${meta.id}.json`,JSON.stringify({meta,content}));
        }catch(e){
            console.log(`[Read Markdown Error]:In ${v}: ${e}`);
        }
    });
    yamlToPhoto('./photo/photo.yml').forEach((v,k,arr)=>{
        v.id = generateId(v.title,v.date);
        minImage('./photo/images/*.{jpg,png}')
        if(k == arr.length-1){
            file.mkNestFileSync(`./api/photoList.json`,JSON.stringify(arr));
        }
    });
    _list = _.sortBy(_list,function(n){
        return - new Date(n.date).getTime();
    });
    file.mkNestFileSync(`./api/list.json`,JSON.stringify(_list));
});
