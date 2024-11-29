import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import './gameInfo.css';


function Game() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const { name } = useParams();

    const { id } = location.state || {};

    useEffect(() => {
        axios.get(`http://localhost:8000/games/${id}/`)
            .then(response => {
                setData(response.data);
                console.log("Successful data recording!")
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <div>
            <img // Вставить бекграунд игры
                src='/src/assets/vampire-the-masquerade-bloodlines-2.jpg'
                className='background-image'
            />
            <div className='main-content'>
                <div className='container'>
                    <div className="gameInfo">
                        <div className="top-info">
                            <div className="left-column">
                                <div className="coverImage">
                                    {/* <img
                                        src={data.imageBackground}
                                    /> */}
                                </div>
                                <div className="ratingGame">
                                    {console.log(data)}
                                </div>
                                <div className="statistics">

                                </div>
                            </div>
                            <div className="center-column">
                                <div className="infoGame">

                                </div>
                            </div>
                            <div className="right-column">
                                <div className="gallary">

                                </div>
                                <div className="stores">

                                </div>
                            </div>
                        </div>
                        <div className="bottom-info">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game