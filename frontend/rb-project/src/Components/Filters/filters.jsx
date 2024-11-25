import { React, useState } from 'react';
import "./filters.css";
import Slider from "/src/Components/Filters/slider/slider.jsx";

const today = new Date();
const year = today.getFullYear();

function Filters() {
    const [yearRange, setYearRange] = useState([1980, 2026]);
    const [metacriticRange, setMetacriticRange] = useState([0, 100]);

    const generateYearMarks = () => {
        const marks = {};
        for (let i = 1980; i <= year; i += 10) {
            marks[i] = `${i}`;
        }
        // marks[year + 2] = `${year + 2}`;
        return marks;
    };

    const generateMetacriticMarks = () => {
        const marks = {};
        for (let i = 0; i <= 100; i += 10) {
            marks[i] = `${i}`;
        }
        return marks;
    };

    return (
        <div className='filters-block'>
            <h3>Filters</h3>
            <div className="filters">
                <div className='sliders-block'>
                    <div className="sliders">
                        {/* Slider for Year Range */}
                        <Slider name={"Year Range:"} Range={yearRange} setRange={setYearRange}
                            marks={generateYearMarks()} min_max={[1980, year]}
                        />

                        {/* Slider for Metacritic Range */}
                        <Slider name={"Metacritic Range:"} Range={metacriticRange} setRange={setMetacriticRange}
                            marks={generateMetacriticMarks()} min_max={[0, 100]} metacritic={true}/>
                    </div>
                    <div className="button-apply">
                        <button>Apply</button>
                        <button>reset</button>
                    </div>
                </div>
                <div className="checkbox-blocks">
                    <div className="checkbox-genres">
                        Genres
                    </div>
                    <div className="checkbox-platforms">
                        Platforms
                    </div>
                    <div className="checkbox-modes">
                        Game modes
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
