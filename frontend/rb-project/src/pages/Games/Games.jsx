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
            <div className='main-content'
                style={{
                    backgroundImage: `url(/src/assets/vampire-the-masquerade-bloodlines-2.jpg)`,
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className='container'>
                    <div className='filters-sort'>
                        <Filters/>
                        <span className='found'>Games are found: {Object.keys(data).length}</span>
                        <div className='sort'>
                            <Sorts/>
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