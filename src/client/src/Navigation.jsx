import React,{ Component } from 'react';
import './Navigation.css';

import Filter from './Filter';
import FilterControl from './FilterControl';


class Navigation extends Component{
    constructor(props){
        super(props);
        this.state ={
            genreList:['All','Blues','Classical','Country','Hip-Pop','Jazz','Metal','Others','Pop','Rock','R&B'],
            isNavOpen:false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }
    toggleNav(){
        this.setState({
           isNavOpen:!this.state.isNavOpen
        });
    }
    render(){
        return (
            <nav className={`sidenav ${this.state.isNavOpen ? 'nav-change' :''}`} onClick={this.toggleNav}>
                <Filter genreList = {this.state.genreList} onGenreChange = {this.props.onGenreChange} onToggleNav = {this.toggleNav} navState = {this.state.isNavOpen}/>
                <FilterControl currentGenre = {this.state.currentGenre} onToggleNav = {this.toggleNav} navState = {this.state.isNavOpen}/>
            </nav>
        );
    }
}
export default Navigation;