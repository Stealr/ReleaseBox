import React from 'react';
import './checkboxGroup.css';

const CheckboxGroup = ({ name }) => {
    return (
        <div className="filter-group">
            <div className='block-header'>
                <h4>{name}</h4>
            </div>
            <input type="text" placeholder="Search for genre" className="filter-search" />
            <div className="filter-options">
                <label><input type="checkbox" /> Genre 1</label>
                <label><input type="checkbox" /> Genre 2</label>
                <label><input type="checkbox" /> Genre 3</label>
                <label><input type="checkbox" /> Genre 4</label>
            </div>
        </div>
    );
}

export default CheckboxGroup;