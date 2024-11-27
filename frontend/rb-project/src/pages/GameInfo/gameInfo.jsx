import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";


function Games({  }) {
    const { game } = useParams();
    console.log(game);


    return (
        <div>
            <img
                src='/src/assets/vampire-the-masquerade-bloodlines-2.jpg'
                className='background-image'
            />
            <div className='main-content'>
                <div className='container'>

                </div>
            </div>
        </div>
    );
}

export default Games