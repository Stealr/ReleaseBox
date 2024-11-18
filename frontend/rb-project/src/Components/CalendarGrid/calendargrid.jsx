import React, { useState, useEffect } from 'react';
import Card from "/src/Components/CardGameCalendar/CardGameCalendar.jsx";
import Placeholder from "/src/Components/CardGameCalendar/CardPlaceHolder.jsx";
import "./calendargrid.css";


function CalendarGrid(props) {
    const grouped = props["grouped_data"];
    const dayofweek = props["dayofweek"];

    return (
        <div className="calendar-grid">
            <div className="calendar-weekday">Monday</div>
            <div className="calendar-weekday">Tuesday</div>
            <div className="calendar-weekday">Wednesday</div>
            <div className="calendar-weekday">Thursday</div>
            <div className="calendar-weekday">Friday</div>
            <div className="calendar-weekday">Saturday</div>
            <div className="calendar-weekday">Sunday</div>

            {Array.from({ length: dayofweek }, (_, index) => (
                <div key={index} className="empty-div"></div>
            ))}

            {grouped.map((games, index) => (
                games.length > 0 ? (
                    <div className='game-card' key={index}>
                        <Card
                            day={index + 1}
                            games={games}
                        />
                    </div>
                ) : (
                    <div className="placeholder" key={index}>
                        <Placeholder day={index + 1} />
                    </div>
                )
            ))}
        </div>
    );
}

export default CalendarGrid

