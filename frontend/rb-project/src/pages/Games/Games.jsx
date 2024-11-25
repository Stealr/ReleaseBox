import React, { useState, useEffect } from 'react';
import axios from "axios";
import GameList from "/src/Components/GameList/GameList.jsx";
import Filters from "/src/Components/Filters/filters.jsx";
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
                        <p>Games are found: {Object.keys(data).length}</p>
                        <div className='sort'>
                            <button>sort</button>
                            <button>sort</button>
                            <button>sort</button>
                            <button>sort</button>
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