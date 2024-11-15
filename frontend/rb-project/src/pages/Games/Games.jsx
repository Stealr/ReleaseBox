import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import GameList from "/src/Components/GameList/GameList.jsx";


function Games() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        axios.get('http://localhost:8000/games/')
            .then(response => {
                setData(response.data);
                console.info("The data has been successfully recorded!");
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <div>
            <Header />
            <div className='main-content'>
                <div className='filters'>
                    <h3>Filters</h3>
                </div>
                <p>Games are found:</p>
                <div className='sort'>
                    <button>test</button>
                </div>
                <div className='list-games-grid'>
                    <GameList data={data}/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Games