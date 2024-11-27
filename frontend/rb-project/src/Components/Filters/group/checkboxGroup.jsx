import React, { useState } from 'react';
import './checkboxGroup.css';

const CheckboxGroup = ({ name, listCheckBoxes }) => {
    const [searchQuery, setSearchQuery] = useState(''); // Хранит значение строки поиска

    // Фильтруем элементы по строке поиска
    const filteredCheckBoxes = listCheckBoxes.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="filter-group">
            <div className='block-header'>
                <h4>{name}</h4>
            </div>
            <input
                type="text"
                placeholder="Search for genre"
                className="filter-search"
                value={searchQuery} // Привязка значения к состоянию
                onChange={(e) => setSearchQuery(e.target.value)} // Обновление строки поиска
            />
            <div className="filter-options">
                {filteredCheckBoxes.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" /> {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;
