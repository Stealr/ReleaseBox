import React, { useState } from 'react';
import "./CardGameCalendar.css";

// TODO Добавить кнопку добавления в коллекцию
// TODO Если не зарегестрированный пользователь нажимает на добавить игру в свою коллекцию, то появляется надпись над кнопкой добавить и 
// эта надпись медленно поднимает и исчезает
// TODO При наведении на карточку увеличивать её и добавить тень. С плавным переходом
// TODO Заменить стрелочку на картинку

// 'id': output.gameId,
// 'name': output.name,
// 'release date': output.releaseDate,
// 'platform': output.platform,
// 'genres': output.genres,
// 'imageBackground': output.imageBackground

function CardGameCalendar({ day, games }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isFadingIn, setIsFadingIn] = useState(false);

    const handleNext = () => {
        if (isFadingIn || isFadingOut) return
        setIsFadingOut(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
            setIsFadingOut(false);
            setIsFadingIn(true);

            setTimeout(() => setIsFadingIn(false), 300);
        }, 300);
    };

    const handlePrev = () => {
        if (isFadingIn || isFadingOut) return
        setIsFadingOut(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                (prevIndex - 1 + games.length) % games.length
            );
            setIsFadingOut(false);
            setIsFadingIn(true);

            setTimeout(() => setIsFadingIn(false), 300);
        }, 300);
    };

    const platform_icon_define = (name) => {
        return `/src/assets/platforms/${name.toLowerCase()}.svg`;
    }

    return (
        <div className='card-game-calendar'>
            <div className='card-top'>
                <div className={`card-media ${isFadingOut ? "fading-out" : ""
                    } ${isFadingIn ? "fading-in" : ""}`}>
                    <img src={games[currentIndex]?.imageBackground} />
                </div>
                <div className='day-add'>
                    <div className='NumberofDay'>
                        {day}
                    </div>
                    <div className='button-add'>
                        <img src='/src/assets/plus.svg' alt="Add button" />
                    </div>
                </div>
                {games.length > 1 && (
                    <div className='switchers'>
                        <div className="left" onClick={handlePrev}>
                            🠈
                        </div>
                        <div className="right" onClick={handleNext}>
                            🠊
                        </div>
                    </div>
                )}
            </div>
            <div className='card-bottom'>
                <div className={`info ${isFadingOut ? "fading-out" : ""
                        } ${isFadingIn ? "fading-in" : ""}`}>
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
                    <div className='name-game'>
                        {games[currentIndex]?.name}
                    </div>
                </div>

                {games.length > 1 && (
                    <div className='amount-games'>
                        {games.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${index === currentIndex ? "active" : ""
                                    }`}
                            ></div>
                        ))}
                    </div>
                )}
            </div>

        </div>

    );
}

export default CardGameCalendar