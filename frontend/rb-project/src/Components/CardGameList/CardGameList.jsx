import React from 'react';
import "./CardGameList.css";

function CardGameList() {
    return (
        <div className='card-game-list'>
            <div className='card-top'>
                <div className='name-add'>
                    <div className='name-game'>
                        <p>Name of game</p>
                    </div>
                    <div className='button-add'>
                        +
                    </div>
                </div>
            </div>
            <div className='card-bottom'>
                <div className='info'>
                    <p>Releases: </p>
                    <p>Platforms: </p>
                    <p>Genres: </p>
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