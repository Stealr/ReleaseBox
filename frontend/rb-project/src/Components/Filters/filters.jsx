import { React, useState } from 'react';
import "./filters.css";
import Slider from "/src/Components/Filters/slider/slider.jsx";
import CheckboxGroup from "./group/checkboxGroup.jsx";


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
        marks[year + 2] = `${year + 2}`;
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
                        <Slider name={"Year Range:"} Range={yearRange} setRange={setYearRange}
                            marks={generateYearMarks()} min_max={[1980, year + 2]}
                        />
                        <Slider name={"Metacritic Range:"} Range={metacriticRange} setRange={setMetacriticRange}
                            marks={generateMetacriticMarks()} min_max={[0, 100]}
                        />
                    </div>
                    <div className="apply-reset">
                        <button className='btn apply'>Apply</button>
                        <button className='btn reset'>reset</button>
                    </div>
                </div>
                <div className="checkbox-blocks">
                    <div className="checkbox-genres">
                        <CheckboxGroup name={"Genres"}/>
                    </div>
                    <div className="checkbox-platforms">
                        <CheckboxGroup name={"Platforms"}/>
                    </div>
                    <div className="checkbox-modes">
                        <CheckboxGroup name={"Game modes"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
