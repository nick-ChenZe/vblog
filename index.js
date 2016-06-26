/**
 * Created by chenze on 16/6/18.
 */
var mm = require('marky-mark');
var fs = require('fs');
var ejs = require('ejs');
var YAML = require('yamljs');
//var toc  = require('markdown-toc');
var data = {};
data.setting = YAML.load('./_config.yml');
readFile = (src) => {return fs.readFileSync(src,'utf-8')};
var postTemplate = readFile('./source/template/post.ejs');
var catTemplate = readFile('./source/template/category.ejs');
var indexTemplate = readFile('./source/template/index.ejs');
mm.parseDirectory(__dirname + "/source/_posts", function(err, posts) {
    var path = __dirname + '/blog/';
    data.article = [];
    posts.forEach(v => {
        var date = new Date(v.meta.date).toLocaleDateString().split('/');
        data.article.push({
            year: date[2],
            month: date[0],
            date: date[1],
            content: v.content,
            title: v.meta.title,
            tags: v.meta.tags,
            category: v.meta.category,
            meta: v.meta,
            href: '/blog/'+date[2]+'/'+date[0]+'/'+date[1]+'/'
        });
    });
    ejs.renderFile(filename, data, options, function(err, str){

    });

});
//TODO Add toc filter
//TODO Add highlight in Server side