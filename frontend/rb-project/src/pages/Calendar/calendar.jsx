import React, { useState, useEffect } from 'react';
import "/src/pages/main-container.css";
import axios from "axios";
import CalendarGrid from "/src/Components/CalendarGrid/calendargrid.jsx";
import "./calendar.css";
import MonthCarousel from '../../Components/MonthCarousel/monthcarousel';
import { useNavigate } from "react-router-dom";

const today = new Date();

const month = today.getMonth() + 1;
const year = today.getFullYear();

function Calendar() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(month - 1);
    const [currentYear, setCurrentYear] = useState(year);

    const definedayofweek = () => {
        const firstDayOfMonth = new Date(currentYear, currentIndex, 0);
        const dayOfWeek = firstDayOfMonth.getDay();

        return dayOfWeek;
    }

    const initializeDays = () => {
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
            const day = new Date(game.released).getDate().toString();
            grouped[day - 1].push(game);
        });
        return grouped;
    };

    useEffect(() => {
        newMonth()
    }, [currentIndex, currentYear]);

    const newMonth = async () => {
        console.log(currentYear, currentIndex )
        const response = await axios.get('http://localhost:8000/games/filtration', {
            params: {
                filtration: JSON.stringify({
                    month: [currentYear, currentIndex + 1], // год и месяц
                    table: "UnreleasedGamesInfo"
                }),
            }
        })
            .then(response => {
                setData(response.data);
                console.log("Successful data recording! New month.");
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleGameClick = (name, gameId) => {
        navigate(`/games/${name}`, { state: { id: gameId } });
    };

    return (
        <div>
            <img
                src='/src/assets/vampire-the-masquerade-bloodlines-2.jpg'
                className='background-image'
            />
            <div className="main-content-calendar">
                <div class="carousel-filtr">
                    <MonthCarousel currentIndex={currentIndex} currentYear={currentYear} setCurrentYear={setCurrentYear} setCurrentIndex={setCurrentIndex} newMonth={newMonth} />
                </div>
                <div className="container-calendar">
                    <p>New releases: {data.length}</p>
                    <div className="calendar">
                        <CalendarGrid grouped_data={groupByDay(data)} dayofweek={definedayofweek()} handleGameClick={handleGameClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar