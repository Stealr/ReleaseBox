import React from 'react';
import './checkboxGroup.css';

const CheckboxGroup = ({ name, listCheckBoxes }) => {
    return (
        <div className="filter-group">
            <div className='block-header'>
                <h4>{name}</h4>
            </div>
            <input type="text" placeholder="Search for genre" className="filter-search" />
            <div className="filter-options">
                {listCheckBoxes.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" /> {item}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default CheckboxGroup;
