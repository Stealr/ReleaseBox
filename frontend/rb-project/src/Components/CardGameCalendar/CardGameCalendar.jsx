import React from 'react';
import "./CardGameCalendar.css";

// TODO Добавить кнопку добавления в коллекцию

function CardGameCalendar() {
    return (
        <div className='card-game-calendar'>
            <div className='card-top'>
                <div className='NumberofDay'>
                    <p>N</p>
                </div>
                <div className='name-game'>
                    <p>Name of game</p>
                </div>
                <div className='switchers'>
                    <div className='left'>
                        ←
                    </div>
                    <div className='right'>
                        →
                    </div>
                </div>
            </div>
            <div className='card-bottom'>
                <div className='info'>
                    <p>Releases:</p>
                    <p>Platforms:</p>
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