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
			resolve(data);
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
	       		content = md.render(text[3]);
	       		try{
		        	meta.snapshot = substring.substring(content,200);
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
	var metaList = []
	lists.forEach(function(v){
		metaList.push(v.meta);
	})
	var metaList =  _.sortBy(metaList,function(n){
        return - new Date(n.date).getTime();
    })
	metaList.forEach(function(v,k,o){
    	if(k == 0){
    		v.next = null;
    	}else if(k == o.length-1){
    		v.prev == null;
    	}else{
    		o[k-1].next = {
    			title: v.title,
    			id: v.id
    		}
    		o[k+1].prev = {
    			title: v.title,
    			id: v.id
    		}
    	}
    });
    lists.map(s =>{
        s.meta =  _.omit(_.filter(metaList,{id: s.meta.id})[0],'snapshot');
    	file.mkNestFileSync(`${ROOT}/api/${s.meta.id}.json`,JSON.stringify(s));
    })
    try{
    	file.mkNestFileSync(`${ROOT}/api/list.json`,JSON.stringify(metaList));
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