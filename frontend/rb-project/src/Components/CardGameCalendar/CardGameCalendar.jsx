import React, { useState } from 'react';
import "./CardGameCalendar.css";

// TODO Добавить кнопку добавления в коллекцию
// TODO Если не зарегестрированный пользователь нажимает на добавить игру в свою коллекцию, то появляется надпись над кнопкой добавить и 
// эта надпись медленно поднимает и исчезает
// TODO При наведении на карточку увеличивать её и добавить тень. С плавным переходом

// 'id': output.gameId,
// 'name': output.name,
// 'release date': output.releaseDate,
// 'platform': output.platform,
// 'genres': output.genres,
// 'imageBackground': output.imageBackground

function CardGameCalendar({ day, games }) {
    console.log(day, games);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + games.length) % games.length
        );
    };

    return (
        <div className='card-game-calendar'>
            <div className='card-top'>
                <div className='card-media'>
                    <img src={games[currentIndex]?.imageBackground} />
                </div>
                <div className='NumberofDay'>
                    {day}
                </div>

                <div className='switchers'>
                    <div className="left" onClick={handlePrev}>
                        ←
                    </div>
                    <div className="right" onClick={handleNext}>
                        →
                    </div>
                </div>
            </div>
            <div className='card-bottom'>
                <div className='info'>
                    <div className='name-game'>
                        {games[currentIndex]?.name}
                    </div>
                    {/* <p>Releases:</p>
                    <p>Platforms:</p> */}
                </div>
                <div className='amount-games'>
                    <div className='dot'>

                    </div>
                    <div className='dot'>

                    </div>
                    <div className='dot'>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default CardGameCalendar