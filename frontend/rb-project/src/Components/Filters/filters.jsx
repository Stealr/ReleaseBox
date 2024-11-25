import {React, useState} from 'react';
import "./filters.css";
import Slider from "/src/Components/Filters/slider/slider.jsx";



function Filters() {
    const [yearRange, setYearRange] = useState([1980, 2026]);
    const [metacriticRange, setMetacriticRange] = useState([0, 100]);

    return (
        <div className='filters-block'>
            <h3>Filters</h3>
            <div className="filters">
                <div className='sliders-block'>
                    <div className="sliders">
                        {/* Slider for Year Range */}
                        <Slider/>

                        {/* Slider for Metacritic Range */}
                        {/* <div className="filter-slider">
                            <p>Metacritic Range</p>
                            <Slider
                                range
                                min={0}
                                max={100}
                                value={metacriticRange}
                                onChange={(value) => setMetacriticRange(value)}
                                styles={{
                                    track: { backgroundColor: "orange" },
                                    handle: { borderColor: "orange", backgroundColor: "white" },
                                    rail: { backgroundColor: "#555" },
                                }}
                            />
                            <div className="slider-values">
                                <span>{metacriticRange[0]}</span>
                                <span>{metacriticRange[1]}</span>
                            </div>
                        </div> */}
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
