
// --- Data ---
let userData = {};
let musicList = {};
let renderBuff = [];
let currentGenre = 'All';

// --- Listener setting ---
const elements = {
	searchBar: document.querySelector('.search-bar'),
	searchBtn: document.querySelector('.search-btn'),

	login: document.querySelector('.login'),

	filterItems: document.querySelectorAll('.filter a'),

	music: document.querySelector('.music .list')
}

function setEventListener() {
	elements.searchBtn.addEventListener('click', searchHandler);

	for (let item of elements.filterItems) {
		item.addEventListener('click', filterHandler);
	}
}

// --- Handlers ---

function searchHandler() {
	updateRenderBuff(search(elements.searchBar.value));
	render();
}

function filterHandler(event) {
	const anchor = event.target;
	currentGenre = anchor.innerHTML;
	updateRenderBuff(getGenre(currentGenre));
	render();
}


// --- Render ---
function render() {
	let list = '';

	for (let item of renderBuff) {
		list += `<li>${item.title} - ${item.artist} - ${item.genre}</li>`;
	}
	elements.music.innerHTML = list;
	setEventListener();
}

function renderLogin() {
	elements.login.innerHTML += `<b>Welcome, ${userData.name}(id: ${userData.id}).</b>`;
}

function updateRenderBuff(items) {  // items is an array
	renderBuff = items;
}

// --- Others ---
function objToArr(obj) {
	let arr = [];
	for (let i in obj) {
		arr.push(obj[i]);
	}
	return arr;
}

function getGenre(genre){
	let result = [];
	if (genre === 'All') {
		result = objToArr(musicList);
	}
	else {
		for (let music of objToArr(musicList)) {
			if (music.genre.replace(/\&/g, '&amp;') === genre) {
				result.push(music);
			}
		}
	}
	return result;
}

function search(input){
	let result = [];
    input = changeFormat(input);
    for (let music of getGenre(currentGenre)) {
		if (music.album.toUpperCase().match(input) || music.artist.toUpperCase().match(input) || music.title.toUpperCase().match(input) ) {
            result.push(music);
		}
	}
	return result;
}

function changeFormat(input){
    let res = "";
    for(let i = 0; i < input.length;i++){
        if(input[i] !== " "){
            res += input[i];
        }
        else{i++;}
    }
    return res.toUpperCase();
}


// --- HTTP Request methods ---
const callGetRequest = (url) => {
	return fetch(url)
	.then( res => res.ok? res.json() : Promise.reject(res.text()) )
	.catch( error => Promise.reject('Get-failed') );
};

const callPostRequest = (url, data) => {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		header: new Headers( {'Content-Type': 'application/json'} )
	})
	.then( res => res.ok ? res.json() : Promise.reject(res.text()) )
	.catch( error => Promise.reject('Post-failed') );
};


// --- Init ---
function initSAP() {
	updateRenderBuff(objToArr(musicList));
	render();
	renderLogin();
}

async function loadData() {
	const user = await callGetRequest('/getUserData');
	userData = await user;
	const music = await callPostRequest('/getMusic', {id: user.id} );
	musicList = music;
	initSAP();
	// console.log(userData);
	// console.log(musicList);
}

loadData();