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
        const firstDayOfMonth = new Date(year, month - 1, 0);
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

    // TODO Проверить ссылку. Попробовать заменить на filtration
    useEffect(() => {
        axios.get('http://localhost:8000/unreleasedGames/', {
            params: {
                filtration: 'month',
                year: currentYear,
                month: currentIndex
            }
        })
            .then(response => {
                setData(response.data);
                console.log("Successful data recording! New month.");
                // console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [currentIndex]);

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
                    <MonthCarousel currentIndex={currentIndex} currentYear={currentYear} setCurrentYear={setCurrentYear} setCurrentIndex={setCurrentIndex} />
                </div>
                <div className="container-calendar">
                    <span>New releases: {data.length}</span>
                    <div className="calendar">
                        <CalendarGrid grouped_data={groupByDay(data)} dayofweek={definedayofweek() } handleGameClick={handleGameClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar