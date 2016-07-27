exports.generatedId = function(title,date){
    title = title || '';
    var d = new Date(date),result = '';
    var _title = title[title.length-1];
    var _date = ''+d.getFullYear()+d.getMonth()+d.getDate();
    Array.from(_title+_date).forEach(v=>{
        result += v.codePointAt();
    })
    return result;
}