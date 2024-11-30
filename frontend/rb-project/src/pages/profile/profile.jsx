import React, { useState, useEffect } from 'react';
import axios from "axios";
import './profile.css';
import PresentGames from '/src/Components/presentGames/presentGames.jsx';


function Profile() {

    return (
        <div>
            <img
                src='/src/assets/vampire-the-masquerade-bloodlines-2.jpg'
                className='background-image'
            />
            <div className='main-content'>
                <div className='container'>
                    <div className="profile">
                        <div className="left-column">
                            <h2 className='username'>Name of User</h2>
                            <p>Collections:</p>
                            <div className="btns-col">
                                {["Favorite", "All Games", "Done", "Will play", "Abandoned"].map((field) => (
                                    <div className="block" key={field}>
                                        <div className='btn-collection'>
                                            <p>{field}</p>
                                            <p>N</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="right-column">
                            <PresentGames />
                            <PresentGames />
                            <PresentGames />
                            <PresentGames />
                            <PresentGames />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;