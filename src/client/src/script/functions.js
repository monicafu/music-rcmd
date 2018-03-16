// --- Genre ---
export const objToArr = (obj) => {
    let arr = [];
    for (let i in obj) {
        arr.push(obj[i]);
    }
    return arr;
};

export const getGenre = (genre, list) => {
    let result = [];
    if (genre === 'All') {
        result = objToArr(list);
    }
    else {
        for (let item of objToArr(list)) {
            if (item.genre === genre) {
                result.push(item);
            }
        }
    }
    return result;
};