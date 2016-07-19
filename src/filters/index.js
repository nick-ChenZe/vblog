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

export function date(value) {
	var date = new Date(value);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate()+1;
	month = month > 9 ? month : '0'+ month;
	day = day > 9 ? day : '0'+ day;
	return [year,month,day].join("/");
}