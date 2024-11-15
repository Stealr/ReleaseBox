import React, { useState, useEffect } from 'react';
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import Card from "/src/Components/CardGameList/CardGameList.jsx";


function Games() {

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
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Games