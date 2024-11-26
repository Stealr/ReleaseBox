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
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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
                        <GameList data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Games