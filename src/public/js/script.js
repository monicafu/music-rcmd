// --- Global ---
let userData = {};
let musicList = {};
let renderBuff = [];
let currentGenre = 'All';
let currentIdPopup = 1;


// --- SAP initialization ---
function initSAP() {
	console.log(userData);
	updateRenderBuff(objToArr(musicList));
	renderMusic();
	renderLogin();
	setStaticEventListener();
}

async function loadData() {
	const user = await callGetRequest('/getUserData');
	const music = await callPostRequest('/getMusic', {id: user.id} );
	userData = user;
	musicList = music;
	initSAP();
}

const callGetRequest = (url) => {
	return fetch(url)
	.then( res => res.ok? res.json() : Promise.reject(res.text()) )
	.catch( error => Promise.reject('Get-failed: ' + error) );
};

const callPostRequest = (url, data) => {
	return fetch(url, {
		method: 'POST',
		body: data,
	})
	.then( res => res.ok ? res.json() : Promise.reject(res.text()) )
	.catch( error => Promise.reject('Post-failed: ' + error) );
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
	// Edit popup control
	popupContainerEdit: document.querySelector('#edit-popup.popup-container'),
	popupMaskEdit: document.querySelector('#edit-popup .popup-mask'),
	popupCloseBtnEdit: document.querySelector('#edit-popup .close-btn'),
	// Edit popup fields
	inputTitleEdit: document.querySelector('#title-edit'),
	inputArtistEdit: document.querySelector('#artist-edit'),
	inputAlbumEdit: document.querySelector('#album-edit'),
	selectGenreEdit: document.querySelector('#genre-edit'),
	optionsGenreEdit: document.querySelector('#genre-edit').options,
	providerEdit: document.querySelector('#provider'),
	// Edit popup actions
	saveBtn: document.querySelector('.save-btn'),
	deleteBtn: document.querySelector('.delete-btn'),
	// Upload popup control
	popupContainerUpload: document.querySelector('#upload-popup.popup-container'),
	popupMaskUpload: document.querySelector('#upload-popup .popup-mask'),
	popupCloseBtnUpload: document.querySelector('#upload-popup .close-btn'),
	// Upload popup fields
	inputImgUpload: document.querySelector('#img-upload'),
	imgPreview: document.querySelector('.img-preview'),
	inputTitleUpload: document.querySelector('#title-upload'),
	inputArtistUpload: document.querySelector('#artist-upload'),
	inputAlbumUpload: document.querySelector('#album-upload'),
	selectGenreUpload: document.querySelector('#genre-upload'),
	optionsGenreUpload: document.querySelector('#genre-upload').options,
	// Upload popup actions
	uploadBtn: document.querySelector('.upload-btn'),
	// Search bar
	searchBar: document.querySelector('.search-bar'),
	searchBtn: document.querySelector('.search-btn'),
	// Tool bar
	upload: document.querySelector('.upload'),
	rightBtn: document.querySelector('.right-btn'),
	invertBtn: document.querySelector('.invert-btn'),
	// Login
	userName: document.querySelector('.user-name')
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
	elements.searchBtn.addEventListener('click', searchHandler);
	elements.searchBar.addEventListener('keydown', searchEnterHandler);
	// Edit popup control
	elements.popupMaskEdit.addEventListener('click', toggleEditPopup);
	elements.popupCloseBtnEdit.addEventListener('click', toggleEditPopup);
	// Upload popup control
	elements.upload.addEventListener('click', openUploadPopup);
	elements.popupMaskUpload.addEventListener('click', toggleUploadPopup);
	elements.popupCloseBtnUpload.addEventListener('click', toggleUploadPopup);
	// Upload popup actions
	// elements.imgPreview.addEventListener('error', previewErrorHandler);
	elements.inputImgUpload.addEventListener('change', uploadImgHandler);
	elements.uploadBtn.addEventListener('click', uploadHandler);
	// Sort by
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

function setEditPopupEventListener() {	
	elements.saveBtn.addEventListener('click', saveHandler);
	elements.deleteBtn.addEventListener('click', deleteHandler);
}

function resetEditPopupEventListener() {
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

// function toggleUpvote(upvote) {
// 	upvote.classList.toggle('upvoted');
// }

function toggleEditPopup() {
	elements.popupContainerEdit.classList.toggle('popup-container-change');
}

function toggleUploadPopup() {
	elements.popupContainerUpload.classList.toggle('popup-container-change');
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

function clearEditPopupInput() {
	elements.inputTitleEdit.value = null;
	elements.inputArtistEdit.value = null;
	elements.inputAlbumEdit.value = null;
}

function clearUploadPopup() {
	elements.inputTitleUpload.value = null;
	elements.inputArtistEdit.value = null;
	elements.inputAlbumEdit.value = null;
	elements.imgPreview.src = null;
}

function clearSearchBar() {
	elements.searchBar.value = null;
}


// --- Event Listener Handler definitions ---
function filterHandler(event) {
	const anchor = event.target;
	currentGenre = anchor.innerHTML;
	updateRenderBuff(getGenre(currentGenre));
	renderMusic();
	switchGenre(anchor);
	resetSortBtn();
	clearSearchBar();
}

function upvoteHandler(event) {
	const id = event.target.getAttribute('data-id');
	upvoteMusicFromBuff(upvoteMusic(id));
	// toggleUpvote(event.target);
	renderMusic();
}

function editHandler(event) {
	// Refresh popup
	const id = event.target.getAttribute('data-id');
	currentIdPopup = id;
	renderEditPopup();
	toggleEditPopup();
	// Reset save and delete listeners
	resetEditPopupEventListener();
	// Add new save and delete listeners
	setEditPopupEventListener();
	clearEditPopupInput();
}

function sortHandler(event) {
	if (event.target.classList.contains('right-btn')) {
		updateRenderBuff(sort(getGenre(currentGenre), true));
		toggleRightBtn();
	}
	else {
		updateRenderBuff(sort(getGenre(currentGenre), false));
		toggleInvertBtn();
	}

	renderMusic();
}

function saveHandler() {
	saveMusicFromBuff(saveMusic(currentIdPopup));
	renderMusic();
	toggleEditPopup();
}

function deleteHandler() {
	deleteMusic(currentIdPopup);
	deleteMusicFromBuff(currentIdPopup);
	renderMusic();
	toggleEditPopup();
}

function searchHandler() {
	updateRenderBuff(search(elements.searchBar.value));
	renderMusic();
	elements.searchBar.blur();
	// clearSearchBar();
}

function searchEnterHandler(event) {
	if (event.keyCode === 13) {
		searchHandler();
	}
}

function openUploadPopup() {
	renderUploadPopup();
	toggleUploadPopup();
}

function uploadImgHandler(event) {
	let file = event.target.files[0];

	let type = file.type.split('/')[0];
	if (type != 'image') {
		alert('Must be image.');
		return;
	}

	let reader = new FileReader();
	reader.onload = (event) => {
		let dataURL = event.target.result;
		elements.imgPreview.src = dataURL;
		elements.imgPreview.style.display = null;
	};
	reader.readAsDataURL(file); 
}

function uploadHandler() {
	uploadMusic()
	.then( music => {
		musicList = music;
		toggleUploadPopup();
		updateRenderBuff(getGenre(currentGenre));
		renderMusic();
	})
	.catch( error => console.log(error));
}

// This handler didn't work
// function previewErrorHandler(event) {
// 	console.log('Error');
// 	elements.imgPreview.style.display = none;
// }


// --- Render definition ---
function renderLogin() {
	elements.userName.innerHTML += `${userData.name}`;
}

function renderMusic() {  // items is an arr
	let result = '';

	if (renderBuff.length === 0) {
		result = setPlaceholder();
	}

	for (let item of renderBuff) {
		result += `<div class="item">
			<img src="${item.image}" alt="${item.album}" />
			<div class="actions">
				<div class="upvote-module">
					<div class="upvote ${ userData.like.indexOf(item.id) < 0 ? '': 'upvoted' }" data-id="${item.id}"></div>
					<span class="upvote-tip">${item.upvote} likes</span>
				</div>
				<div class="edit" title="Edit Music" data-id="${item.id}"></div>
			</div>
			<div class="title">${item.title}</div>
			<div class="artist">${item.artist}</div>
		</div>`;
	}
	elements.music.innerHTML = result;
	setItemEventListener();
}

function renderEditPopup() { 
	const item = musicList[currentIdPopup];
	elements.inputTitleEdit.setAttribute('placeholder', item.title);
	elements.inputArtistEdit.setAttribute('placeholder', item.artist);
	elements.inputAlbumEdit.setAttribute('placeholder', item.album);
	for (let i in elements.optionsGenreEdit) {
		if (elements.optionsGenreEdit[i].value === item.genre) {
			elements.optionsGenreEdit[i].selected = true;
			break;
		}
	}
	elements.providerEdit.innerHTML = `Provided by <b>${item.providerName}</b>`;
}

function renderUploadPopup() {
	for (let i in elements.optionsGenreUpload) {
		if (elements.optionsGenreUpload[i].value == currentGenre) {
			elements.optionsGenreUpload[i].selected = true;
			break;
		}
		elements.optionsGenreUpload[6].selected = true;
	}
}

function setPlaceholder() {
	const searchValue = elements.searchBar.value;

	if (searchValue !== '') {
		return `<div class="placeholder">No music/artist/album matches <i class="result-hightlight">${searchValue}</i> in <span class="result-hightlight">${currentGenre}</span>.</div>`;
	}
	else {
		return `<div class="placeholder">No music in <span class="result-hightlight">${currentGenre}</span> for now. Find bigger music world in other genres.</div>`;
	}
}


// --- Render buffer manipulations ---
function updateRenderBuff(items) {  // items is an array
	renderBuff = items;
}

function saveMusicFromBuff(music) {
	const index = getIndexInBuff(music.id);
	renderBuff[index] = music;
}

function deleteMusicFromBuff(musicId) {
	const index = getIndexInBuff(musicId);
	renderBuff.splice(index, 1);
}

function upvoteMusicFromBuff(music) {
	let index = getIndexInBuff(music.id);
	renderBuff[index] = music;
}


// --- Functions ---
function objToArr(obj) {
	let arr = [];
	for (let i in obj) {
		arr.push(obj[i]);
	}
	return arr;
}

function getIndexInBuff(id) {
	for (let i in renderBuff) {
		if (id === renderBuff[i].id) {
			return i;
		}
	}
	return -1;
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
}

//   ture: lowTohigh;  false: highToLow;
function sort(music, TOrF){
    if(TOrF === false){
        return objToArr(lowTohigh(music));}
    else{
        return objToArr(lowTohigh(music)).reverse();}
}

function lowTohigh(music){
    for(let i = 0; i < music.length; i++){
        for(let j = i+1; j < music.length; j++){
        if(parseInt(music[i].upvote) > parseInt(music[j].upvote)) {
            let temp = music[i];
            music[i] = music[j];
            music[j] = temp;
            }
        }
    }
    return music;
}

// --- Edit music infomation ---
// Save
function saveMusic(musicId) {
    for (let i in musicList) {
        if (i == musicId) {
        	if (elements.inputTitleEdit.value) {
           		musicList[i].title = elements.inputTitleEdit.value;
        	}
        	if (elements.inputArtistEdit.value) {
            	musicList[i].artist = elements.inputArtistEdit.value;
       		}
       		if (elements.inputAlbumEdit.value) {
            	musicList[i].album = elements.inputAlbumEdit.value;
       		}
       		musicList[i].genre = elements.optionsGenreEdit[elements.selectGenreEdit.selectedIndex].value;
       		postSaveData(musicList[i]);

   			return musicList[i];
        }
    }
}

function postSaveData(music) {
    const data = {
    	id: music.id,
        title : music.title,
        artist : music.artist,
        album : music.album,
        genre : music.genre
    };

    fetch('/updateMusic', {
        method: 'POST',
        body: JSON.stringify(data),
        // headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .catch(error => console.log('Error: ' + error));
}

// Delete
function deleteMusic(musicId) {
	postDeleteData(musicId);
	delete musicList[musicId];
}

function postDeleteData(musicId) {
    let data = {id : musicId};

    fetch('/deleteMusic', {
        method: 'POST',
        body: JSON.stringify(data),
        // headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .catch(error => console.log('Error: ' + error));
}

// Upvote
function upvoteMusic(musicId) {
    for (let i in musicList) {
        if (i === musicId) {
        	let index = userData.like.indexOf(musicId);
            if (index < 0) {
                musicList[i].upvote++;
                userData.like.push(musicId);
                postLikes(musicId, true, userData.id);
            } else {
                musicList[i].upvote--;
                userData.like.splice(index, 1);
                postLikes(musicId, false, userData.id);
            }

            return musicList[musicId];
        }
    }
}

function postLikes(musicId, flag, userId) {
    let data = { id : musicId , isLiked : flag , userId: userId};

    fetch('/updateUpvote', {
        method: 'POST',
        body: JSON.stringify(data),
        // headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.status))
    .catch(error => console.log('Error: ' + error));
}

// Upload
function uploadMusic() {
	let data = new FormData();
	data.append('title', elements.inputTitleUpload.value);
	data.append('artist', elements.inputArtistUpload.value);
	data.append('album', elements.inputAlbumUpload.value);
	data.append('genre', elements.optionsGenreUpload[elements.selectGenreUpload.selectedIndex].value);
	data.append('providerId', userData.id);
	data.append('image', elements.inputImgUpload.files[0]);

	return callPostRequest('/uploadMusic', data);
}


// --- Start APP ---
loadData();