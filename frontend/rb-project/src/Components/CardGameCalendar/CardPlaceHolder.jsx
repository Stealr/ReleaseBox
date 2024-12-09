import React from 'react';
import "./CardPlaceHolder.css";


function CardGameCalendar({ day }) {
    return (
        <div className='card-placeholder'>
            <div className='day'>
                <div className='NumberofDay'>
                    {day}
                </div>
                <div></div>
            </div>
        </div>

    );
}

export default CardGameCalendar