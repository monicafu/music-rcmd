import React from 'react';
import './App.css';


const Filter = ({genreList,onGenreChange,onToggleNav,navState}) => {

    const filterHandler = (event) => {
        onGenreChange(event.target.innerHTML.replace(/&amp;/g, '&'));
        onToggleNav();
    };

    const links = genreList.map( (genre, index) => {
        return (
            <a onClick={filterHandler} key={index}>{genre}</a>
        );
    });


    return (
        <div className={`filter ${navState ? 'filter-change': ''}`}>
            {links}
        </div>
    );

};

export default Filter;