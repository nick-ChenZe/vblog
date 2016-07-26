/**
 * get title from file name
 *
 * @param title
 * @returns {string}
 */
export function onlyTitle(title) {
    // return title.replace(/^\d{4}-\d{1,2}-\d{1,2}-(.+?)\.md$/, '$1');
    return title.replace(/\.md$/, '')
                .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '');
}

/**
 * get date from file name
 *
 * @param title
 * @returns {array|null}
 */
export function onlyPublishDate(title) {
    // return /^\d{4}-(?:0?[1-9]|1[0-2])-\d{1,2}/.exec(title);
    return /^\d{4}-\d{1,2}-\d{1,2}/.exec(title);
}
/**
 * capitalize
 *
 * @param title
 * @returns {array|null}
 */
export function toCapitalize(value) {
     return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
/**
 * date
 *
 * @param title
 * @returns {array|null}
 */
export function dateAgo(value) {
    let date = new Date(value);
    let now = new Date();
    let y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate()
    let Y = now.getFullYear(),
        M = now.getMonth(),
        D = now.getDate();
    let _y = Y - y;
    let _m = M - m;
    let _d = D - d;
    if(date.getTime()>now.getTime()){
        return "未来"
    }else if(_y >= 1){
        return _y+'年前';
    }else if(_m >= 1){
        return _m+'个月前';
    }else if(_d >= 1){
        return _d+'天前';
    }else{
        return "刚刚";
    }
}

/**
 * splice the array
 *
 * @param value {Array}
 * @param num {Number}
 * @returns {array}
 */
export function limit(arr, limit) {
    if(Array.isArray(arr)){
        return arr.slice(0, new Number(limit));
    }
}

/**
 * parse date string to date YYYY/MM/DD
 *
 * @param value
 * @returns {String}
 */
export function date(value) {
	var date = new Date(value);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate()+1;
	month = month > 9 ? month : '0'+ month;
	day = day > 9 ? day : '0'+ day;
	return [year,month,day].join("/");
}