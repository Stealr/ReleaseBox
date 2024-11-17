import React, { useState, useEffect } from 'react';
import Card from "/src/Components/CardGameCalendar/CardGameCalendar.jsx";


function CalendarGrid( props ) {
    const grouped = props["grouped_data"];


    return (
        <div className="calendar-grid">
            <div class="calendar-weekday">Monday</div>
            <div class="calendar-weekday">Tuesday</div>
            <div class="calendar-weekday">Wednesday</div>
            <div class="calendar-weekday">Thursday</div>
            <div class="calendar-weekday">Friday</div>
            <div class="calendar-weekday">Saturday</div>
            <div class="calendar-weekday">Sunday</div>
            {/* <Card
                    key={game.id}
                    name={game.name}
                    released={game.released}
                    platform={game.platform}
                    genres={game.genres}
                    metacritic={game.metacritic}
                    imageBackground={game.imageBackground}
                /> */}

            {grouped.map((games, index) => (
                games.length > 0 ? games.map((game) => (
                    <div className='game-card' key={game.gameId}>
                        card
                    </div>
                )) : (
                    <div className="placeholder" key={index}>
                        placeholder
                    </div>
                )
            ))}
        </div>
    );
}

export default CalendarGrid

