import { React, useEffect, useState } from 'react';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./sliderStyles.css";

//TODO: Добавить автоматическое уменьшении кол ва marks если они не вмещаются
function BlockSlider({ name, Range, setRange, marks, min_max }) {
    const [positions, setPositions] = useState({ left: 0, right: 0 });

    const handleSliderChange = (value) => {
        setRange(value);
        updateHandlePositions(value);
    };

    const updateHandlePositions = (value) => {
        const leftPosition = ((value[0] - min_max[0]) / (min_max[1] - min_max[0])) * 100;
        const rightPosition = ((value[1] - min_max[0]) / (min_max[1] - min_max[0])) * 100;
        setPositions({ left: leftPosition, right: rightPosition });
    };

    useEffect(() => {
        handleSliderChange(min_max)
    }, []);

    return (
        <div className="custom-slider-container">
            <p>{name}</p>
            <div className="slider-wrapper">
                <Slider
                    range
                    min={min_max[0]}
                    max={min_max[1]}
                    value={Range}
                    onChange={handleSliderChange}
                    allowCross={false}
                    marks={marks}
                    dotStyle={{ display: 'none' }}
                    styles={{
                        track: { backgroundColor: "#ff7f50", height: 8 },
                        handle: { borderColor: "#e67247", backgroundColor: "#e67247", height: 20, width: 20, opacity: 100, },
                        rail: { backgroundColor: "#555", height: 8 },
                    }}
                />
                <div
                    className="slider-tooltip tooltip-left"
                    style={{ left: `calc(${positions.left}%` }}
                >
                    {Range[0]}
                </div>

                <div
                    className="slider-tooltip tooltip-right"
                    style={{ left: `calc(${positions.right}%)` }}
                >
                    {Range[1]}
                </div>
            </div>
        </div>
    );
}

export default BlockSlider;
