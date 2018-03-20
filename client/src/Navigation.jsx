import React, {Component} from 'react';
import './Navigation.css';

// Component
import Filter from './Filter';
import FilterControl from './FilterControl';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genres: ['All', 'Blues', 'Classical', 'Country', 'Hip-Pop', 'Jazz', 'Metal', 'Others', 'Pop', 'Rock', 'R&B'],
			isNavOpen: false
		};

		this.toggleNav = this.toggleNav.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	}

	render() {
		return (
			<nav className="sidenav">
				<div className={`mask ${this.state.isNavOpen ? 'mask-change' : ''}`} onClick={this.toggleNav}></div>
				<Filter genres={this.state.genres} onGenreChange={this.props.onGenreChange} onToggleNav={this.toggleNav} navState={this.state.isNavOpen} />
				<FilterControl currentGenre={this.props.currentGenre} onToggleNav={this.toggleNav} navState={this.state.isNavOpen} />
			</nav>
		);
	}
}

export default Navigation;