import React from 'react';
import './MusicList.css';

const MusicList = ( {items, like, currentGenre, searchContent, onUpvote, onEdit} ) => {
	const upvoteHandler = (event) => {
		const id = event.target.getAttribute('data-id');
		onUpvote(id);
	};

	const editHandler = (event) => {
		const id = event.target.getAttribute('data-id');
		onEdit(id);
	}

	const placeholder = ( () => {
		if (searchContent !== null) {
			return (
				<div className="placeholder">
					{ 'No music/artist/album matches ' }<i className="result-hightlight">{searchContent}</i>{ ' in ' }<span className="result-hightlight">{currentGenre}</span>
				</div>
			);
		}
		else {
			return (
				<div className="placeholder">
					{ 'No music in ' }<span className="result-hightlight">{currentGenre}</span>{ ' for now. Explore bigger music worlds in other genres.' }
				</div>
			);
		}
	} )();

	const list = items.map( (item, index) => {
		return (
			<div className="item" key={index}>
				<img src={item.image} alt={item.album} />
				<div className="actions">
					<div className="upvote-module">
						<div className={ `upvote ${ like.indexOf(item.id) < 0 ? '': 'upvoted' }` } data-id={item.id} onClick={upvoteHandler}></div>
						<span className="upvote-tip">{` ${item.upvote} likes`}</span>
					</div>
					<div className="edit" title="Edit Music" data-id={item.id} onClick={editHandler}></div>
				</div>
				<div className="title">{item.title}</div>
				<div className="artist">{item.artist}</div>
			</div>
		);
	});

	return (
		<div className="music-list">
			{ items.length === 0 ? placeholder : list }
		</div>
	);
};

export default MusicList;