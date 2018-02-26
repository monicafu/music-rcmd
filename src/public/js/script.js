
// --- Global ---
let musicList = [];
let currentGenre = 'All';
let currentIdPopup = 1;

// --- SAP initialization ---
function initSAP(json) {
	for (let song of json) {
		song.upvoted = '';
		musicList.push(song);
	}
	console.log(musicList);
	renderMusic(musicList);
	setStaticEventListener();
}

const callGetMusicJson = (url) => {
	return fetch(url)
	.then( response => {
		if(response.ok) {
			return response.json();
		}
		return Promise.reject('error-response-not-okay');
	})
	.catch((error) => {
		if (error.toString().startsWith('error-')) {
			return Promise.reject(error);
		}
		return Promise.reject('error-response-json-bad');
	});
};

const createInitUrl = () => {
	return '/getMusic';
}

const performGetRequest = () => {
	const url = createInitUrl();
	callGetMusicJson(url)
	.then(fromJson => {
		initSAP(fromJson);
	})
	.catch( error => {
		console.log(error);
	});
};

// --- Listener setting ---
const elements = {
	// Music render
	music: document.querySelector('.music'),
	// Filter control
	menuBtn: document.querySelector('.menu-btn'),
	nav: document.querySelector('nav'),
	filterItems: document.querySelectorAll('.filter a'),
	genreTip: document.querySelector('.genre-tip'),
	// Popup control
	popupContainer: document.querySelector('.popup-container'),
	popupMask: document.querySelector('.popup-mask'),
	popupCloseBtn: document.querySelector('.popup .close-btn'),
	// Popup fields
	inputTitle: document.querySelector('#title'),
	inputArtist: document.querySelector('#artist'),
	inputAlbum: document.querySelector('#album'),
	inputGenre: document.querySelector('#genre'),
	// Popup actions
	saveBtn: document.querySelector('.save'),
	deleteBtn: document.querySelector('.delete'),
	// Search bar
	searchBar: document.querySelector('.search-bar'),
	searchBtn: document.querySelector('.search-btn'),
	// Tool bar
	rightBtn: document.querySelector('.right-btn'),
	invertBtn: document.querySelector('.invert-btn')
};

function setStaticEventListener() {
	// Menu control
	elements.menuBtn.addEventListener('click', toggleMenu);
	elements.nav.addEventListener('click', toggleMenu);
	// Filter anchor control
	for (let item of elements.filterItems) {
		item.addEventListener('click', filterHandler);
	}
	// Search control
	// elements.searchBar.addEventListener();
	elements.searchBtn.addEventListener('click', searchHandler);
	// Popup control
	elements.popupMask.addEventListener('click', togglePopup);
	elements.popupCloseBtn.addEventListener('click', togglePopup);
	// Tool-bar actions
	elements.rightBtn.addEventListener('click', sortHandler);
	elements.invertBtn.addEventListener('click', sortHandler);
}

function setItemEventListener() {
	let upvotes = document.querySelectorAll('.upvote');
	let edits = document.querySelectorAll('.edit');
	// Add liseners to action module
	for (let upvote of upvotes) {
		upvote.addEventListener('click', upvoteHandler);
	}
	for (let edit of edits) {
		edit.addEventListener('click', editHandler);
	}
}

function setPopupEventListener() {		// id is music id
	elements.saveBtn.addEventListener('click', saveHandler);
	elements.deleteBtn.addEventListener('click', deleteHandler);
}

function resetPopupEventListener() {
	elements.saveBtn.removeEventListener('click', saveHandler);
	elements.deleteBtn.removeEventListener('click', deleteHandler);
}

// --- UI control ---
function toggleMenu() {
	elements.menuBtn.classList.toggle('btn-change');
	elements.nav.classList.toggle('nav-change');
	filter.classList.toggle('filter-change');
	// document.body.classList.toggle('scroll-prevent');
}

function switchGenre(anchor) {
	if (anchor.innerHTML === 'All') {
		elements.genreTip.innerHTML = 'Genre';
	}
	else {
		elements.genreTip.innerHTML = event.target.innerHTML;
	}
}

function toggleUpvote(upvote) {
	upvote.classList.toggle('upvoted');
}

function togglePopup() {
	elements.popupContainer.classList.toggle('popup-container-change');
}

function toggleRightBtn() {
	resetSortBtn();
	elements.rightBtn.classList.toggle('right-btn-change');
}

function toggleInvertBtn() {
	resetSortBtn();
	elements.invertBtn.classList.toggle('invert-btn-change');
}

function resetSortBtn() {
	elements.rightBtn.classList.remove('right-btn-change');
	elements.invertBtn.classList.remove('invert-btn-change');
}

function clearPopupInput() {
	elements.inputTitle.value = null;
	elements.inputArtist.value = null;
	elements.inputTitle.value = null;
	elements.inputGenre.value = null;
}

function clearSearchBar() {
	elements.searchBar.value = null;
}

// --- Event Listener Handler definitions ---
function filterHandler(event) {
	const anchor = event.target;
	currentGenre = anchor.innerHTML;
	renderMusic(getGenre(currentGenre));
	switchGenre(anchor);
	resetSortBtn();
}

function upvoteHandler(event) {
	const id = event.target.getAttribute('data-id');
	upvoteMusic(id);
	toggleUpvote(event.target);
	renderMusic(getGenre(currentGenre));
}

function editHandler(event) {
	// Refresh popup
	const id = event.target.getAttribute('data-id');
	currentIdPopup = id;
	renderPopup(getMusicObj(id));
	togglePopup();
	// Reset save and delete listeners
	resetPopupEventListener();
	// Add new save and delete listeners
	setPopupEventListener();
	clearPopupInput();
}

function sortHandler(event) {
	if (event.target.classList.contains('right-btn')) {
		renderMusic(sort(getGenre(currentGenre), true));
		toggleRightBtn();
	}
	else {
		renderMusic(sort(getGenre(currentGenre), false));
		toggleInvertBtn();
	}
}

function saveHandler() {
	saveMusic(currentIdPopup);
	renderMusic(getGenre(currentGenre));
	togglePopup();
}

function deleteHandler() {
	deleteMusic(currentIdPopup);
	renderMusic(getGenre(currentGenre));
	togglePopup();
}

function searchHandler() {
	const result = search(elements.searchBar.value);
	renderMusic(result);
	clearSearchBar();
}

// --- Render definition ---
function renderMusic(items) {  // items is an arr
	let result = '';
	for (let item of items) {
		result += `<div class="item">
			<img src="${item.image}" alt="${item.album}" />
			<div class="actions">
				<div class="upvote-module">
					<div class="upvote ${item.upvoted}" data-id="${item.id}"></div>
					<span class="upvote-tip">${item.upvotes} likes</span>
				</div>
				<div class="edit" data-id="${item.id}"></div>
			</div>
			<div class="title">${item.title}</div>
			<div class="artist">${item.artist}</div>
		</div>`;
	}
	elements.music.innerHTML = result;
	setItemEventListener();
}

function renderPopup(item) {  // item is an object
	elements.inputTitle.setAttribute('placeholder', item.title);
	elements.inputArtist.setAttribute('placeholder', item.artist);
	elements.inputAlbum.setAttribute('placeholder', item.album);
	elements.inputGenre.setAttribute('placeholder', item.genre);
}

// --- Functions ---
function getMusicObj(id) {
	let result = {};
	for (let music of musicList) {
		if (music.id == id) {
			result = music;
		}
	}
	return result;
}

function getGenre(genre){
	let result = [];
	if (genre === 'All') {
		result = musicList;
	}
	else {
		for (let music of musicList) {
			if (music.genre.replace(/\&/g, '&amp;') === genre) {
				result.push(music);
			}
		}
	}
	return result;
}

function search(input){
	let result = [];
    input = input.changeFormat(input);
    for (let music of getGenre(currentGenre)) {
		if (music.genre.toUpperCase() === input || music.album.toUpperCase() === input || music.artist.toUpperCase() === input || music.title.toUpperCase() === input ) {
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




//   ture: lowTohigh;  false: highToLow;
function sort(music, TOrF){
    if(TOrF === false){
        return lowTohigh(music);}
    else{
        return lowTohigh(music).reverse();}
}

function lowTohigh(music){
    for(let i = 0; i < music.length; i++){
        for(let j = i+1; j < music.length; j++){
        if(music[i].upvotes > music[j].upvotes) {
            let temp = music[i];
            music[i] = music[j];
            music[j] = temp;
            }
        }
    }
        return music;
}

// Edit music infomation
function saveMusic(musicID) {
    for (let music of musicList) {
        if (music.id == musicID) {
        	if (elements.inputTitle.value) {
           		music.title = elements.inputTitle.value;
        	}
        	if (elements.inputArtist.value) {
            	music.artist = elements.inputArtist.value;
       		}
       		if (elements.inputAlbum.value) {
            	music.album = elements.inputAlbum.value;
       		}
       		if (elements.inputGenre.value) {
           		music.genre = elements.inputGenre.value;
       		}
       		postSaveData(music);
        }
    }
}

function postSaveData(music) {
    let data = {
        id : music.id,
        title : music.title,
        artist : music.artist,
        album : music.album,
        genre : music.genre
    };

    fetch('/getSaveData', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    // TEST ONLY
    .then(print => console.log(print))
    .catch(error => console.log('Error:'));
}

function deleteMusic(musicID) {

		musicList.splice(musicID-1,1);
		//console.log(musicList);
		postDeleteData(musicID);
		renderMusic(musicList);
}

function postDeleteData(musicID) {
    let data = {id : musicID};

    fetch('/getDeleteData', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    // TEST ONLY
    //.then(print => console.log(print))
    .catch(error => console.log('Error:'));
}

function upvoteMusic(musicID) {
    for (let i in musicList) {
        if (musicList[i].id == musicID) {
            if (musicList[i].upvoted === '') {
                musicList[i].upvotes += 1;
                postLikes(musicID, true);
                musicList[i].upvoted = 'upvoted';
            } else if (musicList[i].upvoted === 'upvoted') {
                musicList[i].upvotes -= 1;
                postLikes(musicID, false);
                musicList[i].upvoted = '';
            }
        }
    }
}

function postLikes(musicID, flag) {
    let data = { id : musicID , isliked : flag };

    fetch('/getVotes', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    // TEST ONLY
    // .then(print => console.log(print))
    .catch(error => console.log('Error:'));
}



performGetRequest();