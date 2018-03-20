import React, {Component} from 'react';

// Component
import Toolbar from './Toolbar';
import MusicList from './MusicList';
import EditPopup from './EditPopup';
import UploadPopup from './UploadPopup';

class Music extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditPopupOpen: false,
			isUploadPopupOpen: false,
			currentItemId: null
		};

		this.toggleEditPopup = this.toggleEditPopup.bind(this);
		this.toggleUploadPopup = this.toggleUploadPopup.bind(this);
	}

	toggleEditPopup(musicId) {
		this.setState({
			isEditPopupOpen: !this.state.isEditPopupOpen,
			currentItemId: musicId || null
		});
	}

	toggleUploadPopup() {
		this.setState({
			isUploadPopupOpen: !this.state.isUploadPopupOpen
		});
	}

	render() {
		let editPopup = null;
		if (this.state.currentItemId) {
			editPopup = (
				<EditPopup openState={this.state.isEditPopupOpen}
						   item={this.props.musicList[this.state.currentItemId]}
						   onClose={this.toggleEditPopup}
						   onSave={this.props.onSave}
						   onDelete={this.props.onDelete} />
			);
		}

		return (
			<main className="music">
				<Toolbar onOrderChange={this.props.onOrderChange} onAdd={this.toggleUploadPopup} />
				<MusicList items={this.props.renderBuff} 
						   like={this.props.userData.like}
						   currentGenre={this.props.currentGenre}
						   searchContent={this.props.searchContent}
						   onUpvote={this.props.onUpvote}
						   onEdit={this.toggleEditPopup} />
				{ editPopup }
				<UploadPopup openState={this.state.isUploadPopupOpen} onClose={this.toggleUploadPopup} onUpload={this.props.onUpload} />
			</main>
		);
	}
}


export default Music;