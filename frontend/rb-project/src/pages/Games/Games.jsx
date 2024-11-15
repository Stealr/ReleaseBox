import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import GameList from "/src/Components/GameList/GameList.jsx";
import "./Games.css";


function Games() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        axios.get('http://localhost:8000/games/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <div>
            <Header />
            <div className='main-content'
                style={{
                    backgroundImage: `url(/src/assets/vampire-the-masquerade-bloodlines-2.jpg)`,
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className='container'>
                    <div className='filters-sort'>
                        <div className='filters'>
                            <h3>Filters</h3>
                        </div>
                        <p>Games are found: {Object.keys(data).length}</p>
                        <div className='sort'>
                            <button>sort</button>
                        </div>
                    </div>
                    <div className='list-games-grid'>
                        <GameList data={data} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Games