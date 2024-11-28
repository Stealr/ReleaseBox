import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import './gameInfo.css';


function Game({  }) {
    const { game, id } = useParams();
    console.log(game, id);


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
                                    <img />
                                </div>
                                <div className="ratingGame">
                                
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