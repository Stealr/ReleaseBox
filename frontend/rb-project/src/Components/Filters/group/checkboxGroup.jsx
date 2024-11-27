import React, { useState } from 'react';
import './checkboxGroup.css';

const CheckboxGroup = ({ name, listCheckBoxes, selected, setSelected }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCheckBoxes = listCheckBoxes.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCheckboxChange = (item) => {
        if (selected.includes(item)) {
            setSelected(selected.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

    return (
        <div className="filter-group">
            <div className="block-header">
                <h4>{name}</h4>
            </div>
            <input
                type="text"
                placeholder="Search for genre"
                className="filter-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="filter-options">
                {filteredCheckBoxes.map((item, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={selected.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                        />{' '}
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;
