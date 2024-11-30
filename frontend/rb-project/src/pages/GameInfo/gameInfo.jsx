import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import './gameInfo.css';

import BottomInfo from "/src/Components/GameInfoComp/BottomInfo.jsx";
import CenterColumn from "/src/Components/GameInfoComp/CenterColumn.jsx";
import LeftColumn from "/src/Components/GameInfoComp/LeftColumn.jsx";
import RightColumn from "/src/Components/GameInfoComp/RightColumn.jsx";

function Game() {
    const [data, setData] = useState(null); // Измените начальное состояние на null
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
    const location = useLocation();
    const { name } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);

    const { id } = location.state || {};

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/games/${id}/`)
            .then(response => {
                setData(response.data);
                setIsLoading(false); // Установите состояние загрузки в false после получения данных
                console.log("Successful data recording!");
                window.scrollTo(0, 0);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false); // Установите состояние загрузки в false даже при ошибке
            });
    }, [id]);

    if (isLoading) {
        return <div className='Loading'>Loading...</div>; // Отображение индикатора загрузки
    }

    return (
        <div>
            <img
                src={data.imageBackground}
                className='background-image'
                alt="Background"
            />
            <div className='main-content'>
                <div className='container'>
                    <div className="gameInfo">
                        <div className='top-bottom'>
                            <div className="top-info">
                                <LeftColumn data={data} />
                                <CenterColumn data={data} />
                            </div>
                            <BottomInfo data={data} isExpanded={isExpanded} toggleDescription={toggleDescription} />
                        </div>
                        <RightColumn data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;