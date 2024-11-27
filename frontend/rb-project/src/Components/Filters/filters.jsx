import { React, useState } from 'react';
import "./filters.css";
import Slider from "/src/Components/Filters/slider/slider.jsx";
import CheckboxGroup from "./group/checkboxGroup.jsx";


const today = new Date();
const year = today.getFullYear();

function Filters() {
    const [yearRange, setYearRange] = useState([1980, 2026]);
    const [metacriticRange, setMetacriticRange] = useState([0, 100]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedModes, setSelectedModes] = useState([]);

    const [filterActive, setfilterActive] = useState(true);

    const [genres, setGenres] = useState(['Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 'Simulation', 'Puzzle', 'Arcade', 'Platformer', 'Racing', 'Massively Multiplayer', 'Sports', 'Fighting', 'Family', 'Board Games', 'Educational', 'Card']);
    const [platforms, setPlatforms] = useState(['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Xbox Series S/X', 'Nintendo Switch', 'iOS', 'Android', 'Nintendo 3DS', 'Nintendo DS', 'Nintendo DSi', 'macOS', 'Linux', 'Xbox 360', 'Xbox', 'PlayStation 3', 'PlayStation 2', 'PlayStation', 'PS Vita', 'PSP', 'Wii U', 'Wii', 'GameCube', 'Nintendo 64', 'Game Boy Advance', 'Game Boy Color', 'Game Boy', 'SNES', 'NES', 'Classic Macintosh', 'Apple II', 'Commodore / Amiga', 'Atari 7800', 'Atari 5200', 'Atari 2600', 'Atari Flashback', 'Atari 8-bit', 'Atari ST', 'Atari Lynx', 'Atari XEGS', 'Genesis', 'SEGA Saturn', 'SEGA CD', 'SEGA 32X', 'SEGA Master System', 'Dreamcast', '3DO', 'Jaguar', 'Game Gear', 'Neo Geo']);
    const [tags, setTags] = useState(['Singleplayer', 'Steam Achievements', 'Multiplayer', 'Full controller support', 'Steam Cloud', 'Atmospheric', 'steam-trading-cards', 'Great Soundtrack', 'RPG', 'Co-op', 'Story Rich', 'Open World', 'cooperative', 'First-Person', '2D', 'Third Person', 'Sci-fi', 'Partial Controller Support', 'Horror', 'FPS', 'Online Co-Op', 'Fantasy', 'Funny', 'Gore', 'Difficult', 'Steam Leaderboards', 'Exploration', 'Classic', 'Sandbox', 'Female Protagonist', 'Survival', 'Comedy', 'Violent', 'Free to Play', 'Online multiplayer', 'Stealth', 'Split Screen', 'Local Co-Op', 'Action-Adventure', 'Action RPG']);

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
                        <button className='btn apply'>Apply</button>
                        <button className='btn reset'>reset</button>
                    </div>
                </div>

                <div className="checkbox-blocks">
                    <div className="checkbox-genres">
                        <CheckboxGroup name={"Genres"} listCheckBoxes={genres}/>
                    </div>
                    <div className="checkbox-platforms">
                        <CheckboxGroup name={"Platforms"} listCheckBoxes={platforms}/>
                    </div>
                    <div className="checkbox-modes">
                        <CheckboxGroup name={"Game modes"} listCheckBoxes={tags}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
