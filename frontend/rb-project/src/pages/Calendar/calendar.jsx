import React, { useState, useEffect } from 'react';
import "/src/pages/main-container.css";
import axios from "axios";
import CalendarGrid from "/src/Components/CalendarGrid/calendargrid.jsx";
import "./calendar.css";
import MonthCarousel from '../../Components/MonthCarousel/monthcarousel';


function Calendar() {
    const [data, setData] = useState([]);

    const definedayofweek = () => {
        const today = new Date();

        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const firstDayOfMonth = new Date(year, month - 1, 0);
        const dayOfWeek = firstDayOfMonth.getDay();

        return dayOfWeek;
    }

    const initializeDays = () => {
        const today = new Date();

        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const number_of_days = new Date(year, month, 0).getDate()

        const days = [];
        for (let i = 0; i <= number_of_days - 1; i++) {
            days[i.toString()] = [];
        }
        return days;
    };

    const groupByDay = (games) => {
        const grouped = initializeDays();

        games.forEach((game) => {
            const day = new Date(game.releaseDate).getDate().toString();
            grouped[day - 1].push(game);
        });

        return grouped;
    };

    useEffect(() => {
        axios.get('http://localhost:8000/unreleasedGames/')
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
                <div className="container">
                    <div class="carousel">
                        <MonthCarousel/>
                    </div>
                    Count of new releases in this month: {data.length}
                    <div className="calendar">
                        <CalendarGrid grouped_data={groupByDay(data)} dayofweek={definedayofweek()} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar