import {callPostRequest} from './services.js';

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

// --- Sort ---
export const sort = (list, loToHi) => {
    if(loToHi){
        return objToArr(lowTohigh(list));}
    else{
        return objToArr(lowTohigh(list)).reverse();}
};

const lowTohigh = (list) => {
    for(let i = 0; i < list.length; i++){
        for(let j = i+1; j < list.length; j++){
	        if(parseInt(list[i].upvote, 10) > parseInt(list[j].upvote, 10)) {
	            let temp = list[i];
	            list[i] = list[j];
	            list[j] = temp;
	        }
        }
    }
    return list;
};

// --- Search ---
export const search = (input, items) => {
	if (input == null) {
		return items;
	}

	let result = [];
    input = changeFormat(input);
    for (let item of items) {
		if (item.album.toUpperCase().match(input) || item.artist.toUpperCase().match(input) || item.title.toUpperCase().match(input) ) {
            result.push(item);
		}
	}
	return result;
};

const changeFormat = (input) => {
    let result = "";
    for (let i = 0; i < input.length; i++){
        if (input[i] !== " ") {
            result += input[i];
        }
        else {
        	i++;
        }
    }
    return result.toUpperCase();
};

// --- Upvote ---
export const postUpvote = (musicId, flag, userId) => {
    const data = {
    	id: musicId,
    	isLiked: flag,
    	userId: userId
    };
    callPostRequest('/updateUpvote', JSON.stringify(data));
};

// --- Edit ---
export const postSave = (music) => {
	const data = {
    	id: music.id,
        title : music.title,
        artist : music.artist,
        album : music.album,
        genre : music.genre
    };
    callPostRequest('/updateMusic', JSON.stringify(data));
};

// --- Delete ---
export const postDelete = (musicId) => {
    const data = {id : musicId};
    callPostRequest('/deleteMusic', JSON.stringify(data));
};