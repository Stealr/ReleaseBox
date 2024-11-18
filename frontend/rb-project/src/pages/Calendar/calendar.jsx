import React, { useState, useEffect } from 'react';
import "/src/pages/main-container.css";
import axios from "axios";
import CalendarGrid from "/src/Components/CalendarGrid/calendargrid.jsx";
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import "./calendar.css";


function Calendar() {
    const [data, setData] = useState([]);

    const initializeDays = () => {
        const today = new Date();

        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const number_of_days = new Date(year, month, 0).getDate()

        // ЗАМЕНИТЬ 31 НА number_of_days!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const days = [];
        for (let i = 0; i <= 31 - 1; i++) {
            days[i.toString()] = [];
        }
        return days;
    };

    const groupByDay = (games) => {
        const grouped = initializeDays();

        games.forEach((game) => {
            const day = new Date(game.released).getDate().toString();
            grouped[day - 1].push(game);
        });

        return grouped;
    };

    useEffect(() => {
        axios.get('http://localhost:8000/games/')
            .then(response => {
                setData(response.data);
                console.log("Successful data recording!")
                // console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <div>
            <div className="main-content">
                {/* <div className="month-switcher">
                    nov sep
                </div> */}
                <div className="container">
                    Count of new releases in this month: {data.length}
                    <div className="calendar">
                        <CalendarGrid grouped_data={groupByDay(data)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar