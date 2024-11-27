import React, { useState, useEffect } from 'react';
import axios from "axios";
import GameList from "/src/Components/GameList/GameList.jsx";
import Filters from "/src/Components/Filters/filters.jsx";
import Sorts from "/src/Components/Filters/sorts/sorts.jsx";
import "./Games.css";
import "/src/pages/main-container.css";


function Games() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/games/')
            .then(response => {
                setData(response.data);
                console.log("Successful data recording! ")
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const applyFilters = async (yearRange, metacriticRange, selectedGenres, selectedPlatforms, selectedModes) => {
        const filters = {};

        if (yearRange[0] !== 1980 || yearRange[1] !== new Date().getFullYear() + 2) {
            filters.released = {
                start: yearRange[0],
                end: yearRange[1],
            };
        }

        if (metacriticRange[0] !== 0 || metacriticRange[1] !== 100) {
            filters.metacritic = {
                start: metacriticRange[0],
                end: metacriticRange[1],
            };
        }

        if (selectedGenres.length > 0) {
            filters.genres = selectedGenres;
        }

        if (selectedPlatforms.length > 0) {
            filters.platform = selectedPlatforms;
        }

        if (selectedModes.length > 0) {
            filters.tags = selectedModes;
        }
        console.log(filters);
        if (Object.keys(filters).length != 0) {
            try {
                const response = await axios.get('http://localhost:8000/games/filtration', { filtration: filters });
                setData(response.data);
                console.log('Filtered data:', response.data);
            } catch (error) {
                console.error('Error applying filters:', error);
            }
        }
        else {
            console.log("Enter filters");
        }

    };

    const addCollection = async (gameId) => {
        const user_id = localStorage.getItem('userID');
        const accessToken = localStorage.getItem('accessToken');
        const collection_name = "Done";
        const user_rating = "";
        console.log(gameId);


        if (!accessToken) {
            console.error('Юзер не залогинен');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/games/addToCollection/', {
                user_id,
                collection_name,
                gameId,
                user_rating,
            });

            if (response.status === 200) {
                console.log('Данные успешно отправлены:', response.data);
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    // TODO: Добавить заглушку, если игры не загрузились из бд
    return (
        <div>
            <img
                src='/src/assets/vampire-the-masquerade-bloodlines-2.jpg'
                className='background-image'
            />
            <div className='main-content'>
                <div className='container'>
                    <div className='filters-sort'>
                        <Filters applybtn={applyFilters} />
                        <span className='found'>Games are found: {Object.keys(data).length}</span>
                        <div className='sort'>
                            <Sorts />
                        </div>
                    </div>
                    <div className='list-games-grid'>
                        <GameList data={data} addCollection={addCollection} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Games