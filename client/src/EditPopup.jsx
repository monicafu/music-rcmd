import React from 'react';
import './EditPopup.css';

const EditPopup = ( {openState, item, onClose, onSave, onDelete} ) => {

	const closeHandler = () => {
		onClose();
	}

	const saveHandler = () => {
		onSave(item.id);
		onClose();
	}

	const deleteHandler = () => {
		onDelete(item.id);
		onClose();
	}

	return (
		<div id="edit-popup" className={ `popup-container ${ openState ? 'popup-container-change' : '' }` }>
			<div className="popup-mask" onClick={closeHandler}></div>
			<div className="popup">
				<div className="close-btn" onClick={closeHandler}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/></svg></div>
				<div className="field">
					<label htmlFor="title-edit">Title</label>
					<input type="text" id="title-edit" name="title" placeholder={item.title} />
				</div>
				<div className="field">
					<label htmlFor="artist-edit">Artist</label>
					<input type="text" id="artist-edit" name="artist" placeholder={item.artist} />
				</div>
				<div className="field">
					<label htmlFor="album-edit">Album</label>
					<input type="text" id="album-edit" name="album" placeholder={item.album} />
				</div>
				<div className="field">
					<label htmlFor="genre-edit">Genre</label>
					<select id="genre-edit" name="genre" defaultValue={item.genre}>
						<option value="Blues">Blues</option>
						<option value="Classical">Classical</option>
						<option value="Country">Country</option>
						<option value="Hip-Pop">Hip-Pop</option>
						<option value="Jazz">Jazz</option>
						<option value="Metal">Metal</option>
						<option value="Others">Others</option>
						<option value="Pop">Pop</option>
						<option value="Rock">Rock</option>
						<option value="R&B">R&B</option>
					</select>
				</div>
				<div className="field">
					<div id="provider">{ 'Provided by ' }<b>{item.providerName}</b></div>
				</div>
				<div className="btn-group">
					<button className="save-btn" onClick={saveHandler}>Save</button>
					<button className="delete-btn" onClick={deleteHandler}>Delete Music</button>
				</div>
			</div>
		</div>
	);
};

export default EditPopup;