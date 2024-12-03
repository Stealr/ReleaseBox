import React, { useState } from 'react';
import "./CardGameList.css";

//TODO: Добавить вслывающиеся окно при новедении на иконку с платформой. Название платформы
// Добавить значок для неизвестной платформы

function CardGameList({ gameId, name, released, platform, genres, metacritic, imageBackground, addCollection, handleGameClick }) {
    const platform_icon_define = (name) => {
        return `/src/assets/platforms/${name.toLowerCase()}.svg`;
    }

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [rating, setRating] = useState(0); // Состояние для хранения рейтинга

    // Обработчик для клика по кнопке "Add"
    const handleAddClick = () => {
        setIsMenuVisible(!isMenuVisible); // Переключаем видимость меню
    };

    const handleRatingClick = (value) => {
        setRating(value); // Устанавливаем рейтинг
    };

    return (
        <div className='card-game-list'>
            <div className='card-top'>
                <div className='card-media'>
                    <img src={imageBackground} />
                </div>
                <div className='metacritic-add'>
                    <div className='metacritic-game'>
                        {metacritic}
                    </div>
                    <div className='button-add'>
                        <img
                            src='/src/assets/plus.svg'
                            alt="Add button"
                            onClick={handleAddClick}
                        />
                        {isMenuVisible && (
                            <div className='menu'>
                                <button className='menu-item'>Done</button>
                                <button className='menu-item'>Playing</button>
                                <button className='menu-item'>Favourite</button>
                                <button className='menu-item'>Wishlist</button>
                                <button className='menu-item'>Abandoned</button>
                                <button className='menu-item del'>Delete</button>
                                {/* Блок рейтинга */}
                                <div className='rating'>
                                    <div className='rating-title'>Выставите рейтинг:</div>
                                    <div className='rating-buttons'>
                                        {[0, 1, 2, 3, 4, 5].map((value) => (
                                            <button
                                                key={value}
                                                className={`rating-button ${rating === value ? 'selected' : ''}`}
                                                onClick={() => handleRatingClick(value)}
                                            >
                                                {value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='card-bottom'>
                <div className='info'>
                    <div className='game-name' onClick={() => handleGameClick(name, gameId)}>
                        {name} ({released.slice(0, 4)})
                    </div>
                    <div className='platforms'>
                        <div className='platforms-grid'>
                            {platform.split(", ").map((platformName) => (
                                <img
                                    key={platformName}
                                    src={platform_icon_define(platformName)}
                                    alt={platformName}
                                    className="platform-icon"
                                />
                            ))}
                        </div>
                    </div>
                    {/* <p>Platforms: {platform}</p>
                    <p>Genres: {genres}</p> */}
                </div>
            </div>
        </div>
    );
}

export default CardGameList