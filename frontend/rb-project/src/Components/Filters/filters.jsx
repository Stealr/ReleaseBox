import { React, useState } from 'react';
import "./filters.css";
import Slider from "/src/Components/Filters/slider/slider.jsx";
import CheckboxGroup from "./group/checkboxGroup.jsx";


const today = new Date();
const year = today.getFullYear();

function Filters({ applybtn, filterSwitcher, fetchData }) {
    const [yearRange, setYearRange] = useState([1980, year + 2]);
    const [metacriticRange, setMetacriticRange] = useState([0, 100]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedModes, setSelectedModes] = useState([]);

    const [filterActive, setfilterActive] = useState(filterSwitcher);

    const genres = ['Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 'Simulation', 'Puzzle', 'Arcade', 'Platformer', 'Racing', 'Massively Multiplayer', 'Sports', 'Fighting', 'Family', 'Board Games', 'Educational', 'Card'];
    const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'iOS', 'Android', 'macOS', 'Linux', 'SEGA'];
    const tags = ['Singleplayer', 'Steam Achievements', 'Multiplayer', 'Full controller support', 'Steam Cloud', 'Atmospheric', 'steam-trading-cards', 'Great Soundtrack', 'RPG', 'Co-op', 'Story Rich', 'Open World', 'cooperative', 'First-Person', '2D', 'Third Person', 'Sci-fi', 'Partial Controller Support', 'Horror', 'FPS', 'Online Co-Op', 'Fantasy', 'Funny', 'Gore', 'Difficult', 'Steam Leaderboards', 'Exploration', 'Classic', 'Sandbox', 'Female Protagonist', 'Survival', 'Comedy', 'Violent', 'Free to Play', 'Online multiplayer', 'Stealth', 'Split Screen', 'Local Co-Op', 'Action-Adventure', 'Action RPG'];

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

    const resetFilters = () => { // нужно как то обновлять слайдеры
        setYearRange([1980, year + 2]); // Правильный вызов setYearRange
        setMetacriticRange([0, 100]);  // Правильный вызов setMetacriticRange
        setSelectedGenres([]);
        setSelectedPlatforms([]);
        setSelectedModes([]);
        fetchData()
    }

    return (
        <div className='filters-block'>
            <div className="wrap-filter">
                <h3>Filters</h3>
                <button className='arrow-switcher' onClick={() => (
                    setfilterActive(filterActive ? false : true)
                )}>{filterActive ? "⯆" : "⯈"}</button>
            </div>
            <div className={`filters ${filterActive ? "" : "notactive"}`}>
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
                        <button className='btn apply' onClick={() => applybtn(yearRange, metacriticRange, selectedGenres, selectedPlatforms, selectedModes)}>Apply</button>
                        <button className='btn reset' onClick={resetFilters}>reset</button>
                    </div>
                </div>

                <div className="checkbox-blocks">
                    <div className="checkbox-genres">
                        <CheckboxGroup
                            name={"Genres"}
                            listCheckBoxes={genres}
                            selected={selectedGenres}
                            setSelected={setSelectedGenres}
                        />
                    </div>
                    <div className="checkbox-platforms">
                        <CheckboxGroup
                            name={"Platforms"}
                            listCheckBoxes={platforms}
                            selected={selectedPlatforms}
                            setSelected={setSelectedPlatforms}
                        />
                    </div>
                    <div className="checkbox-modes">
                        <CheckboxGroup
                            name={"Game modes"}
                            listCheckBoxes={tags}
                            selected={selectedModes}
                            setSelected={setSelectedModes}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
