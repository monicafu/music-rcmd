import React, {Component} from 'react';
import './Toolbar.css';

class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rightBtnOn: false,
			invertBtnOn: false
		};

		this.sortHandler = this.sortHandler.bind(this);
	}

	sortHandler(event) {
		if (event.target.title.startsWith('Decrease')) {
			this.props.onOrderChange(false);
			this.setState({
				rightBtnOn: !this.state.rightBtnOn,
				invertBtnOn: false
			}); 
		}
		else {
			this.props.onOrderChange(true);
			this.setState({
				rightBtnOn: false,
				invertBtnOn: !this.state.invertBtnOn
			});
		}
	}

	render() {
		return (
			<div className="tool-bar">
				<div className="upload" title="Upload Music" onClick={this.props.onAdd}>
					<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
				</div>
				<div className="order-by">
					<div className="sort-btn">
						<div className={ `right-btn ${ this.state.rightBtnOn ? 'right-btn-change' : '' }` } onClick={this.sortHandler} title="Decrease by upvotes"></div>
						<div className={ `invert-btn ${ this.state.invertBtnOn ? 'invert-btn-change' : '' }` } onClick={this.sortHandler} title="Increase by upvotes"></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Toolbar;