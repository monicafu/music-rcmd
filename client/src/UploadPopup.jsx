import React, {Component} from 'react';
import './UploadPopup.css'

class UploadPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			record: {},
			preview: null
		}

		this.getInput = this.getInput.bind(this);
		this.getImage = this.getImage.bind(this);
		this.uploadHandler = this.uploadHandler.bind(this);
	}

	getInput(event) {
		let record = this.state.record;
		record[event.target.name] = event.target.value;

		this.setState({
			record
		});
	}

	getImage(event) {
		let record = this.state.record;
		let file = event.target.files[0];

		let type = file.type.split('/')[0];
		if (type !== 'image') {
			alert('Must be image.');
			return;
		}

		let reader = new FileReader();
		reader.onload = (event) => {
			let dataURL = event.target.result;
			record.image= file;
			this.setState({
				record,
				preview: dataURL
			});
		};
		reader.readAsDataURL(file); 
	}

	uploadHandler() {
		this.props.onUpload(this.state.record);
		this.props.onClose();
	}

	render() {
		let imgPreview = null;
		if (this.state.preview) {
			imgPreview = (
				<img className="img-preview" src={this.state.preview} alt="Album Preview" />
			);
		}

		return (
			<div id="upload-popup" className={ `popup-container ${ this.props.openState ? 'popup-container-change' : '' }` }>
				<div className="popup-mask" onClick={this.props.onClose}></div>
				<div className="popup">
					<div className="close-btn" onClick={this.props.onClose}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/></svg></div>
					<div className="img-field">
						<label htmlFor="img-upload" id="upload-icon"></label>
						{ imgPreview }
						<input type="file" id="img-upload" name="image" onChange={this.getImage} />
					</div>
					<div className="field-wrapper">
						<div className="field">
							<label htmlFor="title-upload">Title</label>
							<input type="text" id="title-upload" name="title" placeholder="Music Title" required="required" onChange={this.getInput} />
						</div>
						<div className="field">
							<label htmlFor="artist-upload">Artist</label>
							<input type="text" id="artist-upload" name="artist" placeholder="Artist Name" required="required" onChange={this.getInput} />
						</div>
						<div className="field">
							<label htmlFor="album-upload">Album</label>
							<input type="text" id="album-upload" name="album" placeholder="Album Name" required="required" onChange={this.getInput} />
						</div>
						<div className="field">
							<label htmlFor="genre-upload">Genre</label>
							<select id="genre-upload" name="genre" defaultValue='Others' onChange={this.getInput} >
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
					</div>
					<div className="btn-group">
						<button className="upload-btn" onClick={this.uploadHandler}>Upload</button>
					</div>
				</div>
			</div>
		);
	}
}

export default UploadPopup;