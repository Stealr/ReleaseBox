import React, { useState, useEffect } from 'react';
import axios from "axios";
import './profile.css';
import PresentGames from '/src/Components/presentGames/presentGames.jsx';


function Profile() {
    const [data, setData] = useState([]);
    const user_id = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken');
    console.log(user_id);

    // useEffect(() => {

    //     const response = axios.get("http://localhost:8000/get_user/", {
    //         params: {
    //             user_id: user_id,
    //         },
    //     })
    //     setData(response.data);
    // }, []);


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
                                            {/* {console.log(data)} */}
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