import React, { useState, useEffect } from 'react';
import axios from "axios";
import GameList from "/src/Components/GameList/GameList.jsx";
import Filters from "/src/Components/Filters/filters.jsx";
import Sorts from "/src/Components/Filters/sorts/sorts.jsx";
import "./Games.css";
import "/src/pages/main-container.css";
import { useContextCard } from "/src/context/contextCardGame.js";

function Games() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { addCollection, handleGameClick, applyFilters } = useContextCard();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        axios.get('http://localhost:8000/games/')
            .then(response => {
                setData(response.data);
                console.log("Successful data recording! ");
            })
            .catch(error => {
                console.error(error);
            });
    };

    const fetchSortedData = async (sortField, sortOrder) => {
        try {
            sortField = sortField.toLowerCase() === "popularity" ? "rating" : sortField;
            sortField = sortField.toLowerCase() === "date" ? "released" : sortField;
            const sortParam = sortOrder === "asc" ? `sorting+` : `sorting-`;
            const response = await axios.get("http://localhost:8000/games/sorting/", {
                params: {
                    [sortParam]: sortField.toLowerCase(),
                },
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching sorted data:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <img
                src='/src/assets/vampire-the-masquerade-bloodlines-2.jpg'
                className='background-image'
            />
            <div className='main-content'>
                <div className='container'>
                    <div className='filters-sort'>
                        <Filters applybtn={applyFilters} filterSwitcher={true} />
                        <span className='found'>Games are found: {filteredData.length}</span>
                        <div className='sort'>
                            <Sorts fetchSortedData={fetchSortedData} fetchData={fetchData} />
                        </div>
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Enter game's name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className='list-games-grid'>
                        <GameList data={filteredData} addCollection={addCollection} handleGameClick={handleGameClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Games;
