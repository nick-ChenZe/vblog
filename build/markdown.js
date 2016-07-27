// const hljs = require('highlight.js');
// const md = require("markdown-it");

// exports.render = function (str) {
	
// 	try{
// 		md({
// 		    html: true,
// 		    highlight: function (str, lang) {
// 		        if (lang && hljs.getLanguage(lang)) {
// 		            try {
// 		                return `<pre class="hljs" lang=${lang}><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
// 		            } catch (__) {}
// 		        }
// 		        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
// 		    }
// 		}).render(str);
// 	}catch(e){
// 		console.log(e)
// 	}
// }