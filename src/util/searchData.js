const createSearchData = (data) => {
    const searchData = {};
    Object.keys(data).forEach((key) => {
        const attrs = key.split('@@');
        if(!searchData[attrs[0]]){
            searchData[attrs[0]] = {}
        }
        searchData[attrs[0]][attrs[1]] = data[key];
    })
    return searchData;
}

export default  createSearchData;