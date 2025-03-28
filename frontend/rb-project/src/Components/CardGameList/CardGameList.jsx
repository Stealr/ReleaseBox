import React, { useState, useEffect, useRef } from 'react';
import "./CardGameList.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function CardGameList({ gameId, name, released, platform, metacritic, imageBackground, addCollection, handleGameClick, userRatings, getUserRating, deleteFromCollection, moveGameToCollection, selectedCategory }) {
    const platform_icon_define = (name) => {
        return `/src/assets/platforms/${name.toLowerCase()}.svg`;
    }
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [collection, setCollection] = useState(selectedCategory || '');
    const [rating, setRating] = useState(userRatings ? (getUserRating(gameId) || 5) : (5));
    const menuRef = useRef(null); // Ссылка на меню

    const user_id = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken');

    const handleAddClick = () => {
        if (user_id) {
            setIsMenuVisible(!isMenuVisible); // Переключаем видимость меню
        }
        else {
            setIsMessageVisible(true);

            // Скрыть сообщение через 2 секунды
            setTimeout(() => {
                setIsMessageVisible(false);
            }, 2000);
        }
    };

    const handleButtonClick = (buttonName) => {
        setCollection(buttonName);
    };

    const handleDelClick = () => {
        setCollection(null)
        setIsMenuVisible(!isMenuVisible);
        deleteFromCollection(gameId)
    }

    const handleApplyClick = () => {
        if (collection) {
            if (userRatings) {
                moveGameToCollection(gameId, collection)
                addCollection(gameId, collection, rating);
            }
            else {
                addCollection(gameId, collection, rating); // Добавляем в коллекцию
            }
        }
        setIsMenuVisible(false); // Закрываем меню
    };

    // Обработчик кликов вне меню
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuVisible(false); // Скрываем меню
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='card-game-list'>
            {isMessageVisible && (
                <div className="add-message">
                    Необходима авторизация
                </div>
            )}
            <div className='card-top'>
                <div className='card-media'>
                    <img src={imageBackground} />
                </div>
                <div className='metacritic-add'>
                    <div className='metacritic-game'>
                        {metacritic}
                    </div>
                    {userRatings ? (
                        <div className='change-rating' onClick={handleAddClick}>
                            {getUserRating(gameId) || ""}
                        </div>
                    ) : (
                        <div className='button-add' onClick={handleAddClick}>
                            <img
                                src='/src/assets/plus.svg'
                                alt="Add button"
                            />
                        </div>
                    )}

                </div>
            </div>

            <div className='card-bottom'>
                <div className='info'>
                    <div className='game-name' onClick={() => {
                        handleGameClick(name, gameId)
                        setIsMenuVisible(!isMenuVisible)
                    }}>
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
                </div>
            </div>
            {isMenuVisible && (
                <div className='menu' ref={menuRef}>
                    <div className="left-column">
                        <div className="btns">
                            {["Done", "Playing", "Favourite", "Wishlist", "Abandoned"].map((item) => (
                                <button
                                    key={item}
                                    className={`menu-item ${collection === item ? "selected" : ""}`}
                                    onClick={() => handleButtonClick(item)}
                                >
                                    {item}
                                </button>
                            ))}
                            {userRatings != undefined && <button className="menu-item del" onClick={handleDelClick}>Delete</button>}
                        </div>
                        <button className='menu-item apply' onClick={handleApplyClick}>Apply</button>
                    </div>
                    {/* Блок рейтинга */}
                    <div className='rating'>
                        <Slider
                            vertical
                            min={0}
                            max={5}
                            step={0.1}
                            value={rating}
                            onChange={(value) => setRating(value)}
                            marks={{ "1": 1, "2": 2, "3": 3, "4": 4, "5": 5 }}
                            dotStyle={{ display: 'none' }}
                            styles={{
                                track: { backgroundColor: "#ee6736", },
                                handle: { borderColor: "#ee6736", backgroundColor: "#ee6736", height: 14, width: 14, opacity: 100, },
                                rail: { backgroundColor: "#555", },
                            }}
                        />
                        <div className="rating-value">{rating.toFixed(1)}</div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default CardGameList;
