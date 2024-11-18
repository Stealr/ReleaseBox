import React from 'react';
import "./CardPlaceHolder.css";


function CardGameCalendar({day}) {
    return (
        <div className='card-placeholder'>
            <div className='NumberofDay'>
                {day}
            </div>
        </div>

    );
}

export default CardGameCalendar