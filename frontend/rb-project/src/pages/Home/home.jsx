import React, { useState, useEffect } from 'react';
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import "/src/pages/main-container.css";

function Home() {

    return (
        <div>
            <Header />
            <div className="main-content">
                <div className="container">
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home