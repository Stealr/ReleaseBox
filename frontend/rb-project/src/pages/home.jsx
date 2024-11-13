import React, { useState, useEffect } from 'react';
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import Card from "/src/Components/CardGameCalendar/CardGameCalendar.jsx";

function Home() {

    return (
        <div>
            <Header />
            <Card />
            <Footer />
        </div>
    );
}

export default Home