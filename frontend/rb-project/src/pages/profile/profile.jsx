import React, { useState, useEffect } from 'react';
import axios from "axios";
import './profile.css';
import PresentGames from '/src/Components/presentGames/presentGames.jsx';


function Profile() {
    const [data, setData] = useState([]);
    const user_id = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        // axios.get('http://localhost:8000/get_user/', { user_id: user_id })
        //     .then(response => {
        //         setData(response.data);
        //         console.log("Successful data recording! ")
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        axios.get(`http://localhost:8000/get_user/`,
            { params: { user_id: user_id } }, // Передаем user_id как query параметр
        )
            .then((response) => {
                setData(response.data); // Устанавливаем данные пользователя
            })
            .catch((err) => {
                setError(err.message); // Обрабатываем ошибки
            });

    }, [user_id]);


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
                            <h2 className='username'>{data.username}</h2>
                            <p>Collections:</p>
                            {console.log(data)}
                            <div className="btns-col">
                                {["All Games", "Wishlist", "Playing", "Done", "Favourite", "Abandoned"].map((field) => {
                                    let count = 0;

                                    if (field === "All Games" && data.userCollection) {
                                        // Подсчитываем общее количество всех категорий
                                        count = Object.values(data.userCollection).reduce((sum, items) => sum + items.length, 0);
                                    } else if (data.userCollection && data.userCollection[field]) {
                                        // Получаем длину конкретной категории
                                        count = data.userCollection[field].length;
                                    }

                                    return (
                                        <div className="block" key={field}>
                                            <div className="btn-collection">
                                                <p>{field}</p>
                                                <p>{count}</p>
                                            </div>
                                        </div>
                                    );
                                })}
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