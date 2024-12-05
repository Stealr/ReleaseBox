import React, { useState, useRef, useEffect } from 'react';
import "./CardGameCalendar.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function CardGameCalendar({ day, games, handleGameClick, addCollection }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isFadingIn, setIsFadingIn] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [collection, setCollection] = useState(null);
    const [rating, setRating] = useState(5);
    const menuRef = useRef(null);

    const handleNext = () => {
        if (isFadingIn || isFadingOut) return;
        setIsFadingOut(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
            setIsFadingOut(false);
            setIsFadingIn(true);

            setTimeout(() => setIsFadingIn(false), 300);
        }, 300);
    };

    const handlePrev = () => {
        if (isFadingIn || isFadingOut) return;
        setIsFadingOut(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
            setIsFadingOut(false);
            setIsFadingIn(true);

            setTimeout(() => setIsFadingIn(false), 300);
        }, 300);
    };

    const platform_icon_define = (name) => {
        return `/src/assets/platforms/${name.toLowerCase()}.svg`;
    };

    const handleAddClick = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleButtonClick = (buttonName) => {
        setCollection(buttonName);
    };

    const handleApplyClick = () => {
        if (collection) {
            addCollection(games[currentIndex]?.id, collection, rating);
        }
        setIsMenuVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='card-game-calendar'>
            <div className='card-top'>
                <div className={`card-media ${isFadingOut ? "fading-out" : ""} ${isFadingIn ? "fading-in" : ""}`}>
                    <img src={games[currentIndex]?.imageBackground} alt="Game background" />
                </div>
                <div className='day-add'>
                    <div className='NumberofDay'>{day}</div>
                    <div className='button-add' onClick={handleAddClick}>
                        <img src='/src/assets/plus.svg' alt="Add button" />
                    </div>
                </div>
                {games.length > 1 && (
                    <div className='switchers'>
                        <div className="left" onClick={handlePrev}>🠈</div>
                        <div className="right" onClick={handleNext}>🠊</div>
                    </div>
                )}
            </div>

            <div className='card-bottom'>
                <div className={`info ${isFadingOut ? "fading-out" : ""} ${isFadingIn ? "fading-in" : ""}`}>
                    <div className='platforms'>
                        {games[currentIndex]?.platform.split(", ").map((platformName) => (
                            <img
                                key={platformName}
                                src={platform_icon_define(platformName)}
                                alt={platformName}
                                className="platform-icon"
                            />
                        ))}
                    </div>
                    <div className='name-game' onClick={() => handleGameClick(games[currentIndex]?.name, games[currentIndex]?.id)}>
                        {games[currentIndex]?.name}
                    </div>
                </div>

                {games.length > 1 && (
                    <div className='amount-games'>
                        {games.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${index === currentIndex ? "active" : ""}`}
                            ></div>
                        ))}
                    </div>
                )}
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
                            <button className="menu-item del" onClick={() => setCollection(null)}>Delete</button>
                        </div>
                        <button className='menu-item apply' onClick={handleApplyClick}>Apply</button>
                    </div>
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
                                track: { backgroundColor: "#ee6736" },
                                handle: { borderColor: "#ee6736", backgroundColor: "#ee6736", height: 14, width: 14, opacity: 100 },
                                rail: { backgroundColor: "#555" },
                            }}
                        />
                        <div className="rating-value">{rating.toFixed(1)}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardGameCalendar;
