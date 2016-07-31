var file = require('./file.js');
var generate = require('./generate.js')
var imagemin = require('./imagemin.js')
var substring = require('./substring.js')
var hljs = require('highlight.js');
var _ = require("lodash");
var yaml = require('js-yaml');

var Promise = require('promise');
var path = require('path');
var fs = require('fs');

const ROOT = path.resolve(__dirname,'../')
const Reg = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/;


const md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs" lang=${lang}><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});
function f1(url) {
    return new Promise(function (resolve, reject) {
        fs.readdir(`${ROOT}/post`,function (err,data) {
			if(err) reject(`[Read Directory Error]: ${err}`);
			resolve(_.remove(data,function(v){
                return /.md$/.test(v);
            }));
		});
    });
}
function f2(files){
	var q =[];
    files.forEach(function(v){
        var path = `${ROOT}/post/${v}`;
        q.push(Promise.resolve(Reg.exec(fs.readFileSync(path, 'utf8'))));
    })
    return q;
}
function f3(files){
	return new Promise(function (resolve,reject) {
		var content;
		var list = [];
		files.forEach(function(text){
			try{
		        meta = yaml.safeLoad(text[2]);
		       	meta.id = generate.generatedId(meta.title,meta.date);
                meta.length = text[3].length;
	       		content = md.render(text[3]);
	       		try{
		        	meta.snapshot = substring.substring(content);
	       		}catch(e){
	       			console.log(e);
	       		}
		        list.push({meta,content});
		    }catch(e){
		        reject(`[Read Markdown Error]:In ${v}: ${e}`);
		    }
		})
		resolve(list);
	});
}
function f4(lists) {
	var metaList = [];
    var totalStringLength = 0,tags =[];
    var listObject;
	lists.forEach(function(v){
        totalStringLength +=  v.content.length;
		metaList.push(v.meta);
	})
	var metaList =  _.sortBy(metaList,function(n){
        return - new Date(n.date).getTime();
    })
	metaList.forEach(function(v,k,o){
        if(Array.isArray(v.tags)){
            tags.push(v.tags);
        }
        var title = v.title,id = v.id;
        if(k == o.length-1){
            o[k-1].prev = {title,id}  
        }else if(k == 0){
            o[k+1].next = {title,id}  
        }else{
            o[k-1].prev = {title,id}  
            o[k+1].next = {title,id}  
        }
    });
    listObject = {
        totalStringLength: totalStringLength,
        tagNumber: _.uniq(_.flatten(tags)).length,
        lists: metaList
    }
    lists.map(s =>{
        s.meta =  _.omit(_.filter(metaList,{id: s.meta.id})[0],'snapshot');
    	file.mkNestFileSync(`${ROOT}/api/${s.meta.id}.json`,JSON.stringify(s));
    })
    try{
    	file.mkNestFileSync(`${ROOT}/api/list.json`,JSON.stringify(listObject));
    }catch(e){
    	console.log(`[Error in generating list JSON]: ${e}`);
    }
}
f1().then(function(files){
	return Promise.all(f2(files))
}).then(function(files){
	return f3(files);
}).then(function(lists){
	f4(lists);
})