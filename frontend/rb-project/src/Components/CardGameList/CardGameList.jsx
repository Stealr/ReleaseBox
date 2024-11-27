import React from 'react';
import "./CardGameList.css";

//TODO: Добавить вслывающиеся окно при новедении на иконку с платформой. Название платформы
// Добавить значок для неизвестной платформы

function CardGameList({ gameId, name, released, platform, genres, metacritic, imageBackground, addCollection }) {
    const platform_icon_define = (name) => {
        return `/src/assets/platforms/${name.toLowerCase()}.svg`;
    }
    // console.log(gameId)
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
                            onClick={() => addCollection(gameId)}
                        />
                    </div>
                </div>
            </div>
            <div className='card-bottom'>
                <div className='info'>
                    <div className='game-name'>
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