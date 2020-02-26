/*POST字符串解析JSON对象*/
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    // 利用了ES6提供的forOf，可以找找相关的看看
    for (let [index, queryStr] of queryStrList.entries()) {
        // 进行切割
        let itemList = queryStr.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}


module.exports = parseQueryStr