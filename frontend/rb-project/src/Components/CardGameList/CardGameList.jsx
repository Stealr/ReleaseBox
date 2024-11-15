import React from 'react';
import "./CardGameList.css";

function CardGameList({ name, released, platform, genres, metacritic, imageBackground }) {
    return (
        <div className='card-game-list'>
            <div className='card-top'
                style={{
                    backgroundImage: `url(${imageBackground || 'https://via.placeholder.com/150'})`,
                }}>
                <div className='name-add'>
                    <div className='name-game'>
                        <p>{name}</p>
                    </div>
                    <div className='button-add'>
                        +
                    </div>
                </div>
            </div>
            <div className='card-bottom'>
                <div className='info'>
                    <p>Releases: {released}</p>
                    <p>Platforms: {platform}</p>
                    <p>Genres: {genres}</p>
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

export default CardGameList