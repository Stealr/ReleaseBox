import { React, useState } from 'react';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./sliderStyles.css";


function BlockSlider() {
    const [yearRange, setYearRange] = useState([1980, 2026]);
    const [metacriticRange, setMetacriticRange] = useState([0, 100]);
    const [positions, setPositions] = useState({ left: 0, right: 0 });

    const handleSliderChange = (value) => {
        setYearRange(value);
        updateHandlePositions(value);
    };

    const updateHandlePositions = (value) => {
        const leftPosition = ((value[0] - 1980) / (2026 - 1980)) * 100;
        const rightPosition = ((value[1] - 1980) / (2026 - 1980)) * 100;
        setPositions({ left: leftPosition, right: rightPosition });
    };

    return (
        <div className="custom-slider-container">
            <p>Year Range</p>
            <div className="slider-wrapper">

                <Slider
                    range
                    min={1980}
                    max={2026}
                    value={yearRange}
                    onChange={handleSliderChange}
                    styles={{
                        track: { backgroundColor: "orange", height: 8 },
                        handle: { borderColor: "orange", backgroundColor: "orange", height: 20, width: 20 },
                        rail: { backgroundColor: "#555", height: 8 },
                    }}
                />
                {/* Левый маркер */}
                <div
                    className="slider-tooltip"
                    style={{ left: `calc(${positions.left}% - 20px)` }}
                >
                    {yearRange[0]}
                </div>

                {/* Правый маркер */}
                <div
                    className="slider-tooltip"
                    style={{ left: `calc(${positions.right}% - 20px)` }}
                >
                    {yearRange[1]}
                </div>
            </div>
        </div>
    );
}

export default BlockSlider;
